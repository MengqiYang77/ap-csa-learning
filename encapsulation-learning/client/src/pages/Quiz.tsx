import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface Question {
  id: number;
  question: string;
  code?: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Why should fields be declared as private?",
    options: [
      "To make the code run faster",
      "To prevent direct access and allow controlled modification through methods",
      "To save memory",
      "Private fields are easier to type"
    ],
    correct: 1,
    explanation: "Private fields prevent direct access from outside the class, forcing users to go through methods where we can add validation and control."
  },
  {
    id: 2,
    question: "What is the correct format for a getter method?",
    code: `private String name;`,
    options: [
      "public void getName() { return name; }",
      "public String getName() { return name; }",
      "private String getName() { return name; }",
      "public String get() { return name; }"
    ],
    correct: 1,
    explanation: "A getter must be public, return the same type as the field, and follow the naming convention get + FieldName()."
  },
  {
    id: 3,
    question: "What's wrong with this setter?",
    code: `public void setAge(int age) {
    age = age;
}`,
    options: [
      "Nothing, it's correct",
      "Missing the 'this' keyword - it assigns the parameter to itself",
      "Should return a value",
      "Should be private"
    ],
    correct: 1,
    explanation: "Without 'this', the code assigns the parameter to itself (age = age) instead of assigning to the field. Should be: this.age = age;"
  },
  {
    id: 4,
    question: "Which of these is the MOST important reason to use setters?",
    options: [
      "To make the code longer",
      "To add validation and prevent invalid data",
      "To follow naming conventions",
      "To make the class look professional"
    ],
    correct: 1,
    explanation: "The primary purpose of setters is to add validation logic that prevents invalid data from corrupting the object's state."
  },
  {
    id: 5,
    question: "What will happen with this code?",
    code: `public class BankAccount {
    public double balance;
}

BankAccount acc = new BankAccount();
acc.balance = -1000;`,
    options: [
      "Compiler error",
      "Runtime error",
      "The code runs but creates invalid data (negative balance)",
      "The balance automatically becomes 0"
    ],
    correct: 2,
    explanation: "The code compiles and runs, but it creates invalid data. This is why public fields are dangerous - there's no validation to prevent negative balances."
  },
  {
    id: 6,
    question: "When should a field NOT have a setter?",
    options: [
      "Never - all fields should have setters",
      "When the field should be read-only after initialization",
      "When the field is private",
      "When the field is a String"
    ],
    correct: 1,
    explanation: "Some fields like ID numbers or creation dates should be read-only after object creation. These should only have getters, not setters."
  },
  {
    id: 7,
    question: "What's the best way to handle invalid input in a setter?",
    code: `public void setGpa(double gpa) {
    // What should go here?
    this.gpa = gpa;
}`,
    options: [
      "Just set the value without checking",
      "Check if the value is valid; if not, reject it or throw an exception",
      "Always set the value to 0",
      "Print a warning but set the value anyway"
    ],
    correct: 1,
    explanation: "Setters should validate input and either reject invalid values (by not setting them) or throw an exception. This prevents bad data from entering the object."
  },
  {
    id: 8,
    question: "What is encapsulation?",
    options: [
      "Making all methods public",
      "Hiding implementation details and providing controlled access through methods",
      "Using lots of classes",
      "Writing long method names"
    ],
    correct: 1,
    explanation: "Encapsulation is the principle of hiding internal details (private fields) and providing controlled access through public methods (getters/setters)."
  }
];

export default function Quiz() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-accent";
    if (percentage >= 60) return "text-primary";
    return "text-destructive";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You've mastered encapsulation! 🎉";
    if (percentage >= 60) return "Good job! Review the missed questions to improve.";
    return "Keep studying! Review the lessons and try again.";
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Knowledge Check</h1>
        <p className="text-xl text-muted-foreground">
          Test your understanding of encapsulation concepts
        </p>
      </div>

      {/* Score Card */}
      {submitted && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className={`text-3xl ${getScoreColor()}`}>
              Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </CardTitle>
            <CardDescription className="text-lg">
              {getScoreMessage()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correct;
          const showFeedback = submitted && userAnswer !== undefined;

          return (
            <Card 
              key={q.id}
              className={
                showFeedback
                  ? isCorrect
                    ? "border-accent"
                    : "border-destructive"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <span className="text-muted-foreground">Q{q.id}.</span>
                  <span className="flex-1">{q.question}</span>
                  {showFeedback && (
                    isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                    )
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {q.code && (
                  <div className="bg-muted rounded-lg p-3">
                    <pre className="text-sm overflow-x-auto">
                      <code>{q.code}</code>
                    </pre>
                  </div>
                )}

                <RadioGroup
                  value={userAnswer?.toString()}
                  onValueChange={(value) => handleAnswerChange(q.id, parseInt(value))}
                  disabled={submitted}
                >
                  {q.options.map((option, index) => {
                    const isThisCorrect = index === q.correct;
                    const isSelected = userAnswer === index;

                    return (
                      <div
                        key={index}
                        className={`flex items-start space-x-3 p-3 rounded-lg border ${
                          submitted
                            ? isThisCorrect
                              ? "bg-accent/10 border-accent"
                              : isSelected
                              ? "bg-destructive/10 border-destructive"
                              : "bg-muted"
                            : isSelected
                            ? "bg-primary/10 border-primary"
                            : "bg-muted"
                        }`}
                      >
                        <RadioGroupItem value={index.toString()} id={`q${q.id}-${index}`} />
                        <Label
                          htmlFor={`q${q.id}-${index}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                        {submitted && isThisCorrect && (
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                        )}
                        {submitted && isSelected && !isThisCorrect && (
                          <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>

                {showFeedback && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-lg ${
                      isCorrect ? "bg-accent/10" : "bg-destructive/10"
                    }`}
                  >
                    <AlertCircle
                      className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                        isCorrect ? "text-accent" : "text-destructive"
                      }`}
                    />
                    <div>
                      <h4 className="font-semibold mb-1">
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </h4>
                      <p className="text-sm">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <Card>
          <CardContent className="pt-6">
            <Button
              onClick={handleSubmit}
              className="w-full"
              size="lg"
              disabled={Object.keys(answers).length !== questions.length}
            >
              {Object.keys(answers).length === questions.length
                ? "Submit Quiz"
                : `Answer All Questions (${Object.keys(answers).length}/${questions.length})`}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/interactive-demo">
          <Button variant="outline">← Previous: Interactive Demo</Button>
        </Link>
        <Link href="/discussion">
          <Button className="gap-2">
            Next: Discussion Questions <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
