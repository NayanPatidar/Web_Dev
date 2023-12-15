const fetch = require('node-fetch');
require('dotenv').config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

async function refreshAccessToken() {
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authHeader}`,
    },
    body: new URLSearchParams(data),
  });

  const tokenData = await response.json();
  const newAccessToken = tokenData.access_token;
  console.log('Token Data:', tokenData);
  return newAccessToken;
}

// Example usage
refreshAccessToken()
  .then(newAccessToken => {
    // Use the new access token for your API requests
    console.log('Use the new access token:', newAccessToken);
  })
  .catch(error => {
    console.error('Error refreshing access token:', error.message);
  });
