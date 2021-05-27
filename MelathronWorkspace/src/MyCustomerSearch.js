import React, { useEffect, useState } from "react";
import "./MyCustomSearch.css";
import axios from "axios";
import { arrayToOption, loadAreaChoice, makeToUnique } from "./helperFunctions";

export default function MyCustomerSearch() {
  const [people, setPeople] = useState([]);
  const [areaChoice, setAreaChoice] = useState({});
  const [customerOptions, setCustomerOptions] = useState({});
  const [locations, setLocations] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [apotelesmata, setApotelesmata] = useState([]);
  const [salesman, setSalesman] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);


  const getSearchResults = () => {
    axios
      .get("http://localhost:5000/search_customer")
      .then((response) => {
        setPeople(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(customerOptions);
    localStorage.setItem("customer_search_results", JSON.stringify(people));
    createBrowserWindow();
  };

  useEffect(() => {
    loadAreaChoice(setAreaChoice);
  }, []);

  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    //setCustomerOptions({...customerOptions, 'continent_id': area['continent_id'], 'country_id': area['country_id'] })
    let url1 = "http://localhost:5000/apotelesmata";
    let apotelesmata_options = {
      method: "post",
      url: url1,
      data: { continent_id: area["continent_id"] },
    };
    let url2 = "http://localhost:5000/locations";
    let url3 = "http://localhost:5000/professions";
    let url4 = "http://localhost:5000/salesman";
    let url5 = "http://localhost:5000/subscriptions";
    let url6 = "http://localhost:5000/categories"
    axios
      .all([
        axios(apotelesmata_options),
        axios.get(url2),
        axios.get(url3),
        axios.get(url4),
        axios.get(url5),
        axios.get(url6)
      ])
      .then(
        axios.spread((obj1, obj2, obj3, obj4, obj5, obj6) => {
          setApotelesmata(obj1.data);
          setLocations(obj2.data);
          setProfessions(obj3.data);
          setSalesman(obj4.data);
          setSubscriptions(obj5.data);
          setCategories(obj6.data)
        })
      );
  }, [areaChoice]);

  const attributes = [
    "Κωδικός",
    "Όνομα",
    "Επώνυμο",
    "Πατρώνυμο",
    "Επωνυμία Εταιρίας",
    "Ιστοσελίδα",
    "Email",
    "Οδός",
    "Αριθμός",
    "Τ.Κ.",
    "FAX",
    "Σχόλια",
    "Δυναμικό",
    "...",
    "...",
  ];

  const handleCustomerOptionsChange = (e) => {
    const { value, name } = e.target;
    setCustomerOptions({ ...customerOptions, [name]: value });
  };

  function createBrowserWindow() {
    const BrowserWindow = window.require("electron").remote.BrowserWindow;
    const win2 = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });
    win2.setMenu(null);
    //win2.webContents.openDevTools();
    win2.loadURL("http://localhost:3000/customer_search_window");
  }

  return (
    <>
      <div className="user-form">
        <h1>Αναζήτηση Πελάτη</h1>

        <form>
          <div>
            <label htmlFor="spcode">Κωδικός Πελάτη</label>
            <input
              type="number"
              name="spcode"
              id="spcode"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div>
            <label htmlFor="last_name">Επώνυμο</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div>
            <label htmlFor="first_name">Όνομα</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div>
            <label htmlFor="phone_number">Σταθερό Τηλέφωνο</label>
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div>
            <label htmlFor="mobile_number">Κινητό Τηλέφωνο</label>
            <input
              type="text"
              name="mobile_number"
              id="mobile_number"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div>
            <label htmlFor="website">Ιστοσελίδα</label>
            <input
              type="text"
              name="website"
              id="website"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div>
            <label htmlFor="company_name">Επωνυμία Εταιρίας</label>
            <input
              type="text"
              name="company_name"
              id="company_name"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div>
            <label htmlFor="state">Νομός/ Πολιτεία</label>
            <select
              name="state"
              id="state"
              onChange={handleCustomerOptionsChange}
            >
              <option/>
              {makeToUnique(locations, "state", customerOptions).map(
                arrayToOption
              )}
            </select>
          </div>

          <div>
            <label htmlFor="city">Πόλη</label>
            <select
              name="city"
              id="city"
              onChange={handleCustomerOptionsChange}
            >
              <option/>
              {makeToUnique(locations, "city", customerOptions).map(
                arrayToOption
              )}
            </select>
          </div>

          <div>
            <label htmlFor="area">Περιοχή</label>
            <select
              name="area"
              id="area"
              onChange={handleCustomerOptionsChange}
            >
              <option/>
              {makeToUnique(locations, "area", customerOptions).map(
                arrayToOption
              )}
            </select>
          </div>

          <div>
            <label htmlFor="category_name">Γενική Κατηγορία Επαγγέλματος</label>
            <select
              name="category_name"
              id="category_name"
              onChange={handleCustomerOptionsChange}
            >
              <option/>
              {makeToUnique(categories, "category_name", customerOptions).map(
                arrayToOption
              )}
            </select>
          </div>

          <div>
            <label htmlFor="profession_name">Επάγγελμα</label>
            <select
              name="profession_name"
              id="profession_name"
              onChange={handleCustomerOptionsChange}
            >
              <option/>
              {makeToUnique(professions, "profession_name", customerOptions).map(
                arrayToOption
              )}
            </select>
          </div>

          <div>
            <label htmlFor="apotelesma_name">
              Γενική Κατηγορία Αποτελέσματος
            </label>
            <select
              name="apotelesma_name"
              id="apotelesma_name"
              onChange={handleCustomerOptionsChange}
              multiple={true}
            >
              <option/>
              {makeToUnique(
                apotelesmata,
                "apotelesma_name",
                customerOptions
              ).map(arrayToOption)}
            </select>
          </div>

          <div>
            <label htmlFor="subapotelesma_name">Αποτέλεσμα</label>
            <select
              name="subapotelesma_name"
              id="subapotelesma_name"
              onChange={handleCustomerOptionsChange}
              multiple={true}
            >
              <option/>
              {makeToUnique(
                apotelesmata,
                "subapotelesma_name",
                customerOptions
              ).map(arrayToOption)}
            </select>
          </div>

          <div>
            <label htmlFor="salesman">Πωλητής</label>
            <select
              name="salesman"
              id="salesman"
              onChange={handleCustomerOptionsChange}
            >
              <option/>
              {makeToUnique(salesman, "salesman", setCustomerOptions).map(
                arrayToOption
              )}
            </select>
          </div>

          <div>
            <label htmlFor="subscription_category">Κατηγορία Συνδρομής</label>
            <select
              name="subscription_category"
              id="subscription_category"
              onChange={handleCustomerOptionsChange}
            >
              <option/>
              {makeToUnique(
                subscriptions,
                "subscription_category",
                customerOptions
              ).map(arrayToOption)}
            </select>
          </div>

          <div>
            <label htmlFor="subscription_name">Συνδρομή</label>
            <select
              name="subscription_name"
              id="subscription_name"
              onChange={handleCustomerOptionsChange}
            >
              <option/>
              {makeToUnique(
                subscriptions,
                "subscription_name",
                customerOptions
              ).map(arrayToOption)}
            </select>
          </div>
        </form>
        <br/>
        <br/>
        <button type="submit" onClick={getSearchResults}>
          Αναζήτηση
        </button>
      </div>

      {/*<div>
        <table>
          <tr>{mapToRow(attributes)}</tr>
          {getJSONValues(people)}
        </table>
        <br></br>
      </div>*/}
    </>
  );
}
