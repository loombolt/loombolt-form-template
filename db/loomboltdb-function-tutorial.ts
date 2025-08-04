import { DB } from '@loombolt/db';

// Please create a new seperate file for your own functions, as this is just for reference.

// Replace 'YOUR_PUBLIC_KEY' with your actual Loombolt project's public key.
// You can often find this in your Loombolt project settings.
const db = new DB({ publicKey: process.env.NEXT_PUBLIC_LOOMBOLTDB_PUBLIC_KEY!});

// Hardcode the collection to 'welcome' for this set of functions.
const welcomeCollection = db.collection('welcome');

/**
 * =================================================================
 * QueryBuilder & MutationBuilder Methods Reference
 * =================================================================
 *
 * .eq(column, value): Finds all rows where column is equal to value.
 * .neq(column, value): Finds all rows where column is not equal to value.
 * .gt(column, value): Finds all rows where column is greater than value.
 * .lt(column, value): Finds all rows where column is less than value.
 * .gte(column, value): Finds all rows where column is greater than or equal to value.
 * .lte(column, value): Finds all rows where column is less than or equal to value.
 * .order(column, { ascending }): Orders the results by column. `ascending` defaults to true.
 * .limit(count): Limits the number of returned rows to `count`.
 * .offset(count): Skips `count` rows.
 * .single(): Fetches a single record instead of an array. If no record is found, it returns null.
 */

/**
 * Creates a new record in the 'welcome' collection.
 * @param recordData - The data for the new record, e.g., { message: 'Hello!' }.
 */
export async function createWelcomeRecord(recordData: object) {
  const { data, error } = await welcomeCollection.create(recordData);
  if (error) {
    console.error("Error creating welcome record:", error.message);
  } 
  return { data, error };
}

/**
 * Finds a single record in the 'welcome' collection by its ID.
 * @param recordId - The ID of the record to find.
 */
export async function findWelcomeRecordById(recordId: string | number) {
  const { data, error } = await welcomeCollection.find().eq('recordId', recordId).single();
  if (error) {
    console.error('Error finding welcome record:', error.message);
  } 
  return { data, error };
}

/**
 * Updates a record in the 'welcome' collection by its ID.
 * @param recordId - The ID of the record to update.
 * @param updateData - The data to update.
 */
export async function updateWelcomeRecord(recordId: string | number, updateData: object) {
  const { data, error } = await welcomeCollection.update(updateData).eq('id', recordId);
  if (error) {
    console.error('Error updating welcome record:', error.message);
  } 
  return { data, error };
}

/**
 * Deletes a record from the 'welcome' collection by its ID.
 * @param recordId - The ID of the record to delete.
 */
export async function deleteWelcomeRecord(recordId: string | number) {
  const { data, error } = await welcomeCollection.delete().eq('id', recordId);
  if (error) {
    console.error('Error deleting welcome record:', error.message);
  } 
  return { data, error };
}

