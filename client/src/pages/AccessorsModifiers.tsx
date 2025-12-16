import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle2, Eye, Lock } from "lucide-react";
import { Link } from "wouter";

export default function AccessorsModifiers() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Accessors & Modifiers</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to control access to your data with getters and setters
        </p>
      </div>

      {/* Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Eye className="h-8 w-8 text-accent" />
              <CardTitle>Accessors (Getters)</CardTitle>
            </div>
            <CardDescription>Methods that let you READ private data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Accessors provide <strong>read-only access</strong> to private fields.
            </p>
            <div className="bg-accent/10 border border-accent rounded-lg p-3">
              <pre className="text-sm">
                <code>{`public String getName() {
    return name;
}`}</code>
              </pre>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Format: <code className="bg-muted px-1 rounded">get + FieldName()</code></li>
              <li>• Returns the field's value</li>
              <li>• No parameters</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Lock className="h-8 w-8 text-primary" />
              <CardTitle>Modifiers (Setters)</CardTitle>
            </div>
            <CardDescription>Methods that let you WRITE private data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Modifiers provide <strong>controlled write access</strong> with validation.
            </p>
            <div className="bg-primary/10 border border-primary rounded-lg p-3">
              <pre className="text-sm">
                <code>{`public void setName(String name) {
    if (name != null) {
        this.name = name;
    }
}`}</code>
              </pre>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Format: <code className="bg-muted px-1 rounded">set + FieldName(value)</code></li>
              <li>• Returns <code className="bg-muted px-1 rounded">void</code></li>
              <li>• MUST include validation!</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Complete Example */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Example: Student Class</CardTitle>
          <CardDescription>See how accessors and modifiers work together</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="full" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="full">Complete Class</TabsTrigger>
              <TabsTrigger value="getter">Getters Only</TabsTrigger>
              <TabsTrigger value="setter">Setters Only</TabsTrigger>
            </TabsList>

            <TabsContent value="full" className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class Student {
    // Private fields - hidden from outside
    private String name;
    private double gpa;
    private int age;
    
    // Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.gpa = 0.0;
    }
    
    // ===== ACCESSORS (GETTERS) =====
    public String getName() {
        return name;
    }
    
    public double getGpa() {
        return gpa;
    }
    
    public int getAge() {
        return age;
    }
    
    // ===== MODIFIERS (SETTERS) =====
    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        } else {
            System.out.println("Name cannot be empty!");
        }
    }
    
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("GPA must be between 0.0 and 4.0!");
        }
    }
    
    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            System.out.println("Invalid age!");
        }
    }
}`}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="getter" className="space-y-4">
              <div className="bg-accent/10 border border-accent rounded-lg p-4">
                <h4 className="font-semibold text-accent mb-3">Accessor Methods (Getters)</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`// Read-only access to private fields

public String getName() {
    return name;  // Simply return the value
}

public double getGpa() {
    return gpa;
}

public int getAge() {
    return age;
}

// Usage:
Student student = new Student("Alice", 20);
String name = student.getName();  // "Alice"
double gpa = student.getGpa();    // 0.0
int age = student.getAge();       // 20`}</code>
                </pre>
              </div>

              <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-semibold mb-1">Why Getters Are Important:</h4>
                  <ul className="space-y-1">
                    <li>• Provide read-only access - data can't be modified</li>
                    <li>• Can add logic later (e.g., formatting, logging)</li>
                    <li>• Maintain encapsulation principle</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="setter" className="space-y-4">
              <div className="bg-primary/10 border border-primary rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-3">Modifier Methods (Setters)</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`// Controlled write access with validation

public void setName(String name) {
    if (name != null && !name.isEmpty()) {
        this.name = name;  // ✅ Valid
    } else {
        System.out.println("Name cannot be empty!");
    }
}

public void setGpa(double gpa) {
    if (gpa >= 0.0 && gpa <= 4.0) {
        this.gpa = gpa;  // ✅ Valid range
    } else {
        System.out.println("GPA must be between 0.0 and 4.0!");
    }
}

public void setAge(int age) {
    if (age > 0 && age < 150) {
        this.age = age;  // ✅ Reasonable range
    } else {
        System.out.println("Invalid age!");
    }
}

// Usage:
Student student = new Student("Alice", 20);
student.setGpa(3.8);   // ✅ Accepted
student.setGpa(5.0);   // ❌ Rejected: "GPA must be between 0.0 and 4.0!"
student.setAge(-5);    // ❌ Rejected: "Invalid age!"`}</code>
                </pre>
              </div>

              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-semibold mb-1">Why Setters Are Critical:</h4>
                  <ul className="space-y-1">
                    <li>• <strong>Validation</strong> - Only valid values are accepted</li>
                    <li>• <strong>Business rules</strong> - Enforce constraints automatically</li>
                    <li>• <strong>Side effects</strong> - Can trigger other actions (logging, notifications)</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Design Principles */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Design Principles</CardTitle>
          <CardDescription>Not all fields need getters and setters!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-accent/10 border border-accent rounded-lg p-4">
              <h4 className="font-semibold text-accent mb-2">✅ Read-Only Fields</h4>
              <p className="text-sm mb-2">Some fields should only have getters</p>
              <pre className="text-xs bg-background p-2 rounded">
                <code>{`private final String studentId;

// ✅ Getter only
public String getStudentId() {
    return studentId;
}

// ❌ No setter - ID never changes`}</code>
              </pre>
            </div>

            <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
              <h4 className="font-semibold text-destructive mb-2">❌ No Getter</h4>
              <p className="text-sm mb-2">Sensitive data shouldn't be exposed</p>
              <pre className="text-xs bg-background p-2 rounded">
                <code>{`private String passwordHash;

// ❌ No getter - security risk!

// ✅ Only verification method
public boolean verifyPassword(
    String password
) {
    return hash(password)
        .equals(passwordHash);
}`}</code>
              </pre>
            </div>

            <div className="bg-primary/10 border border-primary rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-2">⚠️ Custom Logic</h4>
              <p className="text-sm mb-2">Sometimes you need special methods</p>
              <pre className="text-xs bg-background p-2 rounded">
                <code>{`private double balance;

// ❌ Don't use setBalance()
// ✅ Use specific methods
public void deposit(double amt) {
    if (amt > 0) {
        balance += amt;
    }
}

public void withdraw(double amt) {
    if (amt > 0 && amt <= balance) {
        balance -= amt;
    }
}`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>⚠️ Common Mistakes to Avoid</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="bg-destructive/10 border-l-4 border-destructive p-4">
              <h4 className="font-semibold text-destructive mb-2">1. Forgetting <code>this</code> keyword</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-destructive mb-1">❌ Wrong:</p>
                  <pre className="text-xs bg-background p-2 rounded">
                    <code>{`public void setName(String name) {
    name = name; // Assigns to itself!
}`}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-xs text-accent mb-1">✅ Correct:</p>
                  <pre className="text-xs bg-background p-2 rounded">
                    <code>{`public void setName(String name) {
    this.name = name; // Assigns to field
}`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-destructive/10 border-l-4 border-destructive p-4">
              <h4 className="font-semibold text-destructive mb-2">2. Wrong return type for getter</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-destructive mb-1">❌ Wrong:</p>
                  <pre className="text-xs bg-background p-2 rounded">
                    <code>{`public void getName() {
    return name; // void can't return!
}`}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-xs text-accent mb-1">✅ Correct:</p>
                  <pre className="text-xs bg-background p-2 rounded">
                    <code>{`public String getName() {
    return name; // Returns String
}`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-destructive/10 border-l-4 border-destructive p-4">
              <h4 className="font-semibold text-destructive mb-2">3. Setter without validation</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-destructive mb-1">❌ Dangerous:</p>
                  <pre className="text-xs bg-background p-2 rounded">
                    <code>{`public void setAge(int age) {
    this.age = age; // No validation!
}`}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-xs text-accent mb-1">✅ Safe:</p>
                  <pre className="text-xs bg-background p-2 rounded">
                    <code>{`public void setAge(int age) {
    if (age > 0 && age < 150) {
        this.age = age;
    }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaway */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>🔑 Key Takeaway</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Accessors and Modifiers are the "gatekeepers" of your data:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Getters</strong> provide safe read access</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Setters</strong> enforce validation rules</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Together</strong> they protect your data from corruption</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/real-world-dangers">
          <Button variant="outline">← Previous: Real-World Dangers</Button>
        </Link>
        <Link href="/interactive-demo">
          <Button className="gap-2">
            Next: Interactive Demo <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
