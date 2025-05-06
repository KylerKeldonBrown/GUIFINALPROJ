import express from 'express';
import {
  getAddPage,
  getManagePage,
  postAddFlashcard,
  postUpdateFlashcard,
  postDeleteFlashcard,
  postUpdateAllFlashcards,
  getManageAllPage
} from '../controllers/flashcardcontroller.js';

const router = express.Router();

// Default route to Add Flashcard page
router.get('/', getAddPage); // Make add page default
router.get('/add', getAddPage);
router.post('/add', postAddFlashcard);

// Route for managing flashcards (no deck-related routes)
router.get('/manage', getManagePage);
router.post('/update/:id', postUpdateFlashcard);
router.post('/delete/:id', postDeleteFlashcard);

// Route for managing all flashcards (batch update)
router.get('/manageall', getManageAllPage);
router.post('/manageall/update', postUpdateAllFlashcards);

export default router;
