import express from 'express';
import path from 'path';
import flashcardRoutes from './routes/flashcardRoutes.js';

const app = express();

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Static file serving for public directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Use flashcard routes
app.use('/', flashcardRoutes); // '/' now maps to /add page for adding flashcards

// Set up the server to listen on a port
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
