import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import WhyEncapsulation from "@/pages/WhyEncapsulation";
import RealWorldDangers from "@/pages/RealWorldDangers";
import AccessorsModifiers from "@/pages/AccessorsModifiers";
import InteractiveDemo from "@/pages/InteractiveDemo";
import Quiz from "@/pages/Quiz";
import Discussion from "@/pages/Discussion";
import Chapter09 from "@/pages/Chapter09";
import ArrayBasics from "@/pages/Chapter09/ArraysBasics";
import ArrayAlgorithms from "@/pages/Chapter09/ArrayAlgorithms";
import TwoDArrays from "@/pages/Chapter09/TwoDArrays";
import AdminDashboard from "@/pages/Admin/Dashboard";
import Chapter11 from "@/pages/Chapter11";
import ArrayListBasics from "@/pages/Chapter11/ArrayListBasics";
import ArrayListMethods from "@/pages/Chapter11/ArrayListMethods";
import StudentDashboard from "@/pages/StudentDashboard";
import CodeHistory from "@/pages/CodeHistory";
import BadgesPage from "@/pages/Badges";
import { Toaster } from "@/components/ui/sonner";
import { Menu, X, BookOpen, User, Shield } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

function UserSection() {
  const { data: user } = trpc.auth.me.useQuery();
  const [location, setLocation] = useLocation();

  if (!user) {
    return (
      <div className="px-4 py-3 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">Not logged in</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="px-4 py-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <User className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-medium truncate">{user.name || "Student"}</p>
        </div>
        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
      </div>
      
      {user.role === 'admin' && (
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={() => setLocation("/admin")}
        >
          <Shield className="w-4 h-4 mr-2" />
          Admin Dashboard
        </Button>
      )}
      
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start"
        onClick={() => setLocation("/dashboard")}
      >
        <User className="w-4 h-4 mr-2" />
        My Progress
      </Button>
    </div>
  );
}

function App() {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const chapters = [
    {
      id: 9,
      title: "Arrays",
      path: "/chapter-09",
      icon: "📊",
      sections: [
        { path: "/chapter-09/arrays-basics", label: "Array Basics" },
        { path: "/chapter-09/array-algorithms", label: "Array Algorithms" },
        { path: "/chapter-09/2d-arrays", label: "2D Arrays" },
      ],
    },
    {
      id: 10,
      title: "Encapsulation",
      path: "/",
      icon: "🔒",
      sections: [
        { path: "/why-encapsulation", label: "Why Encapsulation?" },
        { path: "/real-world-dangers", label: "Real-World Dangers" },
        { path: "/accessors-modifiers", label: "Accessors & Modifiers" },
        { path: "/interactive-demo", label: "Interactive Demo" },
        { path: "/quiz", label: "Knowledge Check" },
        { path: "/discussion", label: "Discussion" },
      ],
    },
    {
      id: 11,
      title: "ArrayList",
      path: "/chapter-11",
      icon: "📋",
      sections: [
        { path: "/chapter-11/arraylist-basics", label: "ArrayList Basics" },
        { path: "/chapter-11/arraylist-methods", label: "ArrayList Methods" },
      ],
    },
  ];

  const getCurrentChapter = () => {
    if (location.startsWith("/chapter-09")) return 9;
    if (location.startsWith("/chapter-11")) return 11;
    if (location.startsWith("/admin")) return null;
    return 10;
  };

  const currentChapter = getCurrentChapter();

  return (
    <>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-72" : "w-0"
          } transition-all duration-300 bg-white border-r border-border flex-shrink-0 overflow-hidden shadow-soft`}
        >
          <div className="p-6 h-full flex flex-col">
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">
                  AP CSA Learning
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Interactive Java Course
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-6 overflow-y-auto">
              {chapters.map((chapter) => (
                <div key={chapter.id}>
                  <Link href={chapter.path}>
                    <a
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-2 ${
                        currentChapter === chapter.id
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="text-xl">{chapter.icon}</span>
                      <div className="flex-1">
                        <div className="text-xs opacity-70">Chapter {chapter.id}</div>
                        <div className="text-sm font-medium">{chapter.title}</div>
                      </div>
                    </a>
                  </Link>

                  {chapter.sections && currentChapter === chapter.id && (
                    <div className="ml-4 pl-4 border-l-2 border-border space-y-1">
                      {chapter.sections.map((section) => {
                        const isActive = location === section.path;
                        return (
                          <Link key={section.path} href={section.path}>
                            <a
                              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                                isActive
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                            >
                              {section.label}
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* User Section */}
            <div className="mt-auto pt-6 border-t border-border space-y-3">
              <UserSection />
              <p className="text-xs text-muted-foreground">
                Designed for students heading to top CS programs
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="bg-white border-b border-border px-6 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-soft">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <Switch>
              {/* Chapter 9 - Arrays */}
              <Route path="/chapter-09" component={Chapter09} />
              <Route path="/chapter-09/arrays-basics" component={ArrayBasics} />
          <Route path="/chapter-09/array-algorithms" component={ArrayAlgorithms} />
          <Route path="/chapter-09/2d-arrays" component={TwoDArrays} />
              
              {/* Chapter 11 - ArrayList */}
              <Route path="/chapter-11" component={Chapter11} />
              <Route path="/chapter-11/arraylist-basics" component={ArrayListBasics} />
              <Route path="/chapter-11/arraylist-methods" component={ArrayListMethods} />
              
              {/* Dashboards */}
              <Route path="/dashboard" component={StudentDashboard} />
              <Route path="/code-history" component={CodeHistory} />
              <Route path="/badges" component={BadgesPage} />
              <Route path="/admin" component={AdminDashboard} />
              
              {/* Chapter 10 - Encapsulation */}
              <Route path="/" component={Home} />
              <Route path="/why-encapsulation" component={WhyEncapsulation} />
              <Route path="/real-world-dangers" component={RealWorldDangers} />
              <Route path="/accessors-modifiers" component={AccessorsModifiers} />
              <Route path="/interactive-demo" component={InteractiveDemo} />
              <Route path="/quiz" component={Quiz} />
              <Route path="/discussion" component={Discussion} />
              
              {/* 404 */}
              <Route>
                <div className="container py-24 text-center">
                  <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                  <p className="text-muted-foreground mb-6">
                    The page you're looking for doesn't exist.
                  </p>
                  <Link href="/">
                    <Button>Go Home</Button>
                  </Link>
                </div>
              </Route>
            </Switch>
          </main>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
