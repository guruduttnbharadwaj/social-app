require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts'); // <--- NEW IMPORT

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // <--- NEW ROUTE

// Basic Route
app.get('/', (req, res) => {
  res.send("Backend is working!");
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected!"))
  .catch(err => console.log(" DB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});