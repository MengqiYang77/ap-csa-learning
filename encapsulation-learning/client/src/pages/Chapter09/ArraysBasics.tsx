import { useState } from "react";
import { Link } from "wouter";
import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { toast } from "sonner";

export default function ArraysBasics() {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const handleSubmit = async (exerciseId: string, code: string) => {
    // TODO: Implement actual submission to backend
    console.log("Submitting code for", exerciseId, code);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCompletedExercises(prev => new Set(prev).add(exerciseId));
    toast.success("Code submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/20">
        <div className="container py-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/chapter-09">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chapter 9
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">Array Fundamentals</h1>
          <p className="text-lg text-muted-foreground">
            Understanding arrays at the memory level and mastering the basics
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-5xl">
        {/* What is an Array? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">What is an Array?</h2>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-muted-foreground leading-relaxed">
              An array is a <strong>fixed-size, contiguous block of memory</strong> that stores elements of the same type.
              Unlike variables that store single values, arrays let you work with collections of data efficiently.
            </p>
          </div>

          <Card className="mb-8 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Key Concept: Memory Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                When you declare an array in Java, you're actually creating two things:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>A reference variable</strong> (stored on the stack)</li>
                <li><strong>The actual array object</strong> (stored on the heap)</li>
              </ol>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This is why arrays are <strong>reference types</strong>, not primitive types. The variable holds a memory address, not the actual data.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Tabs defaultValue="declaration" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="declaration">Declaration</TabsTrigger>
              <TabsTrigger value="initialization">Initialization</TabsTrigger>
              <TabsTrigger value="access">Access</TabsTrigger>
            </TabsList>
            
            <TabsContent value="declaration" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Array Declaration</CardTitle>
                  <CardDescription>Creating array variables</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="code-block">
                    <pre>{`// Syntax 1: Type[] arrayName
int[] numbers;
String[] names;

// Syntax 2: Type arrayName[] (less common)
int scores[];

// The array doesn't exist yet - just the reference!`}</pre>
                  </div>
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                      At this point, the array variable is <code>null</code>. No memory has been allocated for the actual array.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="initialization" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Array Initialization</CardTitle>
                  <CardDescription>Allocating memory and setting values</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="code-block">
                    <pre>{`// Method 1: new keyword with size
int[] numbers = new int[5];  // Creates array of 5 integers (all 0)

// Method 2: Array initializer
int[] scores = {95, 87, 92, 88, 91};  // Size is 5

// Method 3: Two-step process
String[] names;
names = new String[3];  // Allocate memory
names[0] = "Alice";     // Assign values`}</pre>
                  </div>
                  <Alert className="bg-primary/5 border-primary/20">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <AlertDescription>
                      <strong>Default values:</strong> Numeric arrays initialize to 0, boolean to false, and object arrays to null.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="access" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Accessing Elements</CardTitle>
                  <CardDescription>Reading and modifying array elements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="code-block">
                    <pre>{`int[] numbers = {10, 20, 30, 40, 50};

// Access by index (0-based)
int first = numbers[0];   // 10
int third = numbers[2];   // 30

// Modify elements
numbers[1] = 25;          // Changes 20 to 25

// Array length
int size = numbers.length;  // 5 (property, not method!)

// Common mistake: Index out of bounds
// numbers[5] = 60;  // ERROR! Valid indices: 0-4`}</pre>
                  </div>
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>ArrayIndexOutOfBoundsException</strong> is one of the most common runtime errors. Always check: <code>0 &lt;= index &lt; array.length</code>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Deep Dive: Reference Semantics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Deep Dive: Reference Semantics</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Why This Matters for Top Schools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Understanding reference semantics is crucial for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Avoiding bugs in complex programs</li>
                <li>Technical interviews (commonly tested concept)</li>
                <li>Understanding how Java manages memory</li>
                <li>Working with methods that modify arrays</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">❌ Common Misconception</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block text-sm">
                  <pre>{`int[] a = {1, 2, 3};
int[] b = a;  // Copying?

b[0] = 99;

// What is a[0]?
// Many think: 1
// Actually: 99!`}</pre>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  <code>b = a</code> copies the <strong>reference</strong>, not the array. Both variables point to the same array in memory.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">✅ Creating a True Copy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block text-sm">
                  <pre>{`int[] a = {1, 2, 3};
int[] b = new int[a.length];

for (int i = 0; i < a.length; i++) {
    b[i] = a[i];
}

b[0] = 99;
// Now a[0] is still 1`}</pre>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  To copy an array, you must create a new array and copy each element.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Practice Exercise */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Practice: Array Basics</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exercise 1: Array Manipulation</CardTitle>
              <CardDescription>
                Write a method that creates an array of the first n even numbers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-2">Requirements:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Method signature: <code>public static int[] getEvenNumbers(int n)</code></li>
                  <li>Return an array containing [2, 4, 6, ..., 2n]</li>
                  <li>Example: <code>getEvenNumbers(5)</code> returns <code>[2, 4, 6, 8, 10]</code></li>
                </ul>
              </div>

              <CodeEditor
                defaultCode={`public class ArrayPractice {
    public static int[] getEvenNumbers(int n) {
        // TODO: Implement this method
        
        
        
        return null;
    }
    
    public static void main(String[] args) {
        int[] evens = getEvenNumbers(5);
        // Should print: [2, 4, 6, 8, 10]
        System.out.println(java.util.Arrays.toString(evens));
    }
}`}
                onSubmit={(code) => handleSubmit("exercise-1", code)}
                height="350px"
              />

              {completedExercises.has("exercise-1") && (
                <Alert className="bg-success/10 border-success/20">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success">
                    Exercise completed! Your code has been submitted.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" asChild>
            <Link href="/chapter-09">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Overview
            </Link>
          </Button>
          <Button asChild>
            <Link href="/chapter-09/array-algorithms">
              Next: Array Algorithms
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
