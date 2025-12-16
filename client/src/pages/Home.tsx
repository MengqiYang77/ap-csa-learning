import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Code2, MessageSquare, Shield, Target, Trophy } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [, setLocation] = useLocation();
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Master Java Encapsulation
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          An interactive learning experience for AP Computer Science A students. 
          Understand why data protection matters through real-world scenarios, 
          live code demonstrations, and hands-on practice.
        </p>
      </div>

      {/* What You'll Learn */}
      <Card className="border-primary">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">What You'll Learn</CardTitle>
          </div>
          <CardDescription>
            This interactive course covers all essential encapsulation concepts from AP CSA Chapter 10
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg">
              <Shield className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Why Encapsulation Matters</h3>
                <p className="text-sm text-muted-foreground">
                  Understand the problems with public fields and why data protection is critical
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-lg">
              <svg className="h-6 w-6 text-destructive flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-semibold mb-1">Real-World Consequences</h3>
                <p className="text-sm text-muted-foreground">
                  Explore 4 real scenarios: banking crashes, grade tampering, game cheating, medical errors
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg">
              <Code2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Accessors & Modifiers</h3>
                <p className="text-sm text-muted-foreground">
                  Master getters and setters with validation, naming conventions, and best practices
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg">
              <Trophy className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Hands-On Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive demos, knowledge checks, and discussion questions to test understanding
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Your Learning Path</h2>
        <div className="space-y-4">
          {/* Step 1 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <CardTitle>Why Encapsulation?</CardTitle>
                    <CardDescription>Understand the problem with public fields</CardDescription>
                  </div>
                </div>
                <Button className="gap-2" onClick={() => setLocation("/why-encapsulation")}>
                  Start <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                See side-by-side comparisons of bad vs good design. Learn why making fields public 
                is dangerous and how encapsulation solves the problem.
              </p>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <CardTitle>Real-World Dangers</CardTitle>
                    <CardDescription>Explore 4 disaster scenarios</CardDescription>
                  </div>
                </div>
                <Button variant="outline" className="gap-2" onClick={() => setLocation("/real-world-dangers")}>
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Banking system crashes, student grade tampering, game cheating epidemics, and medical 
                system fatal errors - see what happens when data isn't protected.
              </p>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <CardTitle>Accessors & Modifiers</CardTitle>
                    <CardDescription>Learn getters and setters</CardDescription>
                  </div>
                </div>
                <Button variant="outline" className="gap-2" onClick={() => setLocation("/accessors-modifiers")}>
                  Learn <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Master the syntax, naming conventions, and validation patterns for accessors and modifiers. 
                Learn when NOT to use setters and how to handle mutable objects.
              </p>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <CardTitle>Interactive Demo</CardTitle>
                    <CardDescription>See code in action</CardDescription>
                  </div>
                </div>
                <Button variant="outline" className="gap-2" onClick={() => setLocation("/interactive-demo")}>
                  Try It <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Run live code examples comparing bad and good designs. Work through interactive challenges 
                and see validation in action with real-time output.
              </p>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <CardTitle>Knowledge Check</CardTitle>
                    <CardDescription>Test your understanding</CardDescription>
                  </div>
                </div>
                <Button variant="outline" className="gap-2" onClick={() => setLocation("/quiz")}>
                  Quiz <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Take an 8-question quiz covering all key concepts. Get instant feedback with detailed 
                explanations for each question.
              </p>
            </CardContent>
          </Card>

          {/* Step 6 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    6
                  </div>
                  <div>
                    <CardTitle>Discussion Questions</CardTitle>
                    <CardDescription>Think critically about design</CardDescription>
                  </div>
                </div>
                <Button variant="outline" className="gap-2" onClick={() => setLocation("/discussion")}>
                  Discuss <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore advanced topics: when NOT to use setters, performance vs encapsulation, 
                defensive copying, and real-world software failures.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Concepts Preview */}
      <Card className="bg-gradient-to-br from-emerald-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-emerald-600" />
            <CardTitle className="text-2xl">Key Concepts</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">🔒 Private Fields</h3>
              <p className="text-sm text-muted-foreground">
                Hide data from direct external access
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">👁️ Getters</h3>
              <p className="text-sm text-muted-foreground">
                Provide read-only access to data
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">✏️ Setters</h3>
              <p className="text-sm text-muted-foreground">
                Control data modification with validation
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-2">🎯 The Encapsulation Principle</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Hide implementation details</strong> and provide <strong>controlled access</strong> through 
              public methods. This protects data integrity, enables flexibility, and improves maintainability.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-primary text-primary-foreground text-center">
        <CardContent className="pt-8 pb-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-lg mb-6 opacity-90">
            Start your journey to mastering encapsulation - one of the most important 
            principles in object-oriented programming.
          </p>
          <Button size="lg" variant="secondary" className="gap-2" onClick={() => setLocation("/why-encapsulation")}>
            Start Learning <ArrowRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          This interactive learning platform is based on AP Computer Science A Chapter 10 curriculum.
        </p>
        <p className="mt-2">
          Designed with constructivist learning theory and aligned with ELEOT evaluation standards.
        </p>
      </div>
    </div>
  );
}
