const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const movieDao = require("../../dao/movie-dao.js");

const schema = {
  type: "object",
  properties: {
    date: { type: "string", format: "date-time" },
    name: { type: "string", minLength: 3 },
    desc: { type: "string" },
    director: { type: "string" },
    year: { type: "number" },
    genre: { type: "string" },
    rating: { type: "number" }
  },
  required: ["date", "name"],
  additionalProperties: false,
};


async function CreateAbl(req, res) {
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

    movie = movieDao.create(movie);
    res.json(movie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
