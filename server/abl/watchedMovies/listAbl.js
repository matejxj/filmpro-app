const watchedMoviesDao = require("../../dao/watchedMovies-dao");

async function ListAbl(req, res) {
  try {
    const { userId } = req.query;
    const movies = await watchedMoviesDao.list(userId);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = ListAbl;
