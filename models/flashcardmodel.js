import { query } from '../config/db.js';

// Get all flashcards
export const getAllFlashcards = async () => {
  const result = await query('SELECT DISTINCT ON (id) * FROM flashcards ORDER BY id DESC');
  return result.rows;
};

// Add a flashcard (no deckid now)
export const addFlashcard = async (name, description) => {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid flashcard name: must be a non-empty string');
  }
  if (typeof description !== 'string' || description.trim() === '') {
    throw new Error('Invalid flashcard description: must be a non-empty string');
  }
  await query('INSERT INTO flashcards (name, description) VALUES ($1, $2)', [name, description]);
};

// Update a flashcard
export const updateFlashcard = async (id, name, description) => {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid flashcard name: must be a non-empty string');
  }
  if (typeof description !== 'string' || description.trim() === '') {
    throw new Error('Invalid flashcard description: must be a non-empty string');
  }
  await query('UPDATE flashcards SET name = $1, description = $2 WHERE id = $3', [name, description, id]);
};

// Delete a flashcard
export const deleteFlashcard = async (id) => {
  await query('DELETE FROM flashcards WHERE id = $1', [id]);
};
