const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const wantToWatchRoutes = require('./routes/wantToWatch');
const watchedMoviesRoutes = require('./routes/watchedMovies');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.use('/wantToWatch', wantToWatchRoutes);
app.use('/watchedMovies', watchedMoviesRoutes);

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
