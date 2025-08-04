/*
  Questionnaire form with reward download functionality
*/
import { Questionnaire } from "@/components/feature/Questionnaire";
import Link from "next/link";
import { Sparkle } from "lucide-react";
import { sampleQuestions } from "@/config/questionnaire";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="max-w-2xl text-center mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">User Feedback Form</h1>
          <p className="text-muted-foreground">
            Complete this short survey to receive your exclusive reward
          </p>
        </div>
        
        <div className="w-full max-w-2xl">
          <Questionnaire 
            title="User Feedback Survey"
            description="Please answer the following questions to help us improve our services"
            questions={sampleQuestions}
            downloadUrl="https://gecogcwqthplfhptoccl.supabase.co/storage/v1/object/public/public-images/previews/catthumbsup.webp"
            downloadFileName="catthumbsup.webp"
            primaryColor="#4f46e5" // Indigo color
            secondaryColor="#eef2ff" // Light indigo background
          />
        </div>
      </main>
      
      <footer className="w-full pb-6">
        <div className="container mx-auto flex flex-col items-center justify-center space-x-4 py-2 text-sm text-muted-foreground">
          
          <Link href="https://loombolt.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Sparkle className="h-4 w-4"/>
            <span>Built with</span>
            <span className="font-medium">Loombolt</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}