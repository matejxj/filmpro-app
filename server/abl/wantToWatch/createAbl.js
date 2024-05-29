const WantToWatchDao = require('../../dao/wantToWatch-dao');

async function createAbl(req, res) {
  try {
    let movie = req.body;
    if (!movie.genres || !movie.rating) {
      return res.status(400).json({ error: 'Genres and rating are required.' });
    }
    let createdMovie = await WantToWatchDao.create(movie);
    res.json(createdMovie);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = createAbl;
