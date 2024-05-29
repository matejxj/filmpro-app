const axios = require('axios');

const movies = [
  {
    userId: "12345678901234567890123456789012",
    movieId: "abcdefghijabcdefghijabcdefghij12" 
  },
  {
    userId: "12345678901234567890123456789012",
    movieId: "abcdefghijabcdefghijabcdefghij34" 
  },
  {
    userId: "12345678901234567890123456789012",
    movieId: "abcdefghijabcdefghijabcdefghij56" 
  }
  
];


const addMovie = async (movie) => {
  try {
    const response = await axios.post('http://localhost:8001/wantToWatch/create', movie);
    console.log('Added:', response.data);
  } catch (error) {
    console.error('Error adding movie:', error.response ? error.response.data : error.message);
  }
};

const addMovies = async () => {
  for (const movie of movies) {
    await addMovie(movie);
  }
};

addMovies();
