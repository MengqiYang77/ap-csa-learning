import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ArrowRight, CheckCircle2, Code2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function InteractiveDemo() {
  const [output1, setOutput1] = useState<string[]>([]);
  const [output2, setOutput2] = useState<string[]>([]);

  const runBadExample = () => {
    const logs: string[] = [];
    logs.push("Creating BankAccount with public balance...");
    logs.push("account.balance = 1000");
    logs.push("account.balance = -500  // ❌ Negative balance allowed!");
    logs.push("account.balance = 999999999  // ❌ Unlimited money!");
    logs.push("");
    logs.push("Result: Data is corrupted! No validation!");
    setOutput1(logs);
  };

  const runGoodExample = () => {
    const logs: string[] = [];
    logs.push("Creating BankAccount with private balance...");
    logs.push("account.deposit(1000)  // ✅ Balance: 1000");
    logs.push("account.withdraw(200)  // ✅ Balance: 800");
    logs.push("account.withdraw(-50)  // ❌ Rejected: Invalid amount");
    logs.push("account.withdraw(1000) // ❌ Rejected: Insufficient funds");
    logs.push("");
    logs.push("Result: Data is protected! Validation works!");
    setOutput2(logs);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Interactive Code Demo</h1>
        <p className="text-xl text-muted-foreground">
          See encapsulation in action with live examples
        </p>
      </div>

      {/* Live Demo */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Code2 className="h-8 w-8 text-primary" />
            <CardTitle>Live Comparison: Bad vs Good Design</CardTitle>
          </div>
          <CardDescription>
            Click "Run Code" to see the difference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bad" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bad">❌ Bad Design (Public Fields)</TabsTrigger>
              <TabsTrigger value="good">✅ Good Design (Encapsulated)</TabsTrigger>
            </TabsList>

            <TabsContent value="bad" className="space-y-4">
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                <h4 className="font-semibold text-destructive mb-3">Code:</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class BankAccount {
    public double balance; // ❌ Public field - no protection!
}

// Client code:
BankAccount account = new BankAccount();
account.balance = 1000;
account.balance = -500;        // ❌ Negative balance!
account.balance = 999999999;   // ❌ Unlimited money!`}</code>
                </pre>
              </div>

              <Button onClick={runBadExample} className="w-full" variant="destructive">
                Run Bad Code
              </Button>

              {output1.length > 0 && (
                <div className="bg-background border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Output:
                  </h4>
                  <pre className="text-sm font-mono">
                    {output1.map((line, i) => (
                      <div key={i} className={line.includes("❌") ? "text-destructive" : ""}>
                        {line}
                      </div>
                    ))}
                  </pre>
                </div>
              )}
            </TabsContent>

            <TabsContent value="good" className="space-y-4">
              <div className="bg-accent/10 border border-accent rounded-lg p-4">
                <h4 className="font-semibold text-accent mb-3">Code:</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class BankAccount {
    private double balance; // ✅ Private field - protected!
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        } else {
            System.out.println("Invalid amount!");
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Invalid withdrawal!");
        }
    }
    
    public double getBalance() {
        return balance;
    }
}

// Client code:
BankAccount account = new BankAccount();
account.deposit(1000);     // ✅ Accepted
account.withdraw(200);     // ✅ Accepted
account.withdraw(-50);     // ❌ Rejected by validation
account.withdraw(1000);    // ❌ Rejected: insufficient funds`}</code>
                </pre>
              </div>

              <Button onClick={runGoodExample} className="w-full" variant="default">
                Run Good Code
              </Button>

              {output2.length > 0 && (
                <div className="bg-background border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Output:
                  </h4>
                  <pre className="text-sm font-mono">
                    {output2.map((line, i) => (
                      <div 
                        key={i} 
                        className={
                          line.includes("✅") ? "text-accent" : 
                          line.includes("❌") ? "text-destructive" : 
                          ""
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </pre>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* More Examples */}
      <div>
        <h2 className="text-2xl font-bold mb-4">More Interactive Examples</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Student Example */}
          <Card>
            <CardHeader>
              <CardTitle>Student Class</CardTitle>
              <CardDescription>GPA validation in action</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <pre className="text-xs overflow-x-auto">
                  <code>{`public class Student {
    private double gpa;
    
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println(
                "GPA must be 0.0-4.0!"
            );
        }
    }
}`}</code>
                </pre>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <code>student.setGpa(3.8)</code> → Accepted
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <code>student.setGpa(5.0)</code> → Rejected
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <code>student.setGpa(-1.0)</code> → Rejected
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Player Example */}
          <Card>
            <CardHeader>
              <CardTitle>Game Player Class</CardTitle>
              <CardDescription>Health validation in action</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted rounded-lg p-3">
                <pre className="text-xs overflow-x-auto">
                  <code>{`public class Player {
    private int health;
    private final int MAX_HEALTH = 100;
    
    public void takeDamage(int damage) {
        if (damage > 0) {
            health -= damage;
            if (health < 0) {
                health = 0;
            }
        }
    }
    
    public void heal(int amount) {
        if (amount > 0) {
            health += amount;
            if (health > MAX_HEALTH) {
                health = MAX_HEALTH;
            }
        }
    }
}`}</code>
                </pre>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <code>player.takeDamage(30)</code> → Health: 70
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <code>player.heal(50)</code> → Health: 100 (capped)
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <code>player.takeDamage(-10)</code> → Rejected
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Challenge */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>🎯 Challenge: Fix This Code!</CardTitle>
          <CardDescription>Can you spot and fix the problems?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
            <h4 className="font-semibold text-destructive mb-2">Broken Code:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`public class Product {
    public double price; // Problem 1: Public field
    public int stock;    // Problem 2: Public field
}

// Client code can do this:
Product product = new Product();
product.price = -10;     // Problem 3: Negative price!
product.stock = -100;    // Problem 4: Negative stock!`}</code>
            </pre>
          </div>

          <div className="bg-accent/10 border border-accent rounded-lg p-4">
            <h4 className="font-semibold text-accent mb-2">Your Task:</h4>
            <ol className="text-sm space-y-2 list-decimal list-inside">
              <li>Make the fields <code className="bg-background px-1 rounded">private</code></li>
              <li>Add getter methods for both fields</li>
              <li>Add a <code className="bg-background px-1 rounded">setPrice()</code> method that only accepts positive values</li>
              <li>Add a <code className="bg-background px-1 rounded">setStock()</code> method that only accepts non-negative values</li>
            </ol>
          </div>

          <details className="bg-muted rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">Click to see solution</summary>
            <pre className="text-sm overflow-x-auto mt-3">
              <code>{`public class Product {
    private double price; // ✅ Private
    private int stock;    // ✅ Private
    
    // Getters
    public double getPrice() {
        return price;
    }
    
    public int getStock() {
        return stock;
    }
    
    // Setters with validation
    public void setPrice(double price) {
        if (price > 0) {
            this.price = price;
        } else {
            System.out.println("Price must be positive!");
        }
    }
    
    public void setStock(int stock) {
        if (stock >= 0) {
            this.stock = stock;
        } else {
            System.out.println("Stock cannot be negative!");
        }
    }
}`}</code>
            </pre>
          </details>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/accessors-modifiers">
          <Button variant="outline">← Previous: Accessors & Modifiers</Button>
        </Link>
        <Link href="/quiz">
          <Button className="gap-2">
            Next: Knowledge Check <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
