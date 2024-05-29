const trendingMoviesDao = require("../../dao/trendingMovies-dao.js");

async function ListAbl(req, res) {
  try {
    const movies = trendingMoviesDao.list();
    res.json(movies);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
