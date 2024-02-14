const { google } = require('googleapis');
const axios = require('axios');

// Load your OAuth client ID and secret
const credentials = {
  installed: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: ['http://localhost:3000/auth/callback', 'https://ina-me.netlify.app/auth/callback'],
  },
};

// Set up OAuth client
const { client_id, client_secret, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const TOKEN_KEY = 'google_token'; // Key to store token in environment variables

async function authorize() {
  let token;

  // Check if we have a token stored
  if (process.env.NODE_ENV === 'development') {
    // In development, get the token from environment variables
    token = process.env[TOKEN_KEY];
  } else {
    // In production, get the token from the serverless environment
    // (e.g., Netlify environment variables)
    token = process.env[TOKEN_KEY];
  }

  if (!token) {
    // If no token, get a new one
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/photoslibrary.readonly'],
    });

    console.log('Authorize this app by visiting this URL:', authUrl);

    // Get the authorization code from the user
    const authCode = process.env.NODE_ENV === 'development' ? await getAuthorizationCode(authUrl) : 'YOUR_AUTHORIZATION_CODE';

    // Get the access token
    const tokenResponse = await oAuth2Client.getToken(authCode);
    oAuth2Client.setCredentials(tokenResponse.tokens);

    // Save the token for future use
    process.env[TOKEN_KEY] = JSON.stringify(tokenResponse.tokens);
  } else {
    // If token is already present, set it in oAuth2Client
    oAuth2Client.setCredentials(JSON.parse(token));
  }

  return oAuth2Client;
}

async function getAuthorizationCode(authUrl) {
  // In a real-world scenario, you would prompt the user to visit the authorization URL
  // and enter the code manually. For simplicity, you can hardcode a code during development.
  return 'YOUR_AUTHORIZATION_CODE';
}

async function initAndFetchPhotos() {
  const auth = await authorize();
  const photos = await fetchPhotos(auth);
  return photos;
}

module.exports = initAndFetchPhotos;

async function fetchPhotos(auth) {
  // Use the google photos API to fetch photos
  const response = await axios.get('https://photoslibrary.googleapis.com/v1/mediaItems', {
    headers: {
      Authorization: `Bearer ${auth.credentials.access_token}`,
    },
  });

  // Handle the response and extract photo data
  const photos = response.data.mediaItems;
  return photos;
}