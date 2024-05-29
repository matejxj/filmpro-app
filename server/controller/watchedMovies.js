const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/watchedMovies/getAbl");
const ListAbl = require("../abl/watchedMovies/listAbl");
const CreateAbl = require("../abl/watchedMovies/createAbl");
const DeleteAbl = require("../abl/watchedMovies/deleteAbl");

console.log("watchedMovies controller loaded");

router.get("/get", (req, res) => {
  console.log("GET /get endpoint hit");
  GetAbl(req, res);
});
router.get("/list", (req, res) => {
  console.log("GET /list endpoint hit");
  ListAbl(req, res);
});
router.post("/create", (req, res) => {
  console.log("POST /create endpoint hit");
  console.log("Request body:", req.body);
  CreateAbl(req, res);
});
router.post("/delete", (req, res) => {
  console.log("POST /delete endpoint hit");
  console.log("Request body:", req.body);
  DeleteAbl(req, res);
});

module.exports = router;