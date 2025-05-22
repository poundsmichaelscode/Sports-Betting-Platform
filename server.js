
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const betRoutes = require('./routes/betRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/bets', betRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB Connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running...");
  });
});
