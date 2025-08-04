import { getAllResponses } from "@/db/functions";
import { PasscodeProtect } from "@/components/feature/PasscodeProtect";
import { ResultsTable } from "@/components/feature/ResultsTable";

// Fetch the admin passcode from environment variables, with a default for convenience.
// For production, it's recommended to set a secure passcode in your environment.
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "password123";

export default async function AdminPage() {
  // Fetch the data on the server
  const { data: responses, error } = await getAllResponses();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
       
          <h1>Error Fetching Data</h1>
          <p>
            Could not retrieve questionnaire responses from the database. Please check the console for more details.
          </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PasscodeProtect correctPasscode={ADMIN_PASSCODE}>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>
        <ResultsTable responses={responses || []} />
      </PasscodeProtect>
    </div>
  );
}
