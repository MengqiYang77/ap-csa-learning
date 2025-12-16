import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Clock, Code, GitCompare, ArrowLeft, Filter } from "lucide-react";
import ReactDiffViewer from "react-diff-viewer-continued";

export default function CodeHistory() {
  const { data: mySubmissions, isLoading } = trpc.submissions.getMySubmissions.useQuery({});
  const [chapterFilter, setChapterFilter] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareWith, setCompareWith] = useState<any>(null);

  // Filter submissions
  const filteredSubmissions = mySubmissions?.filter((sub: any) => {
    if (chapterFilter === "all") return true;
    return sub.chapterId.toString() === chapterFilter;
  }) || [];

  // Group by exercise
  const groupedByExercise = filteredSubmissions.reduce((acc: any, sub: any) => {
    const key = `Ch${sub.chapterId}-${sub.sectionId}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(sub);
    return acc;
  }, {});

  const handleViewCode = (submission: any) => {
    setSelectedSubmission(submission);
    setCompareMode(false);
    setCompareWith(null);
  };

  const handleCompare = (submission: any) => {
    if (!selectedSubmission) {
      setSelectedSubmission(submission);
      setCompareMode(true);
    } else {
      setCompareWith(submission);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your code history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container py-12">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">My Code History</h1>
          <p className="text-lg text-muted-foreground">
            Review all your code submissions and track your progress over time
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-6xl">
        {/* Filters */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Chapter:</span>
          </div>
          <Select value={chapterFilter} onValueChange={setChapterFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chapters</SelectItem>
              <SelectItem value="9">Chapter 9: Arrays</SelectItem>
              <SelectItem value="10">Chapter 10: Encapsulation</SelectItem>
              <SelectItem value="11">Chapter 11: ArrayList</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-sm text-muted-foreground">
            {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* No submissions */}
        {filteredSubmissions.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Code className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No submissions yet</h3>
              <p className="text-muted-foreground mb-6">
                Start coding exercises to see your submission history here
              </p>
              <Button asChild>
                <Link href="/">Start Learning</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Submissions grouped by exercise */}
        {Object.keys(groupedByExercise).length > 0 && (
          <div className="space-y-8">
            {Object.entries(groupedByExercise).map(([exerciseKey, submissions]: [string, any]) => {
              const sortedSubs = submissions.sort((a: any, b: any) => 
                new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
              );
              const latestSub = sortedSubs[0];

              return (
                <Card key={exerciseKey}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">
                        {latestSub.chapterId === 9 ? '📊' : latestSub.chapterId === 10 ? '🔒' : '📋'}
                      </span>
                      <div>
                        <div className="text-lg">Chapter {latestSub.chapterId} - {latestSub.sectionId}</div>
                        <div className="text-sm text-muted-foreground font-normal">
                          {sortedSubs.length} version{sortedSubs.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sortedSubs.map((sub: any, index: number) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-center min-w-[60px]">
                              <div className="text-xs text-muted-foreground mb-1">Version</div>
                              <div className="text-lg font-bold">
                                {sortedSubs.length - index}
                              </div>
                            </div>
                            <div className="border-l border-border pl-4">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {new Date(sub.submittedAt).toLocaleString()}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {sub.code.split('\n').length} lines of code
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewCode(sub)}
                            >
                              <Code className="w-4 h-4 mr-2" />
                              View Code
                            </Button>
                            {sortedSubs.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCompare(sub)}
                              >
                                <GitCompare className="w-4 h-4 mr-2" />
                                Compare
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* View/Compare Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => {
        setSelectedSubmission(null);
        setCompareWith(null);
        setCompareMode(false);
      }}>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {compareWith ? 'Compare Code Versions' : 'View Code Submission'}
            </DialogTitle>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4">
              {compareWith ? (
                // Comparison view
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <div className="font-semibold mb-1">Old Version</div>
                      <div className="text-muted-foreground">
                        {new Date(compareWith.submittedAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 bg-success/10 rounded-lg">
                      <div className="font-semibold mb-1">New Version</div>
                      <div className="text-muted-foreground">
                        {new Date(selectedSubmission.submittedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <ReactDiffViewer
                      oldValue={compareWith.code}
                      newValue={selectedSubmission.code}
                      splitView={true}
                      useDarkTheme={false}
                      leftTitle="Old Version"
                      rightTitle="New Version"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCompareWith(null);
                        setCompareMode(false);
                      }}
                    >
                      Close Comparison
                    </Button>
                  </div>
                </div>
              ) : (
                // Single code view
                <div>
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg text-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">
                          Chapter {selectedSubmission.chapterId} - {selectedSubmission.sectionId}
                        </div>
                        <div className="text-muted-foreground">
                          Submitted: {new Date(selectedSubmission.submittedAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        {selectedSubmission.code.split('\n').length} lines
                      </div>
                    </div>
                  </div>
                  <div className="border border-border rounded-lg p-4 bg-muted/20">
                    <pre className="text-sm font-mono overflow-x-auto">
                      <code>{selectedSubmission.code}</code>
                    </pre>
                  </div>
                  {compareMode && (
                    <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm font-medium mb-2">
                        Select another version to compare with this one
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCompareMode(false);
                          setSelectedSubmission(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
