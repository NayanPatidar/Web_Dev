const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

require('dotenv').config();

const app = express();
const port = 5173;

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const scopes = 'user-read-private user-read-email';

app.get('/login', (req, res) => {
    redirectToAuthCodeFlow(res);
    console.log(clientId);
}); 

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
      scope: scopes,
      redirect_uri: redirectUri
    
    }));
  }
  