import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "wouter";

export default function WhyEncapsulation() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Why Encapsulation?</h1>
        <p className="text-xl text-muted-foreground">
          Understanding the problem with public fields
        </p>
      </div>

      {/* The Problem */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <XCircle className="h-6 w-6" />
            The Problem: Public Fields
          </CardTitle>
          <CardDescription>
            What happens when we make fields public?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bad" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bad">❌ Bad Design</TabsTrigger>
              <TabsTrigger value="good">✅ Good Design</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bad" className="space-y-4">
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class BankAccount {
    // ❌ Dangerous! Anyone can modify this
    public double balance;
}

// Client code can do this:
BankAccount account = new BankAccount();
account.balance = -1000; // 💥 Negative balance!
account.balance = 999999999; // 💥 Unlimited money!`}</code>
                </pre>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-destructive mb-1">Why This Is Dangerous:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• No validation - any value can be set</li>
                    <li>• No control - anyone can modify the data</li>
                    <li>• No tracking - you can't log or monitor changes</li>
                    <li>• Business logic is bypassed completely</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="good" className="space-y-4">
              <div className="bg-accent/10 border border-accent rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class BankAccount {
    // ✅ Safe! Hidden from outside access
    private double balance;
    
    public double getBalance() {
        return balance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) { // Validation!
            balance += amount;
        } else {
            System.out.println("Invalid amount!");
        }
    }
}

// Client code must use methods:
BankAccount account = new BankAccount();
account.deposit(100); // ✅ Controlled access
account.deposit(-50); // ✅ Rejected by validation`}</code>
                </pre>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-accent mb-1">Benefits of Encapsulation:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Data validation - only valid values are accepted</li>
                    <li>• Controlled access - changes go through methods</li>
                    <li>• Easy to maintain - logic is centralized</li>
                    <li>• Business rules are enforced automatically</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Key Concept */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>🔑 Key Concept: Encapsulation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            <strong>Encapsulation</strong> means hiding the internal details of a class and providing controlled access through public methods.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">1. Hide Data</h4>
              <p className="text-sm opacity-90">Make fields <code className="bg-primary-foreground/20 px-1 rounded">private</code></p>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">2. Provide Methods</h4>
              <p className="text-sm opacity-90">Create <code className="bg-primary-foreground/20 px-1 rounded">public</code> getters/setters</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">3. Add Validation</h4>
              <p className="text-sm opacity-90">Check data before modifying</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/">
          <Button variant="outline">← Back to Home</Button>
        </Link>
        <Link href="/real-world-dangers">
          <Button className="gap-2">
            Next: Real-World Dangers <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
