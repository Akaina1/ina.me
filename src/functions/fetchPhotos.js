const { google } = require('googleapis');
const axios = require('axios');
const fs = require('fs');

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

    console.log('Authorize this app by visiting this URL:', authUrl);

    // Get the authorization code from the user
    const authCode = process.env.NODE_ENV === 'development' ? await getAuthorizationCode(authUrl) : 'YOUR_AUTHORIZATION_CODE';

    // Get the access token
    const tokenResponse = await oAuth2Client.getToken(authCode);
    oAuth2Client.setCredentials(tokenResponse.tokens);

    // Save the token for future use
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenResponse.tokens));
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

module.exports = fetchPhotos;