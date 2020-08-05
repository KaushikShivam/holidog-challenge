const Author = require('../models/authorModel');
const handleAsync = require('../utils/handleAsync');
const CustomError = require('../utils/CustomError');

exports.getAllAuthors = handleAsync(async (req, res, next) => {
  const authors = await Author.find({ creator: req.user._id });

  res.status(200).json({
    status: 'success',
    results: authors.length,
    data: {
      authors,
    },
  });
});

exports.createAuthor = handleAsync(async (req, res, next) => {
  const author = await Author.create({ ...req.body, artist: req.user._id });

  res.status(201).json({
    status: 'success',
    data: {
      author,
    },
  });
});

exports.getAuthor = handleAsync(async (req, res, next) => {
  const author = await Author.findOne({
    _id: req.params.id,
    creator: req.user._id,
  });

  if (!author) {
    return next(new CustomError('No author found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      author,
    },
  });
});

exports.updateAuthor = handleAsync(async (req, res, next) => {
  const author = await Author.findOneAndUpdate(
    { _id: req.params.id, creator: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!author) {
    return next(new CustomError('No author found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      author,
    },
  });
});

exports.deleteAuthor = handleAsync(async (req, res, next) => {
  const author = await Author.findOneAndRemove({
    _id: req.params.id,
    creator: req.user._id,
  });

  if (!author) {
    return next(new CustomError('No Atuhor found with this ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
