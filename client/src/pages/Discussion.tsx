import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Discussion() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Discussion Questions</h1>
        <p className="text-xl text-muted-foreground">
          Think deeply about encapsulation principles
        </p>
      </div>

      {/* Main Discussion Question */}
      <Card className="border-primary">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">What's Wrong with This Code?</CardTitle>
          </div>
          <CardDescription>
            This is the main discussion question from your lesson
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* The Problem Code */}
          <div>
            <h3 className="font-semibold text-lg mb-3">The Code:</h3>
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`public class BankAccount {
    // ❌ Dangerous!
    public double balance;
    
    // Anyone can change it:
    // acct.balance = -500;
}`}</code>
              </pre>
            </div>
          </div>

          {/* Discussion Prompt */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold mb-2">💭 Think About:</h3>
            <ul className="space-y-2 text-sm">
              <li>• What problems could this code cause?</li>
              <li>• Why is it dangerous to make <code className="bg-background px-1 rounded">balance</code> public?</li>
              <li>• What could happen in a real banking system?</li>
              <li>• How would you fix this code?</li>
            </ul>
          </div>

          {/* Answer Section */}
          <details className="bg-accent/10 border border-accent rounded-lg p-4">
            <summary className="font-semibold cursor-pointer text-accent">
              Click to see detailed answer
            </summary>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Core Problem:</h4>
                <p>
                  The field <code className="bg-background px-1 rounded">balance</code> is declared as <code className="bg-background px-1 rounded">public</code>, 
                  which violates the encapsulation principle.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Specific Consequences:</h4>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>
                    <strong>Data can be arbitrarily modified</strong>
                    <pre className="mt-1 bg-background p-2 rounded text-xs">
                      <code>{`BankAccount myAccount = new BankAccount();
myAccount.balance = -1000; // 💥 Negative balance! Bank goes bankrupt!`}</code>
                    </pre>
                  </li>
                  <li>
                    <strong>No data validation</strong> - Any external code can directly access and modify <code className="bg-background px-1 rounded">balance</code>, 
                    and there's no way to prevent illegal values (negative numbers, huge numbers, NaN, etc.)
                  </li>
                  <li>
                    <strong>Business logic is destroyed</strong> - Bank account balance should only be changed through <code className="bg-background px-1 rounded">deposit()</code> and <code className="bg-background px-1 rounded">withdraw()</code> methods. 
                    Direct field modification bypasses all security checks.
                  </li>
                  <li>
                    <strong>Maintenance nightmare</strong> - If you need to trigger other operations when balance changes (like logging, notifications), 
                    you can't implement it because external code can directly modify the field, bypassing all methods.
                  </li>
                </ol>
              </div>

              <div>
                <h4 className="font-semibold mb-2">✅ The Fix:</h4>
                <pre className="bg-background p-3 rounded text-xs overflow-x-auto">
                  <code>{`public class BankAccount {
    private double balance; // ✅ Make it private!
    
    public double getBalance() {
        return balance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        } else {
            System.out.println("Deposit amount must be positive!");
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Invalid withdrawal!");
        }
    }
}`}</code>
                </pre>
              </div>
            </div>
          </details>
        </CardContent>
      </Card>

      {/* Additional Discussion Questions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">More Discussion Questions</h2>
        <div className="space-y-4">
          {/* Question 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Question 1: When NOT to use a setter?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Consider a <code className="bg-muted px-1 rounded">Student</code> class with a <code className="bg-muted px-1 rounded">studentId</code> field. 
                Should this field have a setter method? Why or why not?
              </p>
              <details className="bg-muted rounded-lg p-3">
                <summary className="font-semibold cursor-pointer text-sm">Show answer</summary>
                <div className="mt-3 text-sm space-y-2">
                  <p>
                    <strong>Answer: NO</strong>, <code className="bg-background px-1 rounded">studentId</code> should NOT have a setter.
                  </p>
                  <p><strong>Reasons:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Student IDs are permanent identifiers that should never change</li>
                    <li>Allowing ID changes could cause database inconsistencies</li>
                    <li>It would violate referential integrity in the system</li>
                  </ul>
                  <p><strong>Best practice:</strong> Make it <code className="bg-background px-1 rounded">final</code> and set it only in the constructor:</p>
                  <pre className="bg-background p-2 rounded text-xs mt-2">
                    <code>{`private final String studentId;

public Student(String id) {
    this.studentId = id;
}

public String getStudentId() {
    return studentId; // Only getter, no setter
}`}</code>
                  </pre>
                </div>
              </details>
            </CardContent>
          </Card>

          {/* Question 2 */}
          <Card>
            <CardHeader>
              <CardTitle>Question 2: Encapsulation vs Performance?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Some students argue: "Using getters and setters adds extra method calls, which slows down the program. 
                Isn't it better to just use public fields for better performance?"
              </p>
              <details className="bg-muted rounded-lg p-3">
                <summary className="font-semibold cursor-pointer text-sm">Show answer</summary>
                <div className="mt-3 text-sm space-y-2">
                  <p><strong>Answer: This is a common misconception.</strong></p>
                  <p><strong>Why this argument is wrong:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Modern JVMs optimize simple getters/setters through <strong>inlining</strong> - the performance difference is negligible</li>
                    <li>The cost of ONE bug caused by unvalidated data far exceeds any theoretical performance gain</li>
                    <li>Premature optimization is the root of all evil - correctness comes before micro-optimizations</li>
                  </ul>
                  <p className="mt-2"><strong>Real-world priority:</strong></p>
                  <p>
                    Correctness &gt; Maintainability &gt; Readability &gt; Performance
                  </p>
                  <p className="mt-2">
                    Only optimize when profiling shows a real bottleneck, and even then, encapsulation should be preserved.
                  </p>
                </div>
              </details>
            </CardContent>
          </Card>

          {/* Question 3 */}
          <Card>
            <CardHeader>
              <CardTitle>Question 3: What about returning mutable objects?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <pre className="text-xs overflow-x-auto">
                  <code>{`public class Student {
    private ArrayList<String> grades;
    
    public ArrayList<String> getGrades() {
        return grades; // Is this safe?
    }
}`}</code>
                </pre>
              </div>
              <p className="text-sm">
                Is this getter safe? Can external code still corrupt the data?
              </p>
              <details className="bg-muted rounded-lg p-3">
                <summary className="font-semibold cursor-pointer text-sm">Show answer</summary>
                <div className="mt-3 text-sm space-y-2">
                  <p><strong>Answer: NO, this is NOT safe!</strong></p>
                  <p><strong>The Problem:</strong></p>
                  <p>
                    Returning a reference to a mutable object (like <code className="bg-background px-1 rounded">ArrayList</code>) 
                    allows external code to modify it:
                  </p>
                  <pre className="bg-background p-2 rounded text-xs mt-2">
                    <code>{`Student student = new Student();
ArrayList<String> grades = student.getGrades();
grades.clear(); // 💥 All grades deleted!
grades.add("F"); // 💥 Added a fake grade!`}</code>
                  </pre>
                  <p className="mt-2"><strong>The Fix: Return a defensive copy</strong></p>
                  <pre className="bg-background p-2 rounded text-xs mt-2">
                    <code>{`public ArrayList<String> getGrades() {
    return new ArrayList<>(grades); // Return a copy
}

// Or return an unmodifiable view:
public List<String> getGrades() {
    return Collections.unmodifiableList(grades);
}`}</code>
                  </pre>
                  <p className="mt-2">
                    <strong>Key Lesson:</strong> Encapsulation isn't just about <code className="bg-background px-1 rounded">private</code> - 
                    you must also protect against indirect access to mutable objects!
                  </p>
                </div>
              </details>
            </CardContent>
          </Card>

          {/* Question 4 */}
          <Card>
            <CardHeader>
              <CardTitle>Question 4: Real-World Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Research and discuss: Can you find a real-world software failure that was caused by poor encapsulation or data validation?
              </p>
              <details className="bg-muted rounded-lg p-3">
                <summary className="font-semibold cursor-pointer text-sm">Show example</summary>
                <div className="mt-3 text-sm space-y-2">
                  <p><strong>Example: The Ariane 5 Rocket Explosion (1996)</strong></p>
                  <p>
                    While not purely an encapsulation issue, this $370 million disaster involved improper data handling:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>A 64-bit floating point number was converted to a 16-bit integer without validation</li>
                    <li>The value was too large, causing an overflow</li>
                    <li>No bounds checking or validation was performed</li>
                    <li>Result: Rocket self-destructed 37 seconds after launch</li>
                  </ul>
                  <p className="mt-2"><strong>Lesson:</strong></p>
                  <p>
                    If the data conversion had been encapsulated in a method with proper validation, 
                    this disaster could have been prevented. This shows why data protection and validation 
                    aren't just "best practices" - they're critical for system safety.
                  </p>
                </div>
              </details>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Takeaways */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>🎯 Discussion Takeaways</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>After discussing these questions, you should understand:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Encapsulation prevents real-world disasters, not just theoretical problems</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Not all fields need setters - some should be read-only</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Performance concerns don't justify breaking encapsulation</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Returning mutable objects requires defensive copying</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Data validation can literally save lives (and millions of dollars)</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/quiz">
          <Button variant="outline">← Previous: Knowledge Check</Button>
        </Link>
        <Link href="/">
          <Button className="gap-2">
            Back to Home <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
