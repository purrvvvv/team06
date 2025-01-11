const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());


const stockData = [
    {
      stock_name: 'Microsoft Corp.',
      stock_category: 'Tech.',
      stock_quantity: 75,
      stock_bought_price: 280,
      stock_current_price: 310,
      recommendation: 'Sell'
    },
    {
      stock_name: 'NVIDIA Corp.',
      stock_category: 'Tech.',
      stock_quantity: 60,
      stock_bought_price: 200,
      stock_current_price: 250,
      recommendation: 'Buy'
    },
    {
      stock_name: 'Amazon.com Inc.',
      stock_category: 'Consumer',
      stock_quantity: 40,
      stock_bought_price: 3200,
      stock_current_price: 3500,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Meta Platforms Inc.',
      stock_category: 'Communication',
      stock_quantity: 30,
      stock_bought_price: 160,
      stock_current_price: 290,
      recommendation: 'Buy'
    },
    {
      stock_name: 'Coca-Cola Co.',
      stock_category: 'Consumer',
      stock_quantity: 120,
      stock_bought_price: 50,
      stock_current_price: 58,
      recommendation: 'Sell'
    },
    {
      stock_name: 'PepsiCo Inc.',
      stock_category: 'Consumer',
      stock_quantity: 110,
      stock_bought_price: 140,
      stock_current_price: 155,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Tesla Inc.',
      stock_category: 'Consumer',
      stock_quantity: 90,
      stock_bought_price: 250,
      stock_current_price: 380,
      recommendation: 'Buy'
    },
    {
      stock_name: 'Procter & Gamble Co.',
      stock_category: 'Consumer',
      stock_quantity: 85,
      stock_bought_price: 135,
      stock_current_price: 145,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Exxon Mobil Corp.',
      stock_category: 'Energy',
      stock_quantity: 70,
      stock_bought_price: 90,
      stock_current_price: 120,
      recommendation: 'Buy'
    },
    {
      stock_name: 'Johnson & Johnson',
      stock_category: 'Healthcare',
      stock_quantity: 65,
      stock_bought_price: 160,
      stock_current_price: 172,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Apple Inc.',
      stock_category: 'Tech.',
      stock_quantity: 200,
      stock_bought_price: 150,
      stock_current_price: 190,
      recommendation: 'Buy'
    },
    {
      stock_name: 'Alphabet Inc.',
      stock_category: 'Tech.',
      stock_quantity: 180,
      stock_bought_price: 1200,
      stock_current_price: 1300,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Walmart Inc.',
      stock_category: 'Consumer',
      stock_quantity: 100,
      stock_bought_price: 145,
      stock_current_price: 150,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Chevron Corp.',
      stock_category: 'Energy',
      stock_quantity: 60,
      stock_bought_price: 120,
      stock_current_price: 140,
      recommendation: 'Buy'
    },
    {
      stock_name: 'Bristol-Myers Squibb',
      stock_category: 'Healthcare',
      stock_quantity: 80,
      stock_bought_price: 65,
      stock_current_price: 70,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Pfizer Inc.',
      stock_category: 'Healthcare',
      stock_quantity: 150,
      stock_bought_price: 35,
      stock_current_price: 40,
      recommendation: 'Buy'
    },
    {
      stock_name: 'Disney Inc.',
      stock_category: 'Services',
      stock_quantity: 130,
      stock_bought_price: 120,
      stock_current_price: 130,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Nike Inc.',
      stock_category: 'Discretionary',
      stock_quantity: 90,
      stock_bought_price: 95,
      stock_current_price: 110,
      recommendation: 'Buy'
    },
    {
      stock_name: 'General Electric Co.',
      stock_category: 'Industrial',
      stock_quantity: 75,
      stock_bought_price: 90,
      stock_current_price: 95,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Intel Corp.',
      stock_category: 'Tech.',
      stock_quantity: 200,
      stock_bought_price: 55,
      stock_current_price: 60,
      recommendation: 'Buy'
    },
    {
      stock_name: 'Ford Motor Co.',
      stock_category: 'Discretionary',
      stock_quantity: 150,
      stock_bought_price: 12,
      stock_current_price: 15,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Boeing Co.',
      stock_category: 'Industrial',
      stock_quantity: 60,
      stock_bought_price: 210,
      stock_current_price: 230,
      recommendation: 'Buy'
    },
    {
      stock_name: 'Cisco Systems Inc.',
      stock_category: 'Tech.',
      stock_quantity: 140,
      stock_bought_price: 45,
      stock_current_price: 50,
      recommendation: 'Sell'
    },
    {
      stock_name: 'Home Depot Inc.',
      stock_category: 'Discretionary',
      stock_quantity: 50,
      stock_bought_price: 280,
      stock_current_price: 290,
      recommendation: 'Sell'
    },
    {
      stock_name: 'AbbVie Inc.',
      stock_category: 'Healthcare',
      stock_quantity: 120,
      stock_bought_price: 90,
      stock_current_price: 95,
      recommendation: 'Buy'
    }
  ];


app.get('/api/portfolio', (req, res) => {
  res.json(stockData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
