import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Users, 
  Code, 
  TrendingUp, 
  Calendar,
  Search,
  Download,
  Eye,
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [chapterFilter, setChapterFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Fetch all submissions
  const { data: submissions, isLoading: submissionsLoading } = trpc.admin.getAllSubmissions.useQuery();
  
  // Fetch user progress
  const { data: progressData, isLoading: progressLoading } = trpc.admin.getUserProgress.useQuery();

  // Check if user is admin
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive mb-2">
              <Shield className="w-6 h-6" />
              <CardTitle>Access Denied</CardTitle>
            </div>
            <CardDescription>
              You do not have permission to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter submissions
  const filteredSubmissions = submissions?.filter((sub: any) => {
    const matchesChapter = chapterFilter === "all" || sub.chapter === chapterFilter;
    const matchesSearch = searchQuery === "" || 
      sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChapter && matchesSearch;
  }) || [];

  // Calculate statistics
  const totalSubmissions = submissions?.length || 0;
  const uniqueStudents = new Set(submissions?.map((s: any) => s.userId)).size;
  const chapter9Submissions = submissions?.filter((s: any) => s.chapter === "chapter-09").length || 0;
  const chapter11Submissions = submissions?.filter((s: any) => s.chapter === "chapter-11").length || 0;

  const handleViewSubmission = (submission: any) => {
    setSelectedSubmission(submission);
    setViewDialogOpen(true);
  };

  const handleExportCSV = () => {
    if (!submissions || submissions.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Student Name", "Email", "Chapter", "Exercise", "Submitted At", "Code Preview"];
    const rows = filteredSubmissions.map((sub: any) => [
      sub.userName,
      sub.userEmail,
      sub.chapter,
      sub.exerciseId,
      new Date(sub.createdAt).toLocaleString(),
      sub.code.substring(0, 100).replace(/\n/g, " ") + "..."
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row: any[]) => row.map((cell: any) => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `submissions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("CSV exported successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/20">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Monitor student progress and code submissions
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">Back to Platform</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-12 max-w-7xl">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{totalSubmissions}</div>
                <Code className="w-8 h-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{uniqueStudents}</div>
                <Users className="w-8 h-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Chapter 9 (Arrays)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{chapter9Submissions}</div>
                <TrendingUp className="w-8 h-8 text-success/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Chapter 11 (Strings)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{chapter11Submissions}</div>
                <TrendingUp className="w-8 h-8 text-success/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="submissions">Code Submissions</TabsTrigger>
            <TabsTrigger value="progress">Student Progress</TabsTrigger>
          </TabsList>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Code Submissions</CardTitle>
                    <CardDescription>
                      View and filter student code submissions
                    </CardDescription>
                  </div>
                  <Button onClick={handleExportCSV} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by student name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={chapterFilter} onValueChange={setChapterFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Chapters</SelectItem>
                      <SelectItem value="chapter-09">Chapter 9 (Arrays)</SelectItem>
                      <SelectItem value="chapter-11">Chapter 11 (Strings)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submissions Table */}
                {submissionsLoading ? (
                  <div className="text-center py-12">
                    <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Loading submissions...</p>
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No submissions found matching your filters.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Chapter</TableHead>
                          <TableHead>Exercise</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubmissions.map((submission: any) => (
                          <TableRow key={submission.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{submission.userName}</div>
                                <div className="text-sm text-muted-foreground">{submission.userEmail}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {submission.chapter === "chapter-09" ? "Ch 9: Arrays" : "Ch 11: Strings"}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {submission.exerciseId}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {new Date(submission.createdAt).toLocaleString()}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleViewSubmission(submission)}
                                className="gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View Code
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Progress Overview</CardTitle>
                <CardDescription>
                  Track completion rates and learning progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progressLoading ? (
                  <div className="text-center py-12">
                    <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Loading progress data...</p>
                  </div>
                ) : !progressData || progressData.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No progress data available yet.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    {progressData.map((student: any) => (
                      <Card key={student.userId}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{student.userName}</CardTitle>
                              <CardDescription>{student.userEmail}</CardDescription>
                            </div>
                            <Badge variant={student.completionRate >= 80 ? "default" : "secondary"}>
                              {student.completionRate}% Complete
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-success" />
                              <div>
                                <div className="text-sm text-muted-foreground">Completed Sections</div>
                                <div className="font-semibold">{student.completedSections}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Code className="w-5 h-5 text-primary" />
                              <div>
                                <div className="text-sm text-muted-foreground">Total Submissions</div>
                                <div className="font-semibold">{student.totalSubmissions}</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Submission Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Code Submission Details</DialogTitle>
            <DialogDescription>
              Submitted by {selectedSubmission?.userName} on{" "}
              {selectedSubmission && new Date(selectedSubmission.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Student:</span>{" "}
                  <span className="font-medium">{selectedSubmission.userName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <span className="font-medium">{selectedSubmission.userEmail}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Chapter:</span>{" "}
                  <Badge variant="outline">
                    {selectedSubmission.chapter === "chapter-09" ? "Ch 9: Arrays" : "Ch 11: Strings"}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Exercise:</span>{" "}
                  <span className="font-mono text-sm">{selectedSubmission.exerciseId}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Submitted Code:</div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{selectedSubmission.code}</code>
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
