import React from 'react';
 
const Header = ({ logoSrc = '/assets/OIP.jpg', title = 'Customer Transactions and Rewards' }) => {
  return (
    <header className="header">
      <img src={logoSrc} alt="Logo" className="logo" />
      <h1 className="title">{title}</h1>
    </header>
  );
};
 
export default Header;