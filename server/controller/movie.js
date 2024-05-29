const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie'); 

router.get('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findOne({ movieId: req.params.movieId });
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
