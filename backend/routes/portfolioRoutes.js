const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController.js'); // Import the controller
const {getAllSentiment} = require('../controllers/sentimentController.js'); // Import the controller
 // Import the controller

// Define the route to get all stocks
router.get('/stocks', portfolioController.getStocks);
router.get('/sentiment', getAllSentiment);

// router.post('/register', userController.registerUsers);
// router.post('/login', userController.loginUsers);
module.exports = router;