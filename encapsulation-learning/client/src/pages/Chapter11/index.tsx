import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, List, Code2, Zap, BookOpen } from "lucide-react";

export default function Chapter11() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container py-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <List className="w-10 h-10 text-primary" />
              <h1 className="text-5xl font-bold">Chapter 11: ArrayList</h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Master Java's most powerful dynamic data structure. Learn how ArrayList provides flexibility 
              beyond arrays while maintaining type safety through generics.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12 max-w-5xl">
        {/* Overview */}
        <section className="mb-16">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <BookOpen className="w-6 h-6" />
                What You'll Master
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                ArrayList is one of the most frequently used data structures in Java. Unlike arrays with fixed size, 
                ArrayList can grow and shrink dynamically. This chapter goes beyond AP exam requirements to help you 
                understand the internal mechanics and make informed design decisions.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Core Concepts</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Dynamic sizing vs fixed arrays</li>
                    <li>• Generic types and type safety</li>
                    <li>• Reference semantics</li>
                    <li>• Capacity vs size</li>
                  </ul>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚡ Performance</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• O(1) access by index</li>
                    <li>• O(n) insertion/deletion</li>
                    <li>• Amortized O(1) append</li>
                    <li>• Memory overhead analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Learning Path */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Learning Path</h2>
          
          <div className="space-y-6">
            {/* Section 1 */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div>
                      <CardTitle className="text-xl">ArrayList Basics</CardTitle>
                      <CardDescription>
                        Understand the fundamentals and why ArrayList exists
                      </CardDescription>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href="/chapter-11/arraylist-basics">
                      Start
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="text-primary mt-1">✓</div>
                    <div>
                      <div className="font-medium">ArrayList vs Arrays</div>
                      <div className="text-muted-foreground">When to use each</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="text-primary mt-1">✓</div>
                    <div>
                      <div className="font-medium">Generics &lt;T&gt;</div>
                      <div className="text-muted-foreground">Type safety explained</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="text-primary mt-1">✓</div>
                    <div>
                      <div className="font-medium">Declaration</div>
                      <div className="text-muted-foreground">Syntax and initialization</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <CardTitle className="text-xl">ArrayList Methods</CardTitle>
                      <CardDescription>
                        Master the essential operations and API
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/chapter-11/arraylist-methods">
                      Learn
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="text-accent mt-1">✓</div>
                    <div>
                      <div className="font-medium">Adding Elements</div>
                      <div className="text-muted-foreground">add(), addAll()</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="text-accent mt-1">✓</div>
                    <div>
                      <div className="font-medium">Removing Elements</div>
                      <div className="text-muted-foreground">remove(), clear()</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="text-accent mt-1">✓</div>
                    <div>
                      <div className="font-medium">Accessing & Modifying</div>
                      <div className="text-muted-foreground">get(), set(), size()</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-success">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-success text-success-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div>
                      <CardTitle className="text-xl">ArrayList Algorithms</CardTitle>
                      <CardDescription>
                        Apply algorithms and patterns with ArrayList
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/chapter-11/arraylist-algorithms">
                      Practice
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="text-success mt-1">✓</div>
                    <div>
                      <div className="font-medium">Traversal Patterns</div>
                      <div className="text-muted-foreground">for, for-each, iterator</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="text-success mt-1">✓</div>
                    <div>
                      <div className="font-medium">Search & Filter</div>
                      <div className="text-muted-foreground">Finding elements</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="text-success mt-1">✓</div>
                    <div>
                      <div className="font-medium">Sorting</div>
                      <div className="text-muted-foreground">Collections.sort()</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Differences */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">ArrayList vs Array: Quick Comparison</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-muted-foreground" />
                  Arrays
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-destructive font-bold">✗</span>
                  <span className="text-muted-foreground">Fixed size - cannot grow or shrink</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span className="text-muted-foreground">Can store primitives (int, double, etc.)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span className="text-muted-foreground">Slightly faster access (no method call)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span className="text-muted-foreground">Less memory overhead</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-destructive font-bold">✗</span>
                  <span className="text-muted-foreground">No built-in methods (add, remove, etc.)</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="w-5 h-5 text-primary" />
                  ArrayList
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span className="text-muted-foreground">Dynamic size - grows automatically</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-destructive font-bold">✗</span>
                  <span className="text-muted-foreground">Cannot store primitives (must use Integer, Double)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span className="text-muted-foreground">Rich API - add(), remove(), contains(), etc.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span className="text-muted-foreground">Type-safe with generics</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span className="text-muted-foreground">More flexible for most use cases</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Real-World Applications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Where ArrayList Shines</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">📱 User Interface Lists</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Contact lists, message threads, notification feeds - anywhere users can add/remove items dynamically.
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">🛒 Shopping Carts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                E-commerce systems where customers add and remove products. Size unknown in advance.
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">📊 Data Processing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Reading CSV files, parsing JSON, filtering datasets - when you don't know how many items you'll have.
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">🎮 Game Development</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Managing enemies, projectiles, power-ups - objects that spawn and despawn during gameplay.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-8 pb-8 text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-3">Ready to Master ArrayList?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start with the basics and work your way through hands-on exercises. 
              By the end, you'll understand not just how to use ArrayList, but when and why.
            </p>
            <Button size="lg" asChild>
              <Link href="/chapter-11/arraylist-basics">
                Begin Chapter 11
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
