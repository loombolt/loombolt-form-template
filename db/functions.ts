import { DB } from '@loombolt/db';

// Replace 'YOUR_PUBLIC_KEY' with your actual Loombolt project's public key.
// You can often find this in your Loombolt project settings.
const db = new DB({ publicKey: process.env.NEXT_PUBLIC_LOOMBOLTDB_PUBLIC_KEY!});

const responsesCollection = db.collection('responses');

/**
 * Creates a new record in the 'responses' collection.
 * @param responseData - The data for the new record, e.g., { name: 'John Doe', email: 'john@example.com', ... }.
 */
export async function saveQuestionnaireResponse(responseData: object) {
  const { data, error } = await responsesCollection.create(responseData);
  if (error) {
    console.error("Error creating response record:", error.message);
  } 
  return { data, error };
}

/**
 * Retrieves all records from the 'responses' collection.
 */
export async function getAllResponses() {
  const { data, error } = await responsesCollection.find().order('created_at', { ascending: false });
  if (error) {
    console.error("Error fetching responses:", error.message);
  }
  return { data, error };
}
