import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "#/components/ScrollToTop/scrollToTop";
import Dashboard from "#/pages/Dashboard";
import AddContact from "#/pages/AddContact";
import Sidebar from "#/components/Sidebar";
import Navbar from "#/components/Navbar";

const Root = () => {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div className="app">
      <div className="app-container">
        <Sidebar classes="left-col" menu={menu} setMenu={setMenu} handleMenu={handleMenu} />
        <div className="right-col">
          <Navbar handleMenu={handleMenu} />
          <div className="route-container">
            <ScrollToTop />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/add-contacts" component={AddContact} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Router>
        <Root />
      </Router>
    </div>
  );
};

export default App;
