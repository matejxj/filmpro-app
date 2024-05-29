const movieDao = require("../../dao/movie-dao.js");
const attendanceDao = require("../../dao/wantToWatch-dao.js");

async function ListAbl(req, res) {
  try {
    const movieList = movieDao.list();

    const attendanceMap = attendanceDao.movieMap();

    movieList.forEach((movie) => {
      movie.userMap = attendanceMap[movie.id] || {};
    });

    res.json(movieList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
