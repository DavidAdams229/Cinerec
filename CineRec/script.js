// CineRec - Smart Movie Recommender

const form = document.getElementById('quiz-form');
const recommendation = document.getElementById('recommendation');
const movieCard = document.getElementById('movie-card');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const mood = document.getElementById('mood').value;
  const decade = document.getElementById('decade').value;

  const keyword = getKeyword(mood);
  const yearRange = getYearRange(decade);

  const response = await fetch(`https://www.omdbapi.com/?s=${keyword}&y=${yearRange}&apikey=82e7354c`);
  const data = await response.json();

  if (data.Search && data.Search.length > 0) {
    const movie = data.Search[Math.floor(Math.random() * data.Search.length)];
    movieCard.innerHTML = `
      <h3>${movie.Title} (${movie.Year})</h3>
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" width="150">
    `;
    recommendation.classList.remove('hidden');
  } else {
    movieCard.innerHTML = '<p>No movies found for that combination.</p>';
    recommendation.classList.remove('hidden');
  }
});

function getKeyword(mood) {
  switch (mood) {
    case 'light': return 'comedy';
    case 'serious': return 'drama';
    case 'action': return 'action';
    case 'classic': return 'classic';
    default: return 'movie';
  }
}

function getYearRange(decade) {
  switch (decade) {
    case '2020s': return '2023';
    case '2010s': return '2015';
    case '2000s': return '2005';
    case '1990s': return '1995';
    default: return '2020';
  }
}