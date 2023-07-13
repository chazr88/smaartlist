const express = require('express');
const listRoutes = require('./routes/lists');

const app = express();

// Set up routes
app.use(listRoutes);

// Other routes...

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});