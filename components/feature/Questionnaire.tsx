"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Download, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionnaireProps, Question } from "@/config/types";
import { saveQuestionnaireResponse } from "@/db/functions";

export function Questionnaire({
  title,
  description,
  questions,
  downloadUrl,
  downloadFileName,
  primaryColor = "#3b82f6", // Default blue color
  secondaryColor = "#f0f9ff", // Default light blue background
}: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const totalSteps = questions.length;
  const progress = completed ? 100 : ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === totalSteps - 1;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isCurrentQuestionAnswered()) {
      // For textareas, we might want to allow Shift+Enter for a new line
      if (e.currentTarget.tagName === 'TEXTAREA' && e.shiftKey) {
        return;
      }
      e.preventDefault();
      handleNext(e);
    }
  };

  const handleNext = async (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (isLastQuestion) {
      await saveQuestionnaireResponse(answers);
      setCompleted(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Network response was not ok.');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = downloadFileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Download failed:', error);
      // Optionally, show an error message to the user
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion.required) return true;
    return !!answers[currentQuestion.id];
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor={currentQuestion.id}>{currentQuestion.question}</Label>
            {currentQuestion.description && (
              <p className="text-sm text-muted-foreground">{currentQuestion.description}</p>
            )}
            <Input
              id={currentQuestion.id}
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer here..."
              required={currentQuestion.required}
            />
          </div>
        );
      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={currentQuestion.id}>{currentQuestion.question}</Label>
            {currentQuestion.description && (
              <p className="text-sm text-muted-foreground">{currentQuestion.description}</p>
            )}
            <Textarea
              id={currentQuestion.id}
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer here..."
              required={currentQuestion.required}
            />
          </div>
        );
      case "radio":
        return (
          <div className="space-y-4">
            <Label>{currentQuestion.question}</Label>
            {currentQuestion.description && (
              <p className="text-sm text-muted-foreground">{currentQuestion.description}</p>
            )}
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              onKeyDown={handleKeyDown}
            >
              {currentQuestion.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
                  <Label htmlFor={`${currentQuestion.id}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg" >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="text-sm text-muted-foreground">
                Question {currentStep + 1} of {totalSteps}
              </div>
              {renderQuestion()}
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-8 text-center space-y-4"
            >
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold">Thank you!</h3>
              <p className="text-muted-foreground">
                Your responses have been recorded. You can now download your reward.
              </p>
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="mt-4 gap-2"
                style={{ backgroundColor: primaryColor }}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Reward
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      {!completed && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered()}
            className="gap-1"
            style={{ backgroundColor: primaryColor }}
          >
            {isLastQuestion ? "Complete" : "Next"} <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
