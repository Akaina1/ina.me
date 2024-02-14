const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // Use the port specified by the environment or default to 3001

app.get('/', (req, res) => {
  res.send('Hello, this is your backend server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});