import React from "react";
//import "./App.css";
import MyUserForm from "./MyUserForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Error from "./Error";
import AboutUs from "./AboutUs";
import MyCustomerSearch from "./MyCustomerSearch";
import MySaleForm from "./MySaleForm";
import AreaChoice from "./AreaChoice";


function App() {

  return (
    <>
    <Router>
      <Switch>
          <Route exact path="/">
            <AreaChoice />
          </Route>
          <Route exact path="/about">
            <AboutUs />
          </Route>
          <Route exact path="/insert_customer">
            <MyUserForm />
          </Route>
          <Route exact path="/insert_sale">
            <MySaleForm />
          </Route>
          <Route exact path="/search_customer">
            <MyCustomerSearch />
          </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
