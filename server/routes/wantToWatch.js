const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const moviesFilePath = path.join(__dirname, '../../public/movies.json');

router.get('/list', (req, res) => {
  fs.readFile(moviesFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading movies file');
      return;
    }
    const movies = JSON.parse(data);
    res.json(movies);
  });
});

router.post('/create', (req, res) => {
  const newMovie = req.body;

  fs.readFile(moviesFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading movies file');
      return;
    }
    const movies = JSON.parse(data);
    movies.push(newMovie);

    fs.writeFile(moviesFilePath, JSON.stringify(movies, null, 2), 'utf8', (err) => {
      if (err) {
        res.status(500).send('Error writing to movies file');
        return;
      }
      res.status(201).send('Movie added successfully');
    });
  });
});

module.exports = router;
