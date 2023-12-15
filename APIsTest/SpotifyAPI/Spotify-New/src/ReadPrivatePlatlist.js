const fetch = require('node-fetch');
require('dotenv').config();

const accessToken = process.env.SPOTIFY_ACCESS_TOKEN_PLAYLIST;

fetch('https://api.spotify.com/v1/me/playlists', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => response.json())
  .then(data => {
    console.log('Playlists', data.items);
  })
  .catch(error => console.error('Error:', error));
