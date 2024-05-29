const watchedMoviesDao = require("../../dao/watchedMovies-dao");

async function GetAbl(req, res) {
  try {
    const { userId, movieId } = req.query;
    const movie = await watchedMoviesDao.get(userId, movieId);
    if (movie) {
      console.log("Movie found:", movie);
      res.json(movie);
    } else {
      console.log("Movie not found"); 
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie:", error); 
    res.status(500).json({ error: error.message });
  }
}

module.exports = GetAbl;
