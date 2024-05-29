const WantToWatchDao = require("../../dao/wantToWatch-dao");

async function deleteWantToWatch(req, res) {
  try {
    const id = req.body.id;
    const deletedMovie = await WantToWatchDao.delete(id);
    res.status(200).json(deletedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = deleteWantToWatch;
