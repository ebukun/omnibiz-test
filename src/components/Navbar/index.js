import React from "react";
import Human from "#/assests/images/huma.png";
import "./styles.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="">
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
