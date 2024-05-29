const fs = require('fs');
const path = require('path');

let movies = [];

fs.readFile(path.join(__dirname, '../public/movies.json'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  movies = JSON.parse(data);
});

class WantToWatchDao {
  list() {
    return movies;
  }

  get(id) {
    return movies.find(movie => movie.movieId === id);
  }

  create(movie) {
    movies.push(movie);
    return movie;
  }

  delete(id) {
    const index = movies.findIndex(movie => movie.movieId === id);
    if (index > -1) {
      movies.splice(index, 1);
      return true;
    }
    return false;
  }

  update(id, updatedMovie) {
    const index = movies.findIndex(movie => movie.movieId === id);
    if (index > -1) {
      movies[index] = { ...movies[index], ...updatedMovie };
      return movies[index];
    }
    return null;
  }
}

module.exports = new WantToWatchDao();
