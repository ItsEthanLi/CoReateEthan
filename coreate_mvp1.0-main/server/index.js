const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');


require('dotenv').config()


const userRoute = require('./routes/userRoute');

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/user', userRoute);


// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Connect to MongoDB and start server
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
