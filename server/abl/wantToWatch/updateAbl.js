const WantToWatchDao = require("../../dao/wantToWatch-dao");

async function updateWantToWatch(req, res) {
  try {
    const id = req.body.id;
    const wantToWatchMovie = req.body;
    const updatedMovie = await WantToWatchDao.update(id, wantToWatchMovie);
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = updateWantToWatch;
