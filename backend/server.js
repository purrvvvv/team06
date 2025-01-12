const express = require('express');
const app = express();
const portfolioRoutes = require('./routes/portfolioRoutes');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend URL
  methods: 'GET',
  allowedHeaders: 'Content-Type',
}));


// API Routes
app.use('/api/portfolio', portfolioRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
