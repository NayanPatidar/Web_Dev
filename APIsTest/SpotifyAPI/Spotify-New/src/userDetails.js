const fetch = require('node-fetch');
require('dotenv').config();

let accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

fetch('https://api.spotify.com/v1/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => response.json())
  .then(data => {
    console.log('User Details:', data);
  })
  .catch(error => console.error('Error:', error));
