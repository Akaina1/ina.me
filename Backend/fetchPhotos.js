// backend/fetchPhotos.js
const { google } = require('googleapis');
const axios = require('axios');
const fs = require('fs');
const readline = require('readline');  // Use the built-in readline module

// Load your OAuth client ID and secret
const credentials = {
  installed: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: ['http://localhost:5000/auth/callback', 'https://ina-me-backend.fly.dev/auth/callback'],
  },
};

// Set up OAuth client
const { client_id, client_secret, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Load previously stored token or get a new one
const TOKEN_PATH = 'token.json';

async function authorize() {
  try {
    // Check if we have a token stored
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
  } catch (err) {
    // If no token, get a new one
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/photoslibrary.readonly'],
    });

    async function getAuthorizationCode(authUrl) {
        // During development, prompt the user to visit the authorization URL and enter the code manually
        console.log('Please visit the following URL to authorize the app:', authUrl);
      
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
      
        // Return a promise to handle the asynchronous readline input
        return new Promise((resolve) => {
          rl.question('Enter the authorization code: ', (authCode) => {
            rl.close();
            resolve(authCode);
          });
        });
      }

    // Get the authorization code from the user (manually or through some other method)
    const authCode = process.env.NODE_ENV === 'development' ? await getAuthorizationCode(authUrl) : 'YOUR_AUTHORIZATION_CODE';

    // Get the access token
    const tokenResponse = await oAuth2Client.getToken(authCode);
    oAuth2Client.setCredentials(tokenResponse.tokens);

    // Save the token for future use
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenResponse.tokens));
  }

  return oAuth2Client;
}

async function fetchPhotos(auth) {
    // Use the Google Photos API to fetch photos
    const response = await axios.get('https://photoslibrary.googleapis.com/v1/mediaItems', {
      headers: {
        Authorization: `Bearer ${auth.credentials.access_token}`,
      },
    });
  
    // Handle the response and extract photo data
    const photos = response.data.mediaItems;
    return photos;
  }
  
  // New function to handle HTTP requests
  async function handleFetchPhotos(req, res) {
    try {
      const auth = await authorize();
      const photos = await fetchPhotos(auth);
      res.status(200).json(photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = { authorize, fetchPhotos, handleFetchPhotos };