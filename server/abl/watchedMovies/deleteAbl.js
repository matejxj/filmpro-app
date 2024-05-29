const watchedMoviesDao = require("../../dao/watchedMovies-dao");

async function DeleteAbl(req, res) {
  try {
    const { userId, movieId } = req.body;
    const deletedMovie = watchedMoviesDao.delete(userId, movieId);
    if (deletedMovie) {
      res.json(deletedMovie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = DeleteAbl;
