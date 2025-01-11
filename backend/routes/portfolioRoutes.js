// stocksRoutes.js

const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController.js'); // Import the controller

// Define the route to get all stocks
router.get('/stocks', portfolioController.getStocks);

module.exports = router;
