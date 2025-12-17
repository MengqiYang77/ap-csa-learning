import { useState } from "react";
import { Link } from "wouter";
import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, ArrowRight, AlertCircle, CheckCircle2, Lightbulb, Zap } from "lucide-react";
import { toast } from "sonner";

export default function ArrayListBasics() {
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
            <Link href="/chapter-11">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chapter 11
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">ArrayList Basics</h1>
          <p className="text-lg text-muted-foreground">
            Understanding dynamic arrays and generic types
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-5xl">
        {/* Introduction */}
        <section className="mb-16">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                The Problem with Arrays
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Imagine you're building a contact list app. How many contacts will a user have? 10? 100? 1000? 
                You don't know in advance! With arrays, you must declare the size upfront:
              </p>
              <div className="code-block">
                <pre>{`String[] contacts = new String[100];  // What if user has 101 contacts?`}</pre>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                <strong>ArrayList solves this problem</strong> by automatically resizing as you add or remove elements. 
                It's like a magical array that grows and shrinks on demand.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Declaration and Import */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Declaration & Import</h2>
          
          <Tabs defaultValue="import" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="import">Import Statement</TabsTrigger>
              <TabsTrigger value="declaration">Declaration</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="import" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Import ArrayList</CardTitle>
                  <CardDescription>ArrayList is in the java.util package</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <pre>{`import java.util.ArrayList;

public class MyProgram {
    public static void main(String[] args) {
        // Now you can use ArrayList
    }
}`}</pre>
                  </div>
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Don't forget the import!</strong> Without it, Java won't recognize ArrayList.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="declaration" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Generic Type Syntax</CardTitle>
                  <CardDescription>ArrayList uses angle brackets &lt;Type&gt; for type safety</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <pre>{`// General syntax:
ArrayList<Type> name = new ArrayList<Type>();

// Specific examples:
ArrayList<String> names = new ArrayList<String>();
ArrayList<Integer> scores = new ArrayList<Integer>();
ArrayList<Double> prices = new ArrayList<Double>();

// Java 7+ shorthand (diamond operator):
ArrayList<String> names = new ArrayList<>();  // Type inferred`}</pre>
                  </div>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Breaking it down:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><code className="bg-background px-2 py-1 rounded">ArrayList&lt;String&gt;</code> - Type of the variable</li>
                      <li><code className="bg-background px-2 py-1 rounded">names</code> - Variable name</li>
                      <li><code className="bg-background px-2 py-1 rounded">new ArrayList&lt;&gt;()</code> - Creates the object</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Common Use Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <pre>{`// Storing student names
ArrayList<String> students = new ArrayList<>();

// Storing test scores
ArrayList<Integer> testScores = new ArrayList<>();

// Storing prices
ArrayList<Double> productPrices = new ArrayList<>();

// Storing custom objects
ArrayList<Person> people = new ArrayList<>();

// Storing boolean flags
ArrayList<Boolean> flags = new ArrayList<>();`}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Generics Deep Dive */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Understanding Generics &lt;T&gt;</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What are Generics?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Generics provide <strong>type safety</strong> at compile time. They tell Java: 
                "This ArrayList will only hold Strings (or Integers, or whatever type you specify)."
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-destructive">❌ Without Generics (Old Java)</h4>
                  <div className="code-block text-sm">
                    <pre>{`ArrayList list = new ArrayList();
list.add("Hello");
list.add(42);  // Allowed! Mixed types
String s = (String) list.get(0);  // Cast needed
String s2 = (String) list.get(1); // Runtime error!`}</pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-success">✅ With Generics (Modern Java)</h4>
                  <div className="code-block text-sm">
                    <pre>{`ArrayList<String> list = new ArrayList<>();
list.add("Hello");
list.add(42);  // Compile error! Type mismatch
String s = list.get(0);  // No cast needed
// Safer and cleaner!`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Critical Rule:</strong> ArrayList cannot store primitive types directly. Use wrapper classes instead:
              <div className="mt-2 font-mono text-sm">
                int → Integer | double → Double | boolean → Boolean | char → Character
              </div>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Wrapper Classes in Action</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="code-block">
                <pre>{`// ❌ Wrong: Cannot use primitives
ArrayList<int> numbers = new ArrayList<>();  // Compile error!

// ✅ Correct: Use wrapper class
ArrayList<Integer> numbers = new ArrayList<>();

// Autoboxing: Java automatically converts for you
numbers.add(5);        // int 5 → Integer object
numbers.add(10);       // int 10 → Integer object

// Unboxing: Automatically converts back
int first = numbers.get(0);  // Integer object → int 5

// Behind the scenes:
// numbers.add(Integer.valueOf(5));
// int first = numbers.get(0).intValue();`}</pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ArrayList vs Array Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">ArrayList vs Array: Side-by-Side</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Array Syntax</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block text-sm">
                  <pre>{`// Declaration
String[] names = new String[5];

// Assignment
names[0] = "Alice";
names[1] = "Bob";

// Access
String first = names[0];

// Length (property)
int size = names.length;

// Cannot resize!
// Cannot add/remove easily`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ArrayList Syntax</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block text-sm">
                  <pre>{`// Declaration
ArrayList<String> names = new ArrayList<>();

// Adding
names.add("Alice");
names.add("Bob");

// Access
String first = names.get(0);

// Size (method)
int size = names.size();

// Can resize!
names.add("Charlie");  // Grows
names.remove(0);       // Shrinks`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Internal Mechanics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">How ArrayList Works Internally</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                The Secret: ArrayList IS an Array!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Surprise! ArrayList is built on top of a regular array. When you create an ArrayList, 
                Java creates an internal array (default size 10). When it fills up, Java:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                <li>Creates a new, larger array (typically 1.5x the old size)</li>
                <li>Copies all elements from old array to new array</li>
                <li>Discards the old array</li>
              </ol>
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm space-y-1">
                <div>Initial capacity: 10 elements</div>
                <div>After filling: Grows to 15 elements</div>
                <div>After filling again: Grows to 22 elements</div>
                <div className="text-muted-foreground mt-2">This is called "dynamic resizing"</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Capacity vs Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Size</h4>
                    <p className="text-sm text-muted-foreground">
                      Number of elements currently stored. Accessed with <code>size()</code> method.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Capacity</h4>
                    <p className="text-sm text-muted-foreground">
                      Size of internal array. Usually larger than size to avoid frequent resizing.
                    </p>
                  </div>
                </div>
                <div className="code-block text-sm">
                  <pre>{`ArrayList<Integer> nums = new ArrayList<>();
// Size: 0, Capacity: 10 (default)

nums.add(5);
nums.add(10);
nums.add(15);
// Size: 3, Capacity: 10

// After adding 8 more elements...
// Size: 11, Capacity: 15 (automatically grew!)`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Practice Exercise */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Practice: Create Your First ArrayList</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Exercise: Student Roster</CardTitle>
              <CardDescription>
                Create an ArrayList of student names and add 3 students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-2">Requirements:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Import ArrayList from java.util</li>
                  <li>Create an ArrayList that stores Strings</li>
                  <li>Add three student names: "Alice", "Bob", "Charlie"</li>
                  <li>Print the size of the ArrayList</li>
                  <li>Print the first student's name</li>
                </ul>
              </div>

              <CodeEditor
                defaultCode={`import java.util.ArrayList;

public class StudentRoster {
    public static void main(String[] args) {
        // TODO: Create ArrayList of Strings named 'students'
        
        
        // TODO: Add three students
        
        
        
        // TODO: Print the size
        
        
        // TODO: Print the first student
        
    }
}`}
                onSubmit={(code) => handleSubmit("arraylist-basics", code)}
                exerciseId="arraylist-basics"
                height="400px"
              />

              {completedExercises.has("arraylist-basics") && (
                <Alert className="bg-success/10 border-success/20">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success">
                    Excellent work! You've created your first ArrayList.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" asChild>
            <Link href="/chapter-11">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chapter 11
            </Link>
          </Button>
          <Button asChild>
            <Link href="/chapter-11/arraylist-methods">
              Next: ArrayList Methods
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
