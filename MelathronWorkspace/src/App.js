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
import LocationsPage from "./parametersComponents/LocationsPage";
import JobsPage from "./parametersComponents/JobsPage";
import ApotelesmataPage from "./parametersComponents/ApotelesmataPage"
import SubscriptionsPage from "./parametersComponents/SubscriptionsPage"
import ShippingMethodsPage from "./parametersComponents/ShippingMethodsPage"
import SalesmanPage from "./parametersComponents/SalesmanPage";

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
          <Route exact path="/locations_page">
            <LocationsPage />
          </Route>
          <Route exact path="/jobs_page">
            <JobsPage />
          </Route>
          <Route exact path="/apotelesmata_page">
            <ApotelesmataPage />
          </Route>
          <Route exact path="/subscriptions_page">
            <SubscriptionsPage />
          </Route>
          <Route exact path="/shipping_methods_page">
            <ShippingMethodsPage/>
          </Route>
          <Route exact path="/salesman_page">
            <SalesmanPage/>
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
