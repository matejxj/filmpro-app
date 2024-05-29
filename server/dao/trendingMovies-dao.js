let trendingMovies = []; 

class TrendingMoviesDao {
  list() {
    return trendingMovies;
  }

  add(movie) {
    trendingMovies.push(movie);
    return movie;
  }
}

module.exports = new TrendingMoviesDao();
