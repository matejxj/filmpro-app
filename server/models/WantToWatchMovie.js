const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wantToWatchMovieSchema = new Schema({
  movieId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  genres: { type: [String], required: true },
  rating: { type: Number, required: true },
  poster: { type: String, required: true }
}, {
  timestamps: true,
});

const WantToWatchMovie = mongoose.model('WantToWatchMovie', wantToWatchMovieSchema);

module.exports = WantToWatchMovie;
