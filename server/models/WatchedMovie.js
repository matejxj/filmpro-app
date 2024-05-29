const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const watchedMovieSchema = new Schema({
    movieId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    genre: { type: String },
    rating: { type: Number }
}, {
    timestamps: true,
});

const WatchedMovie = mongoose.model('WatchedMovie', watchedMovieSchema);

module.exports = WatchedMovie;
