const mongoose = require('mongoose');
const connectDB = require('./server/config/db');
const WantToWatchDao = require('./server/dao/wantToWatch-dao');

// Připojení k databázi
connectDB();

// Testovací funkce
const testDelete = async () => {
  try {
    const userId = 'user1';
    const movieId = 'movie123';

    // Vymazání filmu z databáze
    const result = await WantToWatchDao.delete({ userId, movieId });
    console.log('Delete result:', result);

    // Zavření připojení k databázi
    mongoose.connection.close();
  } catch (error) {
    console.error('Error deleting movie:', error);
    mongoose.connection.close();
  }
};

// Spuštění testovací funkce
testDelete();
