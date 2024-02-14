const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Set up AWS credentials
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

// Create an S3 instance
const s3 = new AWS.S3();

// Enable CORS
app.use(cors());

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// All Photos Retrieval
app.get('/photos', (req, res) => {
  // List objects in the S3 bucket
  s3.listObjects({ Bucket: process.env.S3_BUCKET_NAME }, (err, data) => {
    if (err) throw err;

    // Send the list of photo filenames as a response
    res.status(200).json({ photos: data.Contents.map(obj => obj.Key) });
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// New endpoint to fetch an individual photo
app.get('/photos/:filename', (req, res) => {
  // Ensure the S3 bucket name is set
  if (!process.env.S3_BUCKET_NAME) {
    return res.status(500).json({ error: 'S3_BUCKET_NAME is not set in the environment variables.' });
  }

  const filename = req.params.filename;

  // Specify the folder (prefix) in the S3 bucket
  const folder = 'life makeover';
  const key = `${folder}/${filename}`;

  // Get the image data from S3
  s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: key }, (err, data) => {
    if (err) {
      console.error(`Error fetching photo ${filename} from S3:`, err);
      return res.status(500).json({ error: `Error fetching photo ${filename} from S3.` });
    }

    // Send the image data as the response
    res.writeHead(200, { 'Content-Type': data.ContentType });
    res.end(data.Body);
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////