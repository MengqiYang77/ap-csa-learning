import { useState } from "react";
import { Link } from "wouter";
import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function ArrayListMethods() {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const handleSubmit = async (exerciseId: string, code: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCompletedExercises(prev => new Set(prev).add(exerciseId));
    toast.success("Code submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-muted/20">
        <div className="container py-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/chapter-11">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chapter 11
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">ArrayList Methods</h1>
          <p className="text-lg text-muted-foreground">
            Master the essential ArrayList operations
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-5xl">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Essential Methods</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>add() - Adding Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block">
                  <pre>{`ArrayList<String> list = new ArrayList<>();

// Add to end
list.add("Apple");   // ["Apple"]
list.add("Banana");  // ["Apple", "Banana"]

// Add at specific index
list.add(1, "Cherry");  // ["Apple", "Cherry", "Banana"]

// Time complexity: O(1) for add to end, O(n) for add at index`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>get() - Accessing Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block">
                  <pre>{`String first = list.get(0);   // "Apple"
String second = list.get(1);  // "Cherry"

// Time complexity: O(1) - direct array access`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>set() - Modifying Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block">
                  <pre>{`list.set(0, "Apricot");  // Replace "Apple" with "Apricot"
// Returns old value: "Apple"`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>remove() - Removing Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block">
                  <pre>{`// Remove by index
list.remove(0);  // Removes "Apricot", returns it

// Remove by object
list.remove("Banana");  // Removes first occurrence

// Time complexity: O(n) - must shift elements`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>size() - Get Number of Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block">
                  <pre>{`int count = list.size();  // Not .length!`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Practice Exercise</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Exercise: Manage a Task List</CardTitle>
              <CardDescription>
                Use ArrayList methods to manipulate a list of tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeEditor
                defaultCode={`import java.util.ArrayList;

public class TaskManager {
    public static void main(String[] args) {
        ArrayList<String> tasks = new ArrayList<>();
        
        // Add 3 tasks
        tasks.add("Study Java");
        tasks.add("Do homework");
        tasks.add("Read book");
        
        // Print all tasks
        System.out.println("Tasks: " + tasks);
        
        // TODO: Add a task at index 1
        
        
        // TODO: Change the last task
        
        
        // TODO: Remove the first task
        
        
        System.out.println("Final tasks: " + tasks);
    }
}`}
                onSubmit={(code) => handleSubmit("arraylist-methods", code)}
                exerciseId="arraylist-methods"
                height="450px"
              />

              {completedExercises.has("arraylist-methods") && (
                <Alert className="bg-success/10 border-success/20">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success">
                    Great job! You've mastered ArrayList methods.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" asChild>
            <Link href="/chapter-11/arraylist-basics">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: ArrayList Basics
            </Link>
          </Button>
          <Button asChild>
            <Link href="/chapter-11">
              Back to Chapter 11
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
