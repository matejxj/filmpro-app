const WantToWatchDao = require("../../dao/wantToWatch-dao");

async function getWantToWatch(req, res) {
  try {
    const id = req.query.id;
    const movie = await WantToWatchDao.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = getWantToWatch;
