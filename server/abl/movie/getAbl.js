const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const movieDao = require("../../dao/movie-dao.js");
const attendanceDao = require("../../dao/wantToWatch-dao.js");
const messageDao = require("../../dao/message-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    const reqParams = req.query?.id ? req.query : req.body;

    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const movie = movieDao.get(reqParams.id);
    if (!movie) {
      res.status(404).json({
        code: "movieNotFound",
        message: `Movie ${reqParams.id} not found`,
      });
      return;
    }

    const attendanceMap = attendanceDao.movieMap();
    movie.userMap = attendanceMap[reqParams.id] || {};

    movie.messageList = messageDao.listByMovieId(movie.id);

    res.json(movie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
