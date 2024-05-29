const WatchedMovie = require('../models/WatchedMovie');

class WatchedMoviesDao {
  async create(dtoIn) {
    console.log("Creating movie:", dtoIn); 
    const movie = new WatchedMovie(dtoIn);
    await movie.save();
    return movie;
  }

  async list(userId) {
    console.log("Listing movies for user:", userId);
    return await WatchedMovie.find({ userId });
  }

  async delete(userId, movieId) {
    console.log("Deleting movie:", movieId, "for user:", userId);
    return await WatchedMovie.findOneAndDelete({ userId, movieId });
  }

  async get(userId, movieId) {
    console.log("Getting movie:", movieId, "for user:", userId);
    return await WatchedMovie.findOne({ userId, movieId });
  }
}

module.exports = new WatchedMoviesDao();
