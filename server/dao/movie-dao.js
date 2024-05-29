const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const movieFolderPath = path.join(__dirname, "storage", "movieList");

function get(movieId) {
  try {
    const filePath = path.join(movieFolderPath, `${movieId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadMovie", message: error.message };
  }
}

function create(movie) {
  try {
    movie.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(movieFolderPath, `${movie.id}.json`);
    const fileData = JSON.stringify(movie);
    fs.writeFileSync(filePath, fileData, "utf8");
    return movie;
  } catch (error) {
    throw { code: "failedToCreateMovie", message: error.message };
  }
}

function update(movie) {
  try {
    const currentMovie = get(movie.id);
    if (!currentMovie) return null;
    const newMovie = { ...currentMovie, ...movie };
    const filePath = path.join(movieFolderPath, `${movie.id}.json`);
    const fileData = JSON.stringify(newMovie);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newMovie;
  } catch (error) {
    throw { code: "failedToUpdateMovie", message: error.message };
  }
}

function remove(movieId) {
  try {
    const filePath = path.join(movieFolderPath, `${movieId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveMovie", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(movieFolderPath);
    const movieList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(movieFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    movieList.sort((a, b) => new Date(a.date) - new Date(b.date));
    return movieList;
  } catch (error) {
    throw { code: "failedToListMovies", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
