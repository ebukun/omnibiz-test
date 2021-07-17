import React from "react";
import Human from "#/assests/images/huma.png";
import "./styles.scss";

const Navbar = ({ handleMenu }) => {
  return (
    <div className="navbar">
      <div className="nav">
        <div role="button" className="nav-toggle" onClick={handleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <h3>Omnibiz Test</h3>
      </div>
      <div className="user-profile">
        <div className="border">
          <img src={Human} alt="profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
