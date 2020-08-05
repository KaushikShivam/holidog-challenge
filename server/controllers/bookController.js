const Book = require('../models/bookModel');
const handleAsync = require('../utils/handleAsync');
const CustomError = require('../utils/CustomError');

exports.setAuthorID = (req, res, next) => {
  if (req.params.authorId) req.body.author = req.params.authorId;
  next();
};

exports.getAllBooks = handleAsync(async (req, res, next) => {
  const queryBody = { creator: req.user._id };
  if (req.body.author) queryBody.author = req.body.author;

  const books = await Book.find(queryBody);

  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
});

exports.createBook = handleAsync(async (req, res, next) => {
  const book = await Book.create({ ...req.body, creator: req.user._id });

  res.status(201).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.getBook = handleAsync(async (req, res, next) => {
  const book = await Book.findOne({
    _id: req.params.id,
    creator: req.user._id,
  });

  if (!book) {
    return next(new CustomError('No book found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.updateBook = handleAsync(async (req, res, next) => {
  const book = await Book.findOneAndUpdate(
    { _id: req.params.id, creator: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!book) {
    return next(new CustomError('No book found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

exports.deleteBook = handleAsync(async (req, res, next) => {
  const book = await Book.findOneAndRemove({
    _id: req.params.id,
    creator: req.user._id,
  });

  if (!book) {
    return next(new CustomError('No book found with this ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
