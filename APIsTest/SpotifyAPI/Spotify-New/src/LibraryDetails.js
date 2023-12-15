const fetch = require('node-fetch');
const axios = require('axios')
const fs = require('fs')
require('dotenv').config();

const accessToken = process.env.SPOTIFY_LIBRARY_DETAILS;
console.log(accessToken);

async function getAllLikedSongs(){
    const likedSongsUrl = 'https://api.spotify.com/v1/me/tracks';
    const limit = 50; // Adjust the limit as needed
    let offset = 0;
    let allLikedSongs = [];

    while (true) {
        const config = {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          params: {
            limit: limit,
            offset: offset,
          },
        };
    
        try {
          const response = await axios.get(likedSongsUrl, config);
          const likedSongsPage = response.data.items;
    
          if (likedSongsPage.length === 0) {
            // No more items, break the loop
            break;
          }
    
          allLikedSongs = allLikedSongs.concat(likedSongsPage);
    
          // Increment the offset for the next page
          offset += limit;
        } catch (error) {
          console.error('Error fetching Liked Songs:', error.message);
          throw error;
        }
    }
    console.log("All Liked Songs:", allLikedSongs);
    const stringifiedArray = allLikedSongs.map(song => JSON.stringify(song.track.name) + '\n').join('');
    const filePath = 'LikedSongs.txt';

    fs.appendFile(filePath, stringifiedArray, (err) => {
        if (err) {
          console.error('Error appending array to the file:', err);
        } else {
          console.log('Array appended to the file successfully!');
        }
      });
}

getAllLikedSongs();