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
import Login from "./Login";
import HomePage from "./HomePage";
import AddAp from "./parametersComponents/apotelesmataComponents/AddAp";
import AddSubAp from "./parametersComponents/apotelesmataComponents/AddSubAp";
import AddCategory from "./parametersComponents/jobsComponents/AddCategory";
import AddProfession from "./parametersComponents/jobsComponents/AddProfession";
import AddSalesman from "./parametersComponents/salesmanComponents/AddSalesman";
import AddShippingMethod from "./parametersComponents/shippingMethodsComponents.js/AddShippingMethod";
import AddSubscriptionCategory from "./parametersComponents/subscriptionsComponents/AddSubscriptionCategory";
import AddSubscription from "./parametersComponents/subscriptionsComponents/AddSubscription";
import PelatesKartela from "./printComponents/PelatesKartela";

function App() {

  return (
    <>
    <Router>
      <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/area_choice">
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
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/add_apotelesma_window">
            <AddAp />
          </Route>
          <Route exact path="/add_subapotelesma_window">
            <AddSubAp />
          </Route>
          <Route exact path="/add_category_window">
            <AddCategory />
          </Route>
          <Route exact path="/add_profession_window">
            <AddProfession />
          </Route>
          <Route exact path="/add_salesman_window">
            <AddSalesman />
          </Route>
          <Route exact path="/add_shipping_method_window">
            <AddShippingMethod />
          </Route>
          <Route exact path="/add_subscription_category_window">
            <AddSubscriptionCategory />
          </Route>
          <Route exact path="/add_subscription_window">
            <AddSubscription />
          </Route>
          <Route exact path="/pelates_kartela">
            <PelatesKartela/>
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
