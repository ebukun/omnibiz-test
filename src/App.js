import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "#/components/ScrollToTop/scrollToTop";
import Dashboard from "#/pages/Dashboard";
import AddContact from "#/pages/AddContact";
import Sidebar from "#/components/Sidebar";
import Navbar from "#/components/Navbar";

const Root = () => {
  return (
    <div className="app">
      <div className="app-container">
        <div className="left-col">
          <Sidebar />
        </div>
        <div className="right-col">
          <Navbar />
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
        <Root/>
      </Router>
    </div>
  );
};

export default App;
