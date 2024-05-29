const Ajv = require("ajv");
const ajv = new Ajv();

const movieDao = require("../../dao/movie-dao.js");
const attendanceDao = require("../../dao/wantToWatch-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    const reqParams = req.body;

    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const attendanceMap = attendanceDao.movieMap();
    if (attendanceMap[reqParams.id]) {
      res.status(400).json({
        code: "movieHasAttendances",
        message: `Movie ${reqParams.id} has attendances`,
      });
      return;
    }

    movieDao.remove(reqParams.id);
    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
