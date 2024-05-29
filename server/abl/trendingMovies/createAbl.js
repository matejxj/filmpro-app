const Ajv = require("ajv");
const ajv = new Ajv();

const trendingMoviesDao = require("../../dao/trendingMovies-dao.js");

const schema = {
  type: "object",
  properties: {
    movieId: { type: "string", minLength: 32, maxLength: 32 },
    title: { type: "string", minLength: 1 }
  },
  required: ["movieId", "title"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    const dtoIn = req.body;

    const valid = ajv.validate(schema, dtoIn);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const movie = trendingMoviesDao.add(dtoIn);
    res.json(movie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
