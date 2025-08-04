import { Question } from "./types";

export const sampleQuestions: Question[] = [
  {
    id: "name",
    type: "text",
    question: "What is your name?",
    description: "Please enter your full name",
    required: true,
  },
  {
    id: "email",
    type: "text",
    question: "What is your email address?",
    description: "We'll never share your email with anyone else",
    required: true,
  },
  {
    id: "experience",
    type: "radio",
    question: "How would you rate your experience with our product?",
    options: [
      { value: "excellent", label: "Excellent" },
      { value: "good", label: "Good" },
      { value: "average", label: "Average" },
      { value: "poor", label: "Poor" },
    ],
    required: true,
  },
  {
    id: "feedback",
    type: "textarea",
    question: "Do you have any additional feedback?",
    description: "Please share any thoughts or suggestions",
    required: false,
  },
];
