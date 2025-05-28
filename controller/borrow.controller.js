const { BorrowedBook, Book, User } = require('../models');
const { borrowSchema, returnSchema } = require('../validators/borrow.validation');

// ✅ Member borrows a book
exports.borrowBook = async (req, res) => {
  try {
    const { error } = borrowSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { bookId } = req.body;
    const book = await Book.findByPk(bookId);

    if (!book || book.quantity < 1)
      return res.status(400).json({ error: 'Book not available' });

    // Create borrow record
    await BorrowedBook.create({
      bookId,
      userId: req.user.id,
      borrowDate: new Date(),
      returnDate: null
    });

    // Reduce book quantity
    book.quantity -= 1;
    await book.save();

    res.status(201).json({ message: 'Book borrowed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Borrow failed', details: err.message });
  }
};

// ✅ Member returns a book
exports.returnBook = async (req, res) => {
  try {
    const { error } = returnSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { bookId } = req.body;
    const record = await BorrowedBook.findOne({
      where: { userId: req.user.id, bookId, returnDate: null }
    });

    if (!record)
      return res.status(404).json({ error: 'No active borrow record found' });

    record.returnDate = new Date();
    await record.save();

    // Increase book quantity
    const book = await Book.findByPk(bookId);
    book.quantity += 1;
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Return failed', details: err.message });
  }
};

// ✅ Librarian views all borrow history
exports.viewBorrowHistory = async (req, res) => {
  try {
    const history = await BorrowedBook.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Book, attributes: ['id', 'title', 'author'] }
      ]
    });

    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load borrow history', details: err.message });
  }
};
