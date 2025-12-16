import { useState } from "react";
import { Link } from "wouter";
import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Zap, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function ArrayAlgorithms() {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const handleSubmit = async (exerciseId: string, code: string) => {
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
          <h1 className="text-4xl font-bold mb-2">Array Algorithms</h1>
          <p className="text-lg text-muted-foreground">
            Master essential search, sort, and traversal patterns
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-5xl">
        {/* Introduction */}
        <section className="mb-16">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Why Algorithms Matter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Array algorithms are fundamental building blocks in computer science. Understanding these patterns will help you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Solve interview problems</strong> - Most coding interviews test array manipulation</li>
                <li><strong>Analyze performance</strong> - Learn to evaluate time and space complexity</li>
                <li><strong>Recognize patterns</strong> - Apply these techniques to real-world problems</li>
                <li><strong>Build intuition</strong> - Develop algorithmic thinking skills</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Linear Search */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Linear Search</h2>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-muted-foreground leading-relaxed">
              The simplest search algorithm: check each element one by one until you find the target or reach the end.
            </p>
          </div>

          <Tabs defaultValue="concept" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="concept">Concept</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="concept" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                    <li>Start at index 0</li>
                    <li>Compare current element with target</li>
                    <li>If match found, return the index</li>
                    <li>If not, move to next element</li>
                    <li>If reach end without finding, return -1</li>
                  </ol>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Linear search works on <strong>both sorted and unsorted</strong> arrays. It's simple but not the most efficient for large datasets.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="implementation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Java Implementation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <pre>{`public static int linearSearch(int[] arr, int target) {
    // Traverse the array from left to right
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;  // Found! Return index
        }
    }
    return -1;  // Not found
}

// Example usage:
int[] numbers = {15, 3, 9, 21, 7};
int index = linearSearch(numbers, 9);
System.out.println(index);  // Output: 2`}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Best Case</div>
                      <div className="text-2xl font-bold text-success">O(1)</div>
                      <div className="text-xs text-muted-foreground mt-1">Target is first element</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Average Case</div>
                      <div className="text-2xl font-bold">O(n)</div>
                      <div className="text-xs text-muted-foreground mt-1">Check ~n/2 elements</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Worst Case</div>
                      <div className="text-2xl font-bold text-destructive">O(n)</div>
                      <div className="text-xs text-muted-foreground mt-1">Target is last or absent</div>
                    </div>
                  </div>
                  <Alert className="bg-primary/5 border-primary/20">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <AlertDescription>
                      <strong>Space Complexity:</strong> O(1) - Only uses a single loop variable, no extra arrays needed.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Binary Search */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Binary Search</h2>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-muted-foreground leading-relaxed">
              A much faster algorithm for <strong>sorted arrays</strong>. Uses divide-and-conquer to eliminate half the search space in each step.
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>The Key Insight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If the array is sorted, you can look at the middle element and immediately know which half contains your target:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                <div>[1, 3, 5, 7, 9, 11, 13, 15, 17]</div>
                <div className="mt-2 text-muted-foreground">Looking for 13...</div>
                <div className="mt-1">Middle = 9 → 13 &gt; 9 → Search right half</div>
                <div className="mt-1">[11, 13, 15, 17]</div>
                <div className="mt-1">Middle = 13 → Found!</div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Implementation</CardTitle>
              <CardDescription>Iterative approach (preferred for clarity)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="code-block">
                <pre>{`public static int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;  // Avoid overflow
        
        if (arr[mid] == target) {
            return mid;  // Found!
        } else if (arr[mid] < target) {
            left = mid + 1;  // Search right half
        } else {
            right = mid - 1;  // Search left half
        }
    }
    
    return -1;  // Not found
}`}</pre>
              </div>
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Critical requirement:</strong> Binary search ONLY works on sorted arrays. Always sort first if needed!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Time Complexity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success mb-2">O(log n)</div>
                <p className="text-sm text-muted-foreground">
                  Dramatically faster than linear search. For 1 million elements, binary search needs at most 20 comparisons!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Pitfall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block text-sm">
                  <pre>{`// ❌ Wrong: Can overflow!
int mid = (left + right) / 2;

// ✅ Correct: Safe from overflow
int mid = left + (right - left) / 2;`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Selection Sort */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Selection Sort</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Algorithm Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Selection sort repeatedly finds the minimum element and places it at the beginning of the unsorted portion.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm space-y-1">
                <div>[64, 25, 12, 22, 11]</div>
                <div className="text-muted-foreground">Find min (11), swap with first:</div>
                <div>[<span className="text-success font-bold">11</span>, 25, 12, 22, 64]</div>
                <div className="text-muted-foreground">Find min in rest (12), swap:</div>
                <div>[<span className="text-success font-bold">11, 12</span>, 25, 22, 64]</div>
                <div className="text-muted-foreground">Continue until sorted...</div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="code-block">
                <pre>{`public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        // Find minimum in unsorted portion
        int minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum with first unsorted element
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}

// Time Complexity: O(n²) - nested loops
// Space Complexity: O(1) - sorts in place`}</pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Practice Exercise */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Challenge: Find Maximum</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Exercise: Maximum Element</CardTitle>
              <CardDescription>
                Write a method that finds the maximum element in an array
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-2">Requirements:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Method signature: <code>public static int findMax(int[] arr)</code></li>
                  <li>Return the largest value in the array</li>
                  <li>Assume array has at least one element</li>
                  <li>Example: <code>findMax([3, 7, 2, 9, 1])</code> returns <code>9</code></li>
                </ul>
              </div>

              <CodeEditor
                defaultCode={`public class ArrayAlgorithms {
    public static int findMax(int[] arr) {
        // TODO: Implement this method
        // Hint: Keep track of the maximum seen so far
        
        
        
        return 0;
    }
    
    public static void main(String[] args) {
        int[] numbers = {3, 7, 2, 9, 1};
        System.out.println(findMax(numbers));  // Should print: 9
    }
}`}
                onSubmit={(code) => handleSubmit("find-max", code)}
                height="350px"
              />

              {completedExercises.has("find-max") && (
                <Alert className="bg-success/10 border-success/20">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success">
                    Excellent! Your solution has been submitted.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" asChild>
            <Link href="/chapter-09/arrays-basics">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Array Basics
            </Link>
          </Button>
          <Button asChild>
            <Link href="/chapter-09/2d-arrays">
              Next: 2D Arrays
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
