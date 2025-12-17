import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { BookOpen, Code, TrendingUp, Clock, CheckCircle2, ArrowRight, History, Award } from "lucide-react";

export default function StudentDashboard() {
  const { data: user } = trpc.auth.me.useQuery();
  const { data: myProgress } = trpc.progress.getProgress.useQuery({});
  const { data: mySubmissions } = trpc.submissions.getMySubmissions.useQuery({});
  const { data: myBadges } = trpc.badges.getMyBadges.useQuery();
  const checkBadgesMutation = trpc.badges.checkNewBadges.useMutation();

  // Calculate statistics
  const totalSections = 20; // Approximate total sections across all chapters
  const completedSections = myProgress?.filter(p => p.completed === 1).length || 0;
  const completionPercentage = Math.round((completedSections / totalSections) * 100);
  
  const totalSubmissions = mySubmissions?.length || 0;
  const recentSubmissions = mySubmissions?.slice(0, 5) || [];

  // Chapter-specific progress
  const chapter9Progress = myProgress?.filter(p => p.chapterId === 9 && p.completed === 1).length || 0;
  const chapter10Progress = myProgress?.filter(p => p.chapterId === 10 && p.completed === 1).length || 0;
  const chapter11Progress = myProgress?.filter(p => p.chapterId === 11 && p.completed === 1).length || 0;

  const chapter9Total = 3; // 3 sections in Chapter 9
  const chapter10Total = 6; // 6 sections in Chapter 10
  const chapter11Total = 2; // 2 sections in Chapter 11

  // Determine recommended next topic
  const getRecommendedTopic = () => {
    if (chapter9Progress < chapter9Total) {
      return { title: "Chapter 9: Arrays", path: "/chapter-09", icon: "📊" };
    }
    if (chapter10Progress < chapter10Total) {
      return { title: "Chapter 10: Encapsulation", path: "/", icon: "🔒" };
    }
    if (chapter11Progress < chapter11Total) {
      return { title: "Chapter 11: ArrayList", path: "/chapter-11", icon: "📋" };
    }
    return { title: "Review Completed Chapters", path: "/", icon: "✅" };
  };

  const recommendedTopic = getRecommendedTopic();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-2">My Learning Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {user?.name || "Student"}! Track your progress and continue learning.
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-6xl">
        {/* Overall Progress */}
        <section className="mb-12">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="w-6 h-6" />
                Overall Progress
              </CardTitle>
              <CardDescription>Your journey through AP Computer Science A</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Course Completion</span>
                    <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-3" />
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-success" />
                    <div className="text-2xl font-bold">{completedSections}</div>
                    <div className="text-sm text-muted-foreground">Sections Completed</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <Code className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{totalSubmissions}</div>
                    <div className="text-sm text-muted-foreground">Code Submissions</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold">{totalSections - completedSections}</div>
                    <div className="text-sm text-muted-foreground">Sections Remaining</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Chapter Progress */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Chapter Progress</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Chapter 9 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="text-sm text-muted-foreground">Chapter 9</div>
                    <div className="text-lg">Arrays</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Progress</span>
                      <span className="font-bold">{chapter9Progress}/{chapter9Total}</span>
                    </div>
                    <Progress value={(chapter9Progress / chapter9Total) * 100} />
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/chapter-09">
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Chapter 10 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <div className="text-sm text-muted-foreground">Chapter 10</div>
                    <div className="text-lg">Encapsulation</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Progress</span>
                      <span className="font-bold">{chapter10Progress}/{chapter10Total}</span>
                    </div>
                    <Progress value={(chapter10Progress / chapter10Total) * 100} />
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/">
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Chapter 11 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  <div>
                    <div className="text-sm text-muted-foreground">Chapter 11</div>
                    <div className="text-lg">ArrayList</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Progress</span>
                      <span className="font-bold">{chapter11Progress}/{chapter11Total}</span>
                    </div>
                    <Progress value={(chapter11Progress / chapter11Total) * 100} />
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/chapter-11">
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recommended Next Topic */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{recommendedTopic.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Recommended Next</h3>
                    <p className="text-muted-foreground">{recommendedTopic.title}</p>
                  </div>
                </div>
                <Button asChild>
                  <Link href={recommendedTopic.path}>
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Code History */}
            <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <History className="w-10 h-10 text-accent" />
                    <div>
                      <h3 className="text-lg font-bold mb-1">Code History</h3>
                      <p className="text-muted-foreground text-sm">
                        Review past submissions
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/code-history">
                      View
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Badges */}
            <Card className="bg-gradient-to-r from-yellow-500/10 to-purple-500/10 border-yellow-500/20">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Award className="w-10 h-10 text-yellow-500" />
                    <div>
                      <h3 className="text-lg font-bold mb-1">Badges</h3>
                      <p className="text-muted-foreground text-sm">
                        {myBadges?.length || 0} badges earned
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/badges">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent Badges (if any) */}
        {myBadges && myBadges.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recent Badges</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {myBadges.slice(0, 4).map((badge: any) => (
                <Card key={badge.id} className="text-center">
                  <CardContent className="pt-6 pb-6">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="font-semibold text-sm">{badge.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Code History Link (removed, now in grid above) */}
        <section className="mb-12" style={{ display: 'none' }}>
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <History className="w-10 h-10 text-accent" />
                  <div>
                    <h3 className="text-lg font-bold mb-1">View Code History</h3>
                    <p className="text-muted-foreground text-sm">
                      Review all your past submissions and compare different versions
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/code-history">
                    View History
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Submissions */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Code Submissions</h2>
          {recentSubmissions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Code className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No submissions yet</p>
                <p className="text-sm text-muted-foreground">
                  Start coding exercises to see your submissions here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {recentSubmissions.map((submission: any) => (
                <Card key={submission.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-medium">
                            Chapter {submission.chapterId}
                          </span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {submission.sectionId}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {new Date(submission.submittedAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="px-3 py-1 bg-success/10 text-success rounded-full">
                          Submitted
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
