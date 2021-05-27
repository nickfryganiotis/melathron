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
  const [status, setStatus] = useState(2);

  const getSearchResults = () => {
    localStorage.setItem("sale_search_options", JSON.stringify(saleOptions));
    createBrowserWindow();
  };

  /*useEffect(() => {
    loadAreaChoice(setAreaChoice);
  }, []);*/

  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    loadAreaChoice(setAreaChoice);
    //setCustomerOptions({...customerOptions, 'continent_id': area['continent_id'], 'country_id': area['country_id'] })
    let url1 = "http://localhost:5000/salesman";
    let subscriptions_options = {
      method: "post",
      url: "http://localhost:5000/subscriptions",
      data: { country_id: area["country_id"] },
    };
    let url3 = "http://localhost:5000/shipping_methods";
    axios
      .all([axios.get(url1), axios(subscriptions_options), axios.get(url3)])
      .then(
        axios.spread((obj1, obj2, obj3) => {
          setSalesman(obj1.data);
          setSubscriptions(obj2.data);
          setShippingMethods(obj3.data);
        })
      );
  }, []);

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
      webPreferences: {
        nodeIntegration: true
      }
    });
    win3.setMenu(null);
    win3.webContents.openDevTools();
    win3.loadURL("http://localhost:3000/sale_search_window");
  }

  const radioHandler = (status) => {
    setStatus(status);
    setSaleOptions({ ...saleOptions, paid: status });
  };

  return (
    <div className="total-main-page2">
      <div className="user-form2">
        <h1>Αναζήτηση Πώλησης</h1>

        <form>
          <div className="user-form-line2">
            <div className="form-input2 left2">
              <label htmlFor="sale_id">Κωδικός Πώλησης</label>
              <input
                type="number"
                name="sale_id"
                id="sale_id"
                onChange={handleSaleOptionsChange}
              />
            </div>

            <div className="form-input2 left2">
              <label htmlFor="salesman_name">Πωλητής</label>
              <ReactSelect
                name="salesman_name"
                id="salesman_name"
                onChange={handleTheChange}
                options={myFunction(salesman, "salesman_name")}
                isMulti={true}
              />
            </div>

            <div className="form-input2">
              <label htmlFor="spcode">Κωδικός Πελάτη</label>
              <input
                type="number"
                name="spcode"
                id="spcode"
                onChange={handleSaleOptionsChange}
              />
            </div>
          </div>
          <div className="user-form-line2">
            <div className="form-input2 left2">
              <label htmlFor="subscription_category">Κατηγορία Συνδρομής</label>
              <ReactSelect
                name="subscription_category"
                id="subscription_category"
                onChange={handleTheChange}
                options={myFunction(subscriptions, "subscription_category")}
                isMulti={true}
              />
            </div>

            <div className="form-input2 left2">
              <label htmlFor="subscription_name">Συνδρομή</label>
              <ReactSelect
                name="subscription_name"
                id="subscription_name"
                onChange={handleTheChange}
                options={myFunction(subscriptions, "subscription_name")}
                isMulti={true}
              />
            </div>

            <div className="form-input2">
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
          <div className="user-form-line2">
            <div className="form-input2 ">
              <label htmlFor="date_range">Ημερομηνία Παραγγελίας</label>
              <div className="user-form-line2 line-left2 range2">
                <div className="form-input2 left2 ">
                  <label htmlFor="order_date1">Από</label>
                  <input
                    type="date"
                    name="order_date1"
                    id="order_date1"
                    onChange={handleSaleOptionsChange}
                  />
                </div>
                <div className="form-input2 ">
                  <label htmlFor="order_date2">Έως</label>
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

          <div className="user-form-line2">
            <div className="form-input2">
              <label htmlFor="price_range">Ποσό Πληρωμής</label>
              <div className="user-form-line2 line-left2 range2">
                <div className="form-input2 left2 number2">
                  <label htmlFor="amount1">Από</label>
                  <input
                    type="number"
                    name="amount1"
                    id="amount1"
                    onChange={handleSaleOptionsChange}
                  />
                </div>
                <div className="form-input2 number2">
                  <label htmlFor="amount2">Έως</label>
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
          <div className="user-form-line2">
            <div className="form-input2">
              <div className="maria">
                <input
                  type="radio"
                  name="paid"
                  id="paid"
                  checked={status == 1}
                  onClick={(e) => radioHandler(1)}
                />
                <label
                  htmlFor="paid"
                  style={{ "margin-top": 0, "font-size": "16px" }}
                >
                  Εξοφλημένες
                </label>
              </div>
              <div className="maria">
                <input
                  type="radio"
                  name="notpaid"
                  id="notpaid"
                  checked={status == 0}
                  onClick={(e) => radioHandler(0)}
                />
                <label
                  htmlFor="notpaid"
                  style={{ "margin-top": 0, "font-size": "16px" }}
                >
                  Ανεξόφλητες
                </label>
              </div>
              <div className="maria">
                <input
                  type="radio"
                  name="bothpaid"
                  id="bothpaid"
                  checked={status == 2}
                  onClick={(e) => radioHandler(2)}
                />
                <label
                  htmlFor="bothpaid"
                  style={{ "margin-top": 0, "font-size": "16px" }}
                >
                  Όλες οι πωλήσεις
                </label>
              </div>
            </div>
          </div>
        </form>
        <br></br>
        <br></br>
        <div className="center2">
          <button
            type="submit"
            className="btn btn-danger choice-btn2"
            onClick={getSearchResults}
          >
            Αναζήτηση
          </button>
        </div>
      </div>
    </div>
  );
}
