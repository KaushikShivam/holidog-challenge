const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Author must have a first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Author must have a last name'],
      trim: true,
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Author must belong to a User'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
