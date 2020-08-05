const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Book must have a name'],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, 'A Book must have an isbn'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'Author',
      required: [true, 'Book must belong to an Author'],
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Book must belong to a creator'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.virtual('bookCount').get(function () {
  return this.books.length;
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
