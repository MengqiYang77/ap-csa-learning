import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Code submissions table - stores student code submissions for each chapter
 */
export const codeSubmissions = mysqlTable("codeSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  chapterId: int("chapterId").notNull(),
  sectionId: varchar("sectionId", { length: 100 }).notNull(),
  code: text("code").notNull(),
  language: varchar("language", { length: 20 }).default("java").notNull(),
  status: mysqlEnum("status", ["submitted", "reviewed", "feedback_given"]).default("submitted").notNull(),
  teacherFeedback: text("teacherFeedback"),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});

export type CodeSubmission = typeof codeSubmissions.$inferSelect;
export type InsertCodeSubmission = typeof codeSubmissions.$inferInsert;

/**
 * User progress table - tracks which sections students have completed
 */
export const userProgress = mysqlTable("userProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  chapterId: int("chapterId").notNull(),
  sectionId: varchar("sectionId", { length: 100 }).notNull(),
  completed: int("completed").default(0).notNull(), // 0 = not started, 1 = completed
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

/**
 * User badges table - tracks achievement badges earned by students
 */
export const userBadges = mysqlTable("userBadges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badgeId: varchar("badgeId", { length: 50 }).notNull(), // e.g., "first_submission", "chapter_9_complete"
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;