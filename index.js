const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Import Sequelize and model
const sequelize = require('./config/database');
const Book = require('./models/book');

app.use(express.json());
app.use(cors());

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Welcome message
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book Gala! Take it easy and enjoy the journey.');
});

// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json({
      status: 0,
      data: books,
      message: 'All books retrieved successfully. Take a deep breath and relax!'
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: 'Error retrieving books.',
      error: error.message
    });
  }
});

// Add a new book
app.post('/books', async (req, res) => {
  const { title, author, description, imageUrl } = req.body;

  if (!title || !author) {
    return res.json({
      status: 1,
      message: 'Hmm, looks like you missed something. Please provide both a title and an author.'
    });
  }

  try {
    const newBook = await Book.create({
      title,
      author,
      description: description || '',
      imageUrl: imageUrl || ''
    });

    res.status(201).json({
      status: 0,
      book: newBook,
      message: 'New book added! ✨ Well done.'
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: 'Error adding book.',
      error: error.message
    });
  }
});

// Get a book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.json({
        status: 1,
        message: 'Uh oh, we couldn\'t find the book you were looking for.'
      });
    }

    res.json({
      status: 0,
      book,
      message: 'Here\'s the book you requested. Enjoy reading! 📖'
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: 'Error retrieving book.',
      error: error.message
    });
  }
});

// Update a book by ID
app.put('/books/:id', async (req, res) => {
  const { title, author, description, imageUrl } = req.body;

  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.json({
        status: 1,
        message: 'Hmm, the book doesn\'t seem to exist. Try again with a valid ID.'
      });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.imageUrl = imageUrl || book.imageUrl;

    await book.save();

    res.json({
      status: 0,
      book,
      message: 'Book updated successfully. ✅'
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: 'Error updating book.',
      error: error.message
    });
  }
});

// Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.json({
        status: 1,
        message: 'Oops, couldn\'t find the book to delete.'
      });
    }

    await book.destroy();

    res.json({
      status: 0,
      message: 'Book deleted successfully. 🗑️'
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: 'Error deleting book.',
      error: error.message
    });
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
