const { Book } = require('../models');
const { bookSchema } = require('../validators/book.validation');

// Create a book (Admin only)
exports.createBook = async (req, res) => {
  try {
    const { error } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const book = await Book.create(req.body);
    return res.status(201).json({ message: 'Book created', book });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create book', details: err.message });
  }
};

// Get all books (any logged-in user)
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch books', details: err.message });
  }
};

// Update a book (Admin only)
exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    await book.update(req.body);
    return res.status(200).json({ message: 'Book updated', book });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update book', details: err.message });
  }
};

//  Delete a book (Admin only)
exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    await book.destroy();
    return res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete book', details: err.message });
  }
};
