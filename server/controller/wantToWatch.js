const express = require('express');
const router = express.Router();
const create = require('../abl/wantToWatch/createAbl');
const del = require('../abl/wantToWatch/deleteAbl');
const get = require('../abl/wantToWatch/getAbl');
const list = require('../abl/wantToWatch/listAbl');
const update = require('../abl/wantToWatch/updateAbl');

router.post('/create', (req, res) => {
  create(req, res);
});

router.delete('/delete', (req, res) => {
  del(req, res);
});

router.get('/get', (req, res) => {
  get(req, res);
});

router.get('/list', (req, res) => {
  list(req, res);
});

router.put('/update', (req, res) => {
  update(req, res);
});

module.exports = router;
