import React, { useEffect, useState } from "react";
//import "./MyCustomSearch.css";
import "./MyUserForm.css";
import axios from "axios";
import {
  arrayToOption,
  loadAreaChoice,
  makeToUnique,
  removeDuplicates,
} from "./helperFunctions";
import ReactSelect from "react-select";
import { Range } from "react-range";

export default function MySaleSearch() {
  const [sales, setSales] = useState([]);
  const [areaChoice, setAreaChoice] = useState({});
  const [saleOptions, setSaleOptions] = useState({});
  const [salesman, setSalesman] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [ran, setRan] = useState([50]);

  const getSearchResults = () => {
    axios
      .get("http://localhost:5000/sales")
      .then((response) => {
        setSales(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(saleOptions);
    localStorage.setItem("sale_search_results", JSON.stringify(sales));
    createBrowserWindow();
  };

  useEffect(() => {
    loadAreaChoice(setAreaChoice);
  }, []);

  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    //setCustomerOptions({...customerOptions, 'continent_id': area['continent_id'], 'country_id': area['country_id'] })
    var url1 = "http://localhost:5000/salesman";
    var url2 = "http://localhost:5000/subscriptions";
    var url3 = "http://localhost:5000/shipping_methods";
    axios.all([axios.get(url1), axios.get(url2), axios.get(url3)]).then(
      axios.spread((obj1, obj2, obj3, obj4) => {
        setSalesman(obj1.data);
        setSubscriptions(obj2.data);
        setShippingMethods(obj3.data);
      })
    );
  }, [areaChoice]);

  const handleSaleOptionsChange = (e) => {
    const { value, name } = e.target;
    setSaleOptions({ ...saleOptions, [name]: value });
  };

  const handleTheChange = (value, action) => {
    setSaleOptions({ ...saleOptions, [action.name]: value });
  };

  const myFunction = (ob, attr) => {
    const arr = [];
    ob.forEach((element) => {
      if (element[attr])
        arr.push({
          value: element[attr],
          label: element[attr],
        });
    });
    return removeDuplicates(arr, "value");
  };

  function createBrowserWindow() {
    const BrowserWindow = window.require("electron").remote.BrowserWindow;
    const win3 = new BrowserWindow({
      height: 600,
      width: 800,
    });
    win3.setMenu(null);
    win3.webContents.openDevTools();
    win3.loadURL("http://localhost:3000/sale_search_window");
  }

  return (
    <div className='total-main-page2'>
      <div className="user-form2">
        <h1>Αναζήτηση Πώλησης</h1>

        <form>
        <div className='user-form-line2'>
        <div className='form-input2 left2'>
            <label htmlFor="sale_id">Κωδικός Πώλησης</label>
            <input
              type="number"
              name="sale_id"
              id="sale_id"
              onChange={handleSaleOptionsChange}
            />
          </div>

          <div className='form-input2 left2'>
            <label htmlFor="salesman_name">Πωλητής</label>
            <ReactSelect
              name="salesman_name"
              id="salesman_name"
              onChange={handleTheChange}
              options={myFunction(salesman, "salesman_name")}
              isMulti={true}
            />
          </div>

          <div className='form-input2'>
            <label htmlFor="spcode">Κωδικός Πελάτη</label>
            <input
              type="number"
              name="spcode"
              id="spcode"
              onChange={handleSaleOptionsChange}
            />
          </div>
          </div>

          <div className='user-form-line2'>
          <div className='form-input2 left2'>
            <label htmlFor="subscription_category">Κατηγορία Συνδρομής</label>
            <ReactSelect
              name="subscription_category"
              id="subscription_category"
              onChange={handleTheChange}
              options={myFunction(subscriptions, "subscription_category")}
              isMulti={true}
            />
          </div>

          <div className='form-input2 left2'>
            <label htmlFor="subscription_name">Συνδρομή</label>
            <ReactSelect
              name="subscription_name"
              id="subscription_name"
              onChange={handleTheChange}
              options={myFunction(subscriptions, "subscription_name")}
              isMulti={true}
            />
          </div>

          <div className='form-input2'>
            <label htmlFor="shipping_method_name">Τρόπος Παράδοσης</label>
            <ReactSelect
              name="shipping_method_name"
              id="shipping_method_name"
              onChange={handleTheChange}
              options={myFunction(shippingMethods, "shipping_method_name")}
              isMulti={true}
            />
          </div>
          </div>

          <div className='user-form-line2'>
          <div className='form-input2 '>
            <label htmlFor="date_range">Ημερομηνία Παραγγελίας</label>
            <div className='user-form-line2 line-left2 range2'>
            <div className='form-input2 left2 '>
                <label htmlFor = "order_date1">Από</label>
              <input
                type="date"
                name="order_date1"
                id="order_date1"
                onChange={handleSaleOptionsChange}
              />
              </div>
              <div className='form-input2 '>
              <label htmlFor = "order_date2">Έως</label>
              <input
                type="date"
                name="order_date2"
                id="order_date2"
                onChange={handleSaleOptionsChange}
              />
            </div>
          </div>
          </div>
          </div>

          <div className='user-form-line2'>
          <div className='form-input2'>
            <label htmlFor="price_range">Ποσό Πληρωμής</label>
            <div className='user-form-line2 line-left2 range2'>
            <div className='form-input2 left2 number2'>
                <label htmlFor = "amount1">Από</label>
              <input
                type="number"
                name="amount1"
                id="amount1"
                onChange={handleSaleOptionsChange}
              />
              </div>
              <div className='form-input2 number2'>
              <label htmlFor = "amount2">Έως</label>
              <input
                type="number"
                name="amount2"
                id="amount2"
                onChange={handleSaleOptionsChange}
              />
              </div>
              </div>
            </div>
          </div>
        </form>
        <br></br>
        <br></br>
        <div className='center2'>
        <button type="submit" className="btn btn-danger choice-btn2" onClick={getSearchResults}>
          Αναζήτηση
        </button>
        </div>
      </div>
    </div>
  );
}
