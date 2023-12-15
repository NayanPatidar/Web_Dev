const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

require('dotenv').config();

const app = express();
const port = 5173;

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const scopesUserDetails = 'user-read-private user-read-email';
const scopesRecentlyPlayed = 'user-read-recently-played';

app.get('/login', (req, res) => {
    redirectToAuthCodeFlow(res);
    console.log(clientId);
}); 

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    try {
        const tokenResponse = await exchangeCodeForToken(code);
        console.log(tokenResponse);
        res.send('Authentication successful!');
    } catch (error) {
        console.error('Token exchange error:', error.message);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Handle errors
app.on('error', (err) => {
  console.error(`Express server error: ${err.message}`);
});

function redirectToAuthCodeFlow(res) {  
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scopesRecentlyPlayed,
      redirect_uri: redirectUri
    }));
  }
  
  async function exchangeCodeForToken(code) {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
    };

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authHeader}`,
        },
    };

    const response = await axios.post(tokenUrl, querystring.stringify(data), config);
    return response.data;
}