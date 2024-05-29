const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/trendingMovies/listAbl");
const CreateAbl = require("../abl/trendingMovies/createAbl");

router.get("/list", ListAbl);
router.post("/create", CreateAbl);

module.exports = router;
