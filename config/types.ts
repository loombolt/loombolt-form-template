export type Question = {
  id: string;
  type: "text" | "radio" | "textarea";
  question: string;
  description?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
};

export type QuestionnaireProps = {
  title: string;
  description?: string;
  questions: Question[];
  downloadUrl: string;
  downloadFileName: string;
  primaryColor?: string;
  secondaryColor?: string;
};
