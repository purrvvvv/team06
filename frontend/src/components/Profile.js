import React from 'react';

const Profile = ({ profilePic, email, username }) => {
  return (
    <div style={profileCardStyle}>
      <div style={profileContentStyle}>
        <h2 style={headingStyle}>Profile</h2>
        <div style={imageContainerStyle}>
          <img src={profilePic} alt="Profile" style={imageStyle} />
        </div>
        <div style={labelContainerStyle}>
          <div style={labelStyle}>Username:</div>
          <div style={valueStyle}>{username}</div>
        </div>
        <div style={labelContainerStyle}>
          <div style={labelStyle}>Email:</div>
          <div style={valueStyle}>{email}</div>
        </div>
        <div style={labelContainerStyle}>
          <div style={labelStyle}>Preferred Currency:</div>
          <div style={currencyValueStyle}>Dollar ($)</div>
        </div>
        <div style={labelContainerStyle}>
          <div style={labelStyle}>Preferred Language:</div>
          <div style={valueStyle}>English</div>
        </div>
      </div>
    </div>
  );
};

const profileCardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f7f7f7',
};

const profileContentStyle = {
  backgroundImage: 'linear-gradient(to bottom right, #04BD98, #009C66, #68CCB0, #009159, #00945B, #007c4d, #006d43)',
  backgroundSize: 'cover',
  borderRadius: '12px',
  padding: '30px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '350px',
  textAlign: 'left',
  color: '#fff', // White text on gradient background
};

const headingStyle = {
  fontSize: '26px',
  marginBottom: '20px',
  fontWeight: '600',
};

const imageContainerStyle = {
  marginBottom: '20px',
  borderRadius: '50%',
  overflow: 'hidden',
  width: '120px',
  height: '120px',
  margin: '0 auto',
  border: '4px solid #fff', // Border around image
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const labelContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '15px',
  padding: '5px',
  borderBottom: '1px solid #ddd', // Border between labels
};

const labelStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
};

const valueStyle = {
  fontSize: '16px',
};

const currencyValueStyle = {
  fontWeight: 'bold',
  color: '#4caf50',
};

export default Profile;