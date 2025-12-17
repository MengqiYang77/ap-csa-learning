import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Code2, Shield } from "lucide-react";
import { Link } from "wouter";

export default function Introduction() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Master Java Encapsulation
        </h1>
        <p className="text-xl md:text-2xl mb-6 opacity-90">
          Learn why protecting your data is the foundation of great software design
        </p>
        <Link href="/why-encapsulation">
          <Button size="lg" variant="secondary" className="gap-2">
            Start Learning <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* What You'll Learn */}
      <div>
        <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-accent mb-2" />
              <CardTitle>Data Protection</CardTitle>
              <CardDescription>
                Understand why public fields are dangerous and how encapsulation prevents data corruption
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Code2 className="h-12 w-12 text-accent mb-2" />
              <CardTitle>Accessors & Modifiers</CardTitle>
              <CardDescription>
                Master getter and setter methods to control how data is accessed and modified
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-12 w-12 text-accent mb-2" />
              <CardTitle>Real-World Scenarios</CardTitle>
              <CardDescription>
                See how encapsulation prevents real disasters in banking, healthcare, and gaming systems
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Course Outline */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Course Outline</h2>
        <div className="space-y-4">
          <Link href="/why-encapsulation">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>1. Why Encapsulation?</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  Discover the problem with public fields through real-world examples
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/real-world-dangers">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>2. Real-World Dangers</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  See what happens when data isn't protected: bank crashes, grade tampering, and more
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/accessors-modifiers">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>3. Accessors & Modifiers</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  Learn how to write proper getters and setters with validation
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/interactive-demo">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>4. Interactive Code Demo</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  Practice fixing broken code and see the results in real-time
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/quiz">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>5. Knowledge Check</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  Test your understanding with interactive questions
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
