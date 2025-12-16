import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getDb } from "./db";
import { codeSubmissions, userProgress, users, userBadges } from "../drizzle/schema";
import { gradeCode, ExerciseTests } from "@shared/codeGrader";
import { checkEarnedBadges, BADGES } from "@shared/badges";
import { eq, and, desc } from "drizzle-orm";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Code submissions router
  submissions: router({
    submit: protectedProcedure
      .input(z.object({
        chapterId: z.number(),
        sectionId: z.string(),
        code: z.string(),
        language: z.string().default("java"),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const [submission] = await db.insert(codeSubmissions).values({
          userId: ctx.user.id,
          chapterId: input.chapterId,
          sectionId: input.sectionId,
          code: input.code,
          language: input.language,
        }).execute();
        
        return { success: true, submissionId: submission.insertId };
      }),
    
    getMySubmissions: protectedProcedure
      .input(z.object({
        chapterId: z.number().optional(),
        sectionId: z.string().optional(),
      }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        const conditions = [eq(codeSubmissions.userId, ctx.user.id)];
        if (input.chapterId) conditions.push(eq(codeSubmissions.chapterId, input.chapterId));
        if (input.sectionId) conditions.push(eq(codeSubmissions.sectionId, input.sectionId));
        
        return await db.select().from(codeSubmissions)
          .where(and(...conditions))
          .orderBy(desc(codeSubmissions.submittedAt))
          .execute();
      }),
  }),
  
  // Admin router - only accessible by admin users
  admin: router({
    getAllSubmissions: protectedProcedure
      .query(async ({ ctx }) => {
        // Check if user is admin
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        // Get all submissions with user information
        const submissions = await db.select({
          id: codeSubmissions.id,
          userId: codeSubmissions.userId,
          userName: users.name,
          userEmail: users.email,
          chapterId: codeSubmissions.chapterId,
          sectionId: codeSubmissions.sectionId,
          code: codeSubmissions.code,
          language: codeSubmissions.language,
          status: codeSubmissions.status,
          submittedAt: codeSubmissions.submittedAt,
        })
        .from(codeSubmissions)
        .leftJoin(users, eq(codeSubmissions.userId, users.id))
        .orderBy(desc(codeSubmissions.submittedAt))
        .execute();
        
        // Transform for frontend - convert chapterId to chapter string
        return submissions.map(sub => ({
          ...sub,
          chapter: sub.chapterId === 9 ? 'chapter-09' : sub.chapterId === 11 ? 'chapter-11' : `chapter-${sub.chapterId}`,
          exerciseId: sub.sectionId,
          createdAt: sub.submittedAt,
        }));
      }),
    
    getUserProgress: protectedProcedure
      .query(async ({ ctx }) => {
        // Check if user is admin
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        // Get all users with their progress
        const allUsers = await db.select().from(users).execute();
        
        const progressData = await Promise.all(allUsers.map(async (user) => {
          // Get completed sections count
          const completed = await db.select()
            .from(userProgress)
            .where(and(eq(userProgress.userId, user.id), eq(userProgress.completed, 1)))
            .execute();
          
          // Get total submissions count
          const submissions = await db.select()
            .from(codeSubmissions)
            .where(eq(codeSubmissions.userId, user.id))
            .execute();
          
          // Calculate completion rate (assuming 20 total sections across all chapters)
          const totalSections = 20;
          const completionRate = Math.round((completed.length / totalSections) * 100);
          
          return {
            userId: user.id,
            userName: user.name || 'Unknown',
            userEmail: user.email || 'No email',
            completedSections: completed.length,
            totalSubmissions: submissions.length,
            completionRate,
          };
        }));
        
        // Filter out users with no activity
        return progressData.filter(p => p.totalSubmissions > 0 || p.completedSections > 0);
      }),
  }),
  
  // Badges router
  badges: router({
    getMyBadges: protectedProcedure
      .query(async ({ ctx }) => {
        const db = await getDb();
        if (!db) return [];
        const badges = await db.select().from(userBadges).where(eq(userBadges.userId, ctx.user.id));
        return badges.map((b: any) => ({
          ...b,
          ...BADGES[b.badgeId],
        }));
      }),
    
    checkNewBadges: protectedProcedure
      .mutation(async ({ ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
        
        // Get user stats
        const submissions = await db.select().from(codeSubmissions).where(eq(codeSubmissions.userId, ctx.user.id));
        const progress = await db.select().from(userProgress).where(eq(userProgress.userId, ctx.user.id));
        const earnedBadges = await db.select().from(userBadges).where(eq(userBadges.userId, ctx.user.id));
        
        // Calculate stats
        const context = {
          userId: ctx.user.id,
          totalSubmissions: submissions.length,
          completedSections: {
            chapter9: progress.filter((p: any) => p.chapterId === 9 && p.completed === 1).length,
            chapter10: progress.filter((p: any) => p.chapterId === 10 && p.completed === 1).length,
            chapter11: progress.filter((p: any) => p.chapterId === 11 && p.completed === 1).length,
          },
          perfectScores: 0, // TODO: Track perfect scores in grading system
          earnedBadges: earnedBadges.map((b: any) => b.badgeId),
        };
        
        // Check for new badges
        const newBadgeIds = checkEarnedBadges(context);
        
        // Award new badges
        if (newBadgeIds.length > 0) {
          await db.insert(userBadges).values(
            newBadgeIds.map(badgeId => ({
              userId: ctx.user.id,
              badgeId,
            }))
          );
        }
        
        return newBadgeIds.map(id => BADGES[id]);
      }),
  }),
  
  // Code grading router
  grading: router({
    gradeExercise: protectedProcedure
      .input(z.object({
        exerciseId: z.string(),
        code: z.string(),
      }))
      .mutation(async ({ input }) => {
        const testCases = ExerciseTests[input.exerciseId as keyof typeof ExerciseTests];
        
        if (!testCases) {
          return {
            passed: false,
            score: 0,
            totalTests: 0,
            passedTests: 0,
            feedback: ['No tests available for this exercise'],
            failedTests: [],
          };
        }
        
        const result = gradeCode(input.code, testCases);
        return result;
      }),
  }),
  
  // Progress tracking router
  progress: router({
    markComplete: protectedProcedure
      .input(z.object({
        chapterId: z.number(),
        sectionId: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.insert(userProgress).values({
          userId: ctx.user.id,
          chapterId: input.chapterId,
          sectionId: input.sectionId,
          completed: 1,
          completedAt: new Date(),
        }).onDuplicateKeyUpdate({
          set: {
            completed: 1,
            completedAt: new Date(),
          },
        }).execute();
        
        return { success: true };
      }),
    
    getProgress: protectedProcedure
      .input(z.object({
        chapterId: z.number().optional(),
      }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        const conditions = [eq(userProgress.userId, ctx.user.id)];
        if (input.chapterId) conditions.push(eq(userProgress.chapterId, input.chapterId));
        
        return await db.select().from(userProgress)
          .where(and(...conditions))
          .execute();
      }),
  }),
});

export type AppRouter = typeof appRouter;
