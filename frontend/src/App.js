import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaHome,
  FaNewspaper,
  FaChartLine,
  FaUser,
} from "react-icons/fa";
import "./App.css";

const App = () => {
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState(""); 
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/portfolio');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

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
            <Route path="/" element={<Dashboard portfolioData={portfolioData} />} />
            <Route path="/news" element={<div>News Section</div>} />
            <Route path="/recommend" element={<div>Recommendations</div>} />
            <Route path="/profile" element={<Profile profilePic={profilePic} email={email} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Dashboard = ({ portfolioData }) => {
  const scrollLeft = () => {
    const container = document.querySelector('.portfolio-container');
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.querySelector('.portfolio-container');
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="dashboard">
      <div className="portfolio-header">
        <h2>Hey User</h2>
        <div className="portfolio-options">
          <button className="scroll-btn left" onClick={scrollLeft}>
            &lt;
          </button>

          <div className="portfolio-container">
            {portfolioData.map((item, index) => (
              <div className="portfolio-item" key={index}>
                <div className="stock-info">
  <div className="name"><t>{item.stock_name}</t></div>
  <p><strong>Category:</strong> <span>{item.stock_category}</span></p>
  <p><strong>Quantity:</strong> <span>{item.stock_quantity}</span></p>
  <p><strong>Bought Price:</strong> <span>${item.stock_bought_price}</span></p>
  <p><strong>Current Price:</strong> <span>${item.stock_current_price}</span></p>
  <p><strong>Recommendation:</strong> <span>{item.recommendation}</span></p>
</div>

                <div className="recommendation">
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

      <h3>Your Dashboard</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={portfolioData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <div className="portfolio-details">
        <div className="portfolio-list">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Apple</td>
                <td>$94</td>
                <td>Technology</td>
              </tr>
              <tr>
                <td>Google</td>
                <td>$357</td>
                <td>Technology</td>
              </tr>
              <tr>
                <td>Tesla</td>
                <td>$220</td>
                <td>Automotive</td>
              </tr>
              <tr>
                <td>Nvidia</td>
                <td>$220</td>
                <td>Technology</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="market-cap">
          <h4>Market Cap</h4>
          <p>$40.3 T</p>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ profilePic, email }) => {
  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <img src={profilePic} alt="Profile" className="profile-pic-large" />
      <p>Email: {email}</p>
    </div>
  );
};

export default App;
