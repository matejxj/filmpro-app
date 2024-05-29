const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: String,
  genre: String,
  rating: Number,
  posterUrl: String
});

module.exports = mongoose.model('Movie', movieSchema);
