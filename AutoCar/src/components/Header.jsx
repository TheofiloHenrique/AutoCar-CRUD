// Header.js
import React from 'react';
import logo from '../assets/mascote1.webp'

function Header() {
  return (
    <header className="header">
      <h1>AutoCar Ltda</h1>
      <img src={logo} alt="logo" width={150} />
    </header>
  );
}

export default Header;