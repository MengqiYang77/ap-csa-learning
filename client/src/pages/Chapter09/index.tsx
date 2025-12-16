import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Code2, Brain, Target } from "lucide-react";

export default function Chapter09() {
  const sections = [
    {
      id: "arrays-basics",
      title: "Array Fundamentals",
      description: "Understanding array declaration, initialization, and memory model",
      icon: BookOpen,
      href: "/chapter-09/arrays-basics",
      difficulty: "Foundation",
    },
    {
      id: "array-algorithms",
      title: "Array Algorithms",
      description: "Traversal, searching, sorting, and common patterns",
      icon: Code2,
      href: "/chapter-09/array-algorithms",
      difficulty: "Core",
    },
    {
      id: "2d-arrays",
      title: "2D Arrays & Matrices",
      description: "Multi-dimensional arrays and matrix operations",
      icon: Brain,
      href: "/chapter-09/2d-arrays",
      difficulty: "Advanced",
    },
    {
      id: "practice",
      title: "Coding Practice",
      description: "Apply your knowledge with hands-on exercises",
      icon: Target,
      href: "/chapter-09/practice",
      difficulty: "Application",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="container py-16">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Chapter 9
            </div>
            <h1 className="text-5xl font-bold mb-4 text-balance">
              Arrays in Java
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Master one of Java's most fundamental data structures. Learn how arrays work at the memory level,
              implement classic algorithms, and develop the problem-solving skills needed for top computer science programs.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/chapter-09/arrays-basics">
                  Start Learning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/chapter-09/practice">
                  Jump to Practice
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="container py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-3">Learning Path</h2>
          <p className="text-muted-foreground text-lg">
            Follow this structured path to build deep understanding of arrays
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="group hover:shadow-soft-lg transition-all duration-200 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {section.difficulty}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <CardDescription className="text-base">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/5" asChild>
                    <Link href={section.href}>
                      Start Section
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Why This Matters */}
      <div className="border-t border-border bg-muted/20">
        <div className="container py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Arrays Matter</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">
                  of CS programs expect mastery of arrays
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Foundation</div>
                <p className="text-sm text-muted-foreground">
                  for understanding all data structures
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Critical</div>
                <p className="text-sm text-muted-foreground">
                  for technical interviews at top schools
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
