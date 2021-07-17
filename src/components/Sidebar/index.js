import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./styles.scss";

const Sidebar = ({ menu, setMenu, classes }) => {
  const dropdown = useRef(null);
  const { pathname } = useLocation();

  //Closes the sideBar on route changes on mobile view
  useEffect(() => {
    if (menu) {
      setMenu(false);
    }
  }, [pathname]);

  //closes the sidebar
  useEffect(() => {
    const hide = (e) => {
      if (!dropdown.current?.contains(e.target)) {
        setMenu(false);
      }
    };

    window.addEventListener("mousedown", hide);
    return () => {
      window.removeEventListener("mousedown", hide);
    };
  }, []);
  return (
    <div className={`side-bar ${classes} ${menu ? "show-left" : "hide-left"}`} ref={dropdown}>
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
