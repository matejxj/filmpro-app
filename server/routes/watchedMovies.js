const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const watchedMoviesPath = path.join(__dirname, '../public/watchedMovies.json');

router.get('/list', (req, res) => {
  fs.readFile(watchedMoviesPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading watched movies file');
    }
    res.json(JSON.parse(data));
  });
});

router.post('/add', (req, res) => {
  const newMovie = req.body;
  fs.readFile(watchedMoviesPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading watched movies file');
    }
    const movies = JSON.parse(data);
    movies.push(newMovie);
    fs.writeFile(watchedMoviesPath, JSON.stringify(movies, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing to watched movies file');
      }
      res.status(201).send('Movie added');
    });
  });
});

module.exports = router;
