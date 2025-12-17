import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, ArrowRight, Building2, GamepadIcon, GraduationCap, Heart } from "lucide-react";
import { Link } from "wouter";

export default function RealWorldDangers() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Real-World Dangers</h1>
        <p className="text-xl text-muted-foreground">
          See what happens when data isn't protected
        </p>
      </div>

      {/* Warning Banner */}
      <Card className="border-destructive bg-destructive/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg mb-2">These are real scenarios!</h3>
              <p className="text-muted-foreground">
                The following examples are based on actual software failures caused by poor data protection.
                Understanding these dangers will make you a better programmer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenarios */}
      <Tabs defaultValue="banking" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="banking">Banking</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="gaming">Gaming</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
        </TabsList>

        {/* Banking Scenario */}
        <TabsContent value="banking" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Banking System Crash</CardTitle>
              </div>
              <CardDescription>What happens when account balances aren't protected</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                <h4 className="font-semibold text-destructive mb-2">❌ Vulnerable Code:</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class BankAccount {
    public double balance; // ❌ Public field
}

// Malicious or buggy code:
BankAccount account = new BankAccount();
account.balance = -999999; // Negative balance!`}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">💥 Consequences:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Financial reports become incorrect</strong> - The bank's total assets calculation includes negative balances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Regulatory violations</strong> - Banks must maintain minimum capital requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Customer trust destroyed</strong> - News of data corruption spreads quickly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Millions in losses</strong> - System must be shut down for emergency fixes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/10 border border-accent rounded-lg p-4">
                <h4 className="font-semibold text-accent mb-2">✅ Protected Code:</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class BankAccount {
    private double balance; // ✅ Private field
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        } else {
            throw new IllegalArgumentException(
                "Deposit amount must be positive"
            );
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        } else {
            throw new IllegalArgumentException(
                "Invalid withdrawal amount"
            );
        }
    }
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Scenario */}
        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Grade Tampering</CardTitle>
              </div>
              <CardDescription>When students can modify their own grades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                <h4 className="font-semibold text-destructive mb-2">❌ Vulnerable Code:</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class Student {
    public double gpa; // ❌ Public field
}

// Student code:
Student me = new Student();
me.gpa = 4.0; // I just gave myself a perfect GPA!`}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">💥 Consequences:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Academic integrity destroyed</strong> - Students can change grades at will</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Scholarship fraud</strong> - Undeserving students receive financial aid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Graduation requirements bypassed</strong> - Students graduate without meeting standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>University reputation ruined</strong> - Degrees become worthless</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/10 border border-accent rounded-lg p-4">
                <h4 className="font-semibold text-accent mb-2">✅ Protected Code:</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class Student {
    private double gpa; // ✅ Private field
    
    // Only professors can update GPA through official system
    public void updateGpa(double newGpa, Professor professor) {
        if (!professor.isAuthorized()) {
            throw new SecurityException(
                "Only authorized professors can update GPA"
            );
        }
        if (newGpa >= 0.0 && newGpa <= 4.0) {
            this.gpa = newGpa;
            logGpaChange(professor); // Audit trail
        } else {
            throw new IllegalArgumentException(
                "GPA must be between 0.0 and 4.0"
            );
        }
    }
    
    // Students can only view their GPA
    public double getGpa() {
        return gpa;
    }
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gaming Scenario */}
        <TabsContent value="gaming" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <GamepadIcon className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Game Cheating Epidemic</CardTitle>
              </div>
              <CardDescription>When players can modify their stats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                <h4 className="font-semibold text-destructive mb-2">❌ Vulnerable Code:</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class Player {
    public int health;  // ❌ Public field
    public int gold;    // ❌ Public field
    public int level;   // ❌ Public field
}

// Player code:
Player myCharacter = new Player();
myCharacter.health = 999999;  // Invincible!
myCharacter.gold = 999999;    // Unlimited money!
myCharacter.level = 100;      // Max level instantly!`}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">💥 Consequences:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Game balance destroyed</strong> - Cheaters dominate all competitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Honest players quit</strong> - No one wants to play against cheaters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Revenue loss</strong> - Players won't buy in-game items if cheating is easy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Game dies</strong> - Player base shrinks until game shuts down</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/10 border border-accent rounded-lg p-4">
                <h4 className="font-semibold text-accent mb-2">✅ Protected Code:</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class Player {
    private int health;  // ✅ Private field
    private int gold;    // ✅ Private field
    private int level;   // ✅ Private field
    
    public void takeDamage(int damage) {
        if (damage > 0) {
            health -= damage;
            if (health < 0) health = 0;
            checkIfDefeated();
        }
    }
    
    public void earnGold(int amount, QuestReward reward) {
        if (reward.isValid()) {
            gold += amount;
            logTransaction(reward); // Anti-cheat tracking
        }
    }
    
    public void levelUp() {
        if (hasEnoughExperience()) {
            level++;
            notifyAchievementSystem();
        }
    }
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Healthcare Scenario */}
        <TabsContent value="healthcare" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Heart className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Medical System Fatal Error</CardTitle>
              </div>
              <CardDescription>When patient data can be corrupted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                <h4 className="font-semibold text-destructive mb-2">❌ Vulnerable Code:</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class Patient {
    public String bloodType; // ❌ Public field
    public String allergies; // ❌ Public field
}

// Buggy or malicious code:
Patient patient = new Patient();
patient.bloodType = "XYZ";  // Invalid blood type!
patient.allergies = null;   // Critical info deleted!`}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">💥 Consequences:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Wrong blood transfusion</strong> - Patient receives incompatible blood type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Allergic reactions</strong> - Doctors don't know about patient allergies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Patient death</strong> - Medical errors due to corrupted data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span><strong>Hospital liability</strong> - Lawsuits and criminal charges</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/10 border border-accent rounded-lg p-4">
                <h4 className="font-semibold text-accent mb-2">✅ Protected Code:</h4>
                <pre className="text-sm overflow-x-auto">
                  <code>{`public class Patient {
    private String bloodType; // ✅ Private field
    private List<String> allergies; // ✅ Private field
    
    private static final Set<String> VALID_BLOOD_TYPES = 
        Set.of("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-");
    
    public void setBloodType(String bloodType, Doctor doctor) {
        if (!doctor.isCertified()) {
            throw new SecurityException(
                "Only certified doctors can update blood type"
            );
        }
        if (!VALID_BLOOD_TYPES.contains(bloodType)) {
            throw new IllegalArgumentException(
                "Invalid blood type: " + bloodType
            );
        }
        this.bloodType = bloodType;
        auditLog.record(doctor, "Updated blood type");
    }
    
    public void addAllergy(String allergy, Doctor doctor) {
        if (allergy == null || allergy.isEmpty()) {
            throw new IllegalArgumentException(
                "Allergy cannot be null or empty"
            );
        }
        allergies.add(allergy);
        alertMedicalStaff(); // Critical safety alert
    }
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Key Takeaway */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>🎯 Key Takeaway</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            These aren't just theoretical problems. Real systems fail when data isn't protected. 
            Encapsulation isn't about being "fancy" - it's about <strong>preventing disasters</strong>.
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/why-encapsulation">
          <Button variant="outline">← Previous: Why Encapsulation</Button>
        </Link>
        <Link href="/accessors-modifiers">
          <Button className="gap-2">
            Next: Accessors & Modifiers <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
