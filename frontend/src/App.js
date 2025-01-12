import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import buy from './buy.png';
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import News from "./components/News";
import {
  FaHome,
  FaNewspaper,
  FaChartLine,
  FaUser,
} from "react-icons/fa";
import "./App.css";


import "./App.css";
import Profile from "./components/Profile.js";


const App = () => {
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState(""); 


  

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.results[0].picture.large;
        const userEmail = data.results[0].email; 
        setProfilePic(imageUrl);
        setEmail(userEmail); 
      });
  }, []);

  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <div className="profile">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <div className="user">
              <div className="username">Username</div>
              <div className="email">random@gmail.com</div> 
            </div>
          </div>
          <nav className="menu">
            <Link to="/" className="menu-item">
              <FaHome className="icon" /> Home
            </Link>
            <Link to="/news" className="menu-item">
              <FaNewspaper className="icon" /> News
            </Link>
            <Link to="/recommend" className="menu-item">
              <FaChartLine className="icon" /> Recommend
            </Link>
            <Link to="/profile" className="menu-item">
              <FaUser className="icon" /> Profile
            </Link>
          </nav>
          <div className="sidebar-footer">
            Made with <span className="icon">❤️</span> and <span className="icon">☕</span> at Innoversité Hackathon by Team06
          </div>
        </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route
              path="/recommend"
              element={
              <div style={{ display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundColor: '#f0f4f8',
              fontFamily: 'Arial, sans-serif'}}>
              <div style={{fontSize: '50px',
  marginBottom: '20px',}}>🏃‍♂️</div>
              <div style={{ fontSize: '32px',
  fontWeight: 'bold',
  color: '#ff6347',
  textAlign: 'center',
  animation: 'blink 1.5s step-end infinite',}}>Coming Soon</div>
              </div>
            }
/>

            <Route path="/profile" element={<Profile profilePic={profilePic} email={email} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Dashboard = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [stockSentiment, setStockSentiment] = useState({});
  

  useEffect(() => {
    // Fetch stock details from the backend
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/portfolio/stocks");
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio data");
        }
        const data = await response.json();
        
        setPortfolioData(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolioData(); // Call the function when the component mounts
  }, []);
  const scrollLeft = () => {
    const container = document.querySelector('.portfolio-container');
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const calculateCategoryPercentage = () => {
    const categoryTotals = {};
    let totalInvestment = 0;
  
    portfolioData.forEach(stock => {
      const investment = stock.Stock_quantity * stock.Stock_bought_price;
      totalInvestment += investment;
      categoryTotals[stock.Stock_category] = (categoryTotals[stock.Stock_category] || 0) + investment;
    });
  
    const categoryPercentages = [];
    Object.keys(categoryTotals).forEach(category => {
      categoryPercentages.push({
        name: category,
        value: (categoryTotals[category] / totalInvestment) * 100
      });
    });
  
    return categoryPercentages;
  };
  const renderCustomLabel = ({ name, value }) => {
    return `${name}: ${(value).toFixed(2)}%`; // Round to 2 decimal places and add '%'
  };
  const calculateStockInvestment = (portfolioData) => {
    const investments = [];
  
    portfolioData.forEach(stock => {
      investments.push({
        name: stock.Stock_name,
        investment: stock.Stock_quantity * stock.Stock_bought_price
      });
    });
  
    return investments;
  };
  const fetchSentiments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/portfolio/sentiment");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Parse the sentiment data into a usable format
      let parsedSentiments = {};
      data.forEach((item) => {
        if (typeof item === "string") {
          const lines = item.split("\r\n"); // Split the string into lines
          lines.forEach((line) => {
            const match = line.match(/Stock: (\w+), Recommendation: (\w+)/); // Match stock and recommendation
            if (match) {
              const [_, stock, recommendation] = match;
              parsedSentiments[stock] = recommendation;
              // Add to parsedSentiments
            }
          });
        }
      });
      setStockSentiment(parsedSentiments); // Set the parsed sentiments in state
    } catch (err) {
      console.error("Error fetching sentiment data:", err);
    }
  };

  useEffect(() => {
    fetchSentiments();
  }, []);

  const calculatePortfolioSummary = (portfolioData) => {
    let totalInvestment = 0;
    let totalGainLoss = 0;
    
  
    portfolioData.forEach(stock => {
      const investment = stock.Stock_quantity * stock.Stock_bought_price;
      totalInvestment += investment;
      const gainLoss = (stock.Stock_current_price - stock.Stock_bought_price) * stock.Stock_quantity;
      totalGainLoss += gainLoss;
    });
  
    return {
      totalInvestment: totalInvestment.toFixed(2),
      totalGainLoss: totalGainLoss.toFixed(2),
      totalStocks: portfolioData.length
    };
  };
  const { totalInvestment, totalGainLoss, totalStocks } = calculatePortfolioSummary(portfolioData);
 
  

  const scrollRight = () => {
    const container = document.querySelector('.portfolio-container');
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };
  const categoryPercentages = calculateCategoryPercentage(portfolioData);
  const stockInvestments = calculateStockInvestment(portfolioData);
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const stockRecommendations = {
  "Apple Inc": "Buy",
  "StockB": "Sell",
  "StockC": "Hold", // You can add more stocks with respective recommendations
};
  

 

  return (
    <div className="dashboard">
      <div className="portfolio-header">
        <h2 style={{marginBottom:"-20px",marginLeft:"20px"}}>Hey User</h2>
        <div className="portfolio-options">
          <button className="scroll-btn left" onClick={scrollLeft}>
            &lt;
          </button>

          <div className="portfolio-container">
            {portfolioData.map((item, index) =>  (
              
             <div className="portfolio-item" key={index}>
             <div className="stock-info">
               <div className="name"><t>{item.Stock_name}</t></div>
              
               <div className="decision">
               <span
            className={`recommendation ${stockRecommendations[item.Stock_name] === "Buy" ? "buy" : stockRecommendations[item.Stock_name] === "Sell" ? "sell" : "hold"}`}
          >
            <t style={{ color: "white" }}>
              {stockRecommendations[item.Stock_name]}
            </t>
                   
                 </span>
               </div>
           
               <p><strong>Category:</strong> <span>{item.Stock_category}</span></p>
               <p><strong>Quantity:</strong> <span>{item.Stock_quantity}</span></p>
               <p><strong>Bought Price:</strong> <span>${item.Stock_bought_price}</span></p>
               <p><strong>Current Price:</strong> <span>${item.Stock_current_price}</span></p>
               <p>
                 <strong>{item.Stock_current_price > item.Stock_bought_price ? "Gain" : "Loss"}:</strong>
                 <span>
                   {(
                     ((item.Stock_current_price - item.Stock_bought_price) /
                       item.Stock_bought_price) *
                     100
                   ).toFixed(2)}
                   %
                 </span>
               </p>
             </div>
           
           

                <div className="">
                  <label></label>
                </div>
              </div>
            ))}
          </div>

          <button className="scroll-btn right" onClick={scrollRight}>
            &gt;
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
  
      <div style={{ width: '33%', height: '200px', overflowX: 'hidden' }}>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={stockInvestments}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="name" 
        hide={true}  // Hide the X-axis labels
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="investment" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
</div>



<div style={{ width: '33%' }}>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={categoryPercentages}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="35%"
        outerRadius={50}
        fill="#8884d8"
        label={renderCustomLabel} // Keeping the label
      >
        {categoryPercentages.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={getRandomColor()} // Assign a random color
          />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
</div>


  <div style={{ width:'33%',marginTop:'-10px' }}>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Summary Field</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px' }}><strong>Total Investment</strong></td>
            <td style={{ padding: '10px' }}>${totalInvestment}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px' }}><strong>Total Gain/Loss</strong></td>
            <td style={{ padding: '10px', color: totalGainLoss >= 0 ? 'green' : 'red' }}>${totalGainLoss}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px' }}><strong>Total Stocks</strong></td>
            <td style={{ padding: '10px' }}>{totalStocks}</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>

      

       
    </div>
  );
};

export default App;