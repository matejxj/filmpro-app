const WantToWatchDao = require("../../dao/wantToWatch-dao");

async function listWantToWatch(req, res) {
  try {
    const userId = req.query.userId;
    const movies = await WantToWatchDao.find({ userId: userId });
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = listWantToWatch;
