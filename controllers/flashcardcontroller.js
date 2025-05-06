import {
    getAllFlashcards,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard
  } from '../models/flashcardmodel.js';
  
  export const getAddPage = async (req, res) => {
    res.render('add', { errors: {}, name: '', description: '' });  
  };
  
  export const getManageAllPage = async (req, res) => {
    const flashcards = await getAllFlashcards();
    res.render('manageall', { flashcards }); 
  };
  
  export const postUpdateAllFlashcards = async (req, res) => {
    const { cardIds, cardNames, cardDescriptions } = req.body;
  
    if (cardIds && cardNames && cardDescriptions) {
      for (let i = 0; i < cardIds.length; i++) {
        await updateFlashcard(cardIds[i], cardNames[i], cardDescriptions[i]);
      }
    }
    res.redirect('/manageall');
  };
  
  export const postAddFlashcard = async (req, res) => {
    const { name, description } = req.body;  // Removed deckid field
    const errors = {};
  
    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.name = 'Flashcard name is required and must be a non-empty string';
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
      errors.description = 'Flashcard description is required and must be a non-empty string';
    }
  
    if (Object.keys(errors).length > 0) {
      return res.status(400).render('add', { errors, name, description });
    }
  
    try {
      await addFlashcard(name, description); 
      res.redirect('/add');  // Redirect back to Add page
    } catch (error) {
      res.status(500).render('add', { errors: { general: 'An unexpected error occurred' }, name, description });
    }
  };
  
  export const getManagePage = async (req, res) => {
    const flashcards = await getAllFlashcards();
    res.render('manage', { flashcards });  
  };
  
  export const postDeleteFlashcard = async (req, res) => {
    const { id } = req.params;
    await deleteFlashcard(id);
    res.redirect('/manage');  
  };
  
  export const postUpdateFlashcard = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    await updateFlashcard(id, name, description);
    res.redirect('/manage');
  };
  
