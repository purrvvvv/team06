

const db = require('../config/db'); // Import the db connection

// Fetch all stocks from the database
const getStocks = (req, res) => {
    db.fetchAllRecords((err, rows) => {
        if (err) {
            console.error('Error fetching stocks:', err);
            return res.status(500).json({ message: 'Error fetching stocks', error: err.message });
        }
        res.json(rows); // Send the stock data as a JSON response
    });
};

module.exports = {
    getStocks,
};
