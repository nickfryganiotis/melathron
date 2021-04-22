import React from "react";
//import "./App.css";
import MyUserForm from "./MyUserForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Error from "./Error";
import AboutUs from "./AboutUs";
import MyCustomerSearch from "./MyCustomerSearch";
import MySaleForm from "./MySaleForm";
import AreaChoice from "./AreaChoice";
import CustomerSearchWindow from "./CustomerSearchWindow";
import CustomersFromFile from "./CustomersFromFile";
import SalesFromFile from "./SalesFromFile"
import CustomerSearch from "./CustomerSearch";
import MySaleSearch from "./MySaleSearch";
import CodeSearchWindow from "./CodeSearchWindow";
import SaleSearchWindow from "./SaleSearchWindow";


function App() {

  return (
    <>
    <Router>
      <Switch>
          <Route exact path="/">
            <AreaChoice />
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
          <Route exact path="/customer_search_window">
            <CustomerSearchWindow />
          </Route>
          <Route exact path="/code_search_window">
            <CodeSearchWindow />
          </Route>
          <Route exact path="/load_from_file_customers">
            <CustomersFromFile />
          </Route>
          <Route exact path="/load_from_file_sales">
            <SalesFromFile />
          </Route>
          <Route exact path="/cs">
            <CustomerSearch />
          </Route>
          <Route exact path="/search_sale">
            <MySaleSearch />
          </Route>
          <Route exact path="/sale_search_window">
            <SaleSearchWindow />
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
