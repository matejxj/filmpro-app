const watchedMoviesDao = require("../../dao/watchedMovies-dao");

async function CreateAbl(req, res) {
  try {
    const { userId, movieId, title, posterUrl, description, genre, rating } = req.body;
    const newMovie = await watchedMoviesDao.create({ userId, movieId, title, posterUrl, description, genre, rating });
    res.json(newMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = CreateAbl;
