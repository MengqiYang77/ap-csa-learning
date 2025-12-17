import Editor from "@monaco-editor/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Play, RotateCcw, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface CodeEditorProps {
  defaultCode?: string;
  onSubmit?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
  language?: string;
  exerciseId?: string; // For auto-grading
}

export function CodeEditor({
  defaultCode = "",
  onSubmit,
  readOnly = false,
  height = "400px",
  language = "java",
  exerciseId,
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gradingResult, setGradingResult] = useState<any>(null);
  
  const gradeMutation = trpc.grading.gradeExercise.useMutation();

  const checkBadgesMutation = trpc.badges.checkNewBadges.useMutation();

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    setIsSubmitting(true);
    try {
      // If exerciseId provided, run auto-grading
      if (exerciseId) {
        const result = await gradeMutation.mutateAsync({
          exerciseId,
          code,
        });
        setGradingResult(result);
        
        if (result.passed) {
          toast.success(`Perfect! Score: ${result.score}/100`);
        } else {
          toast.warning(`Score: ${result.score}/100 - Check feedback below`);
        }
      }
      
      // Call original onSubmit callback
      if (onSubmit) {
        await onSubmit(code);
      } else if (!exerciseId) {
        toast.success("Code submitted successfully!");
      }
      
      // Check for new badges after submission
      try {
        const newBadges = await checkBadgesMutation.mutateAsync();
        if (newBadges && newBadges.length > 0) {
          newBadges.forEach((badge: any) => {
            toast.success(`🎉 New badge unlocked: ${badge.icon} ${badge.name}!`, {
              duration: 5000,
            });
          });
        }
      } catch (err) {
        // Silent fail for badge checking
      }
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setGradingResult(null);
  };

  return (
    <div>
      <Card className="overflow-hidden shadow-soft">
        <div className="border-b border-border bg-muted/30 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="ml-2 text-sm font-code text-muted-foreground">
              {language === "java" ? "Main.java" : "code." + language}
            </span>
          </div>
          {!readOnly && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                disabled={code === defaultCode}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={isSubmitting || !code.trim()}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    {exerciseId ? "Submit & Grade" : "Submit Code"}
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
        <Editor
          height={height}
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-light"
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            padding: { top: 16, bottom: 16 },
            fontFamily: "JetBrains Mono, monospace",
            smoothScrolling: true,
            cursorBlinking: "smooth",
            renderLineHighlight: "all",
            renderWhitespace: "selection",
          }}
        />
      </Card>
      
      {/* Grading Results */}
      {gradingResult && (
        <div className="mt-4 space-y-3">
          <Alert className={gradingResult.passed ? "bg-success/10 border-success/20" : "bg-destructive/10 border-destructive/20"}>
            <div className="flex items-start gap-3">
              {gradingResult.passed ? (
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive mt-0.5" />
              )}
              <div className="flex-1">
                <div className="font-semibold mb-2">
                  Score: {gradingResult.score}/100 ({gradingResult.passedTests}/{gradingResult.totalTests} tests passed)
                </div>
                <div className="text-sm space-y-1">
                  {gradingResult.feedback.map((line: string, i: number) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </Alert>
          
          {gradingResult.failedTests.length > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold mb-2">Hints to fix:</div>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  {gradingResult.failedTests.map((test: any, i: number) => (
                    <li key={i}>{test.hint}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
