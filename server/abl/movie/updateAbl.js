const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const movieDao = require("../../dao/movie-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    date: { type: "string", format: "date-time" },
    name: { type: "string", minLength: 3 },
    desc: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let movie = req.body;

    const valid = ajv.validate(schema, movie);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedMovie = movieDao.update(movie);
    if (!updatedMovie) {
      res.status(404).json({
        code: "movieNotFound",
        message: `Movie ${movie.id} not found`,
      });
      return;
    }

    res.json(updatedMovie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
