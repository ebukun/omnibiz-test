import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Sidebar = () => {
  return (
    <div className="side-bar">
      <div className="side-bar--links">
        <NavLink activeClassName="active" exact className="nav-link" to="/">
          <h6 className="route-name">Dashboard</h6>
        </NavLink>
        <NavLink activeClassName="active" exact className="nav-link" to="/add-contacts">
          <h6 className="route-name">Contact</h6>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
