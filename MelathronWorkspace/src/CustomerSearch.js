import React, { useEffect, useState } from "react";
import "./MyCustomSearch.css";
import axios from "axios";
import { loadAreaChoice, removeDuplicates } from "./helperFunctions";
import ReactSelect from "react-select";

export default function CustomerSearch() {
  const [areaChoice, setAreaChoice] = useState({});
  const [customerOptions, setCustomerOptions] = useState({});
  const [locations, setLocations] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [apotelesmata, setApotelesmata] = useState([]);
  const [salesman, setSalesman] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [spcode, setSpcode] = useState({});

  useEffect(() => {
    loadAreaChoice(setAreaChoice);
  }, []);

  const getSearchResults = () => {
    localStorage.setItem(
      "customer_search_options",
      JSON.stringify(customerOptions)
    );
    createBrowserWindow("customer_search");
  };

  const getSpcodeResults = () => {
    localStorage.setItem("spcode_search", JSON.stringify(spcode));
    createBrowserWindow("spcode_search");
  };

  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    setCustomerOptions({
      ...customerOptions,
      continent_id: area["continent_id"],
      country_id: area["country_id"],
    });
    let url1 = "http://localhost:5000/apotelesmata";
    let apotelesmata_options = {
      method: "post",
      url: url1,
      data: { continent_id: area["continent_id"] },
    };
    var url2 = "http://localhost:5000/locations";
    var url3 = "http://localhost:5000/professions";
    var url4 = "http://localhost:5000/salesman";
    var url5 = "http://localhost:5000/subscriptions";
    axios
      .all([
        axios(apotelesmata_options),
        axios.get(url2),
        axios.get(url3),
        axios.get(url4),
        axios.get(url5),
      ])
      .then(
        axios.spread((obj1, obj2, obj3, obj4, obj5) => {
          setApotelesmata(obj1.data);
          setLocations(obj2.data);
          setProfessions(obj3.data);
          setSalesman(obj4.data);
          setSubscriptions(obj5.data);
        })
      );
  }, [areaChoice]);

  const handleCustomerOptionsChange = (e) => {
    const { value, name } = e.target;
    setCustomerOptions({ ...customerOptions, [name]: value });
  };

  const handleTheChange = (value, action) => {
    setCustomerOptions({ ...customerOptions, [action.name]: value });
  };

  const handleSpcodeChange = (e) => {
    const { value, name } = e.target;
    setSpcode({ ...spcode, [name]: value });
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

  function createBrowserWindow(window_type) {
    const BrowserWindow = window.require("electron").remote.BrowserWindow;
    const win2 = new BrowserWindow({
      height: 600,
      width: 800,
    });
    win2.setMenu(null);
    win2.webContents.openDevTools();
    if (window_type == "customer_search") {
      win2.loadURL("http://localhost:3000/customer_search_window");
    } else if (window_type == "spcode_search") {
      win2.loadURL("http://localhost:3000/code_search_window");
    } else {
      console.log("ERROR");
    }
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
              onChange={handleSpcodeChange}
            />
            <button onClick={getSpcodeResults}>Αναζήτηση με Κωδικό</button>
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
            <label hmtlFor="phone_number">Σταθερό Τηλέφωνο</label>
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div>
            <label hmtlFor="mobile_number">Κινητό Τηλέφωνο</label>
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
            <ReactSelect
              name="state"
              id="state"
              onChange={handleTheChange}
              options={myFunction(locations, "state")}
              isMulti={true}
            />
          </div>

          <div>
            <label htmlFor="city">Πόλη</label>
            <ReactSelect
              name="city"
              id="city"
              onChange={handleTheChange}
              options={myFunction(locations, "city")}
              isMulti={true}
            />
          </div>

          <div>
            <label htmlFor="area">Περιοχή</label>
            <ReactSelect
              name="area"
              id="area"
              onChange={handleTheChange}
              options={myFunction(locations, "area")}
              isMulti={true}
            />
          </div>

          <div>
            <label htmlFor="category">Γενική Κατηγορία Επαγγέλματος</label>
            <ReactSelect
              name="category"
              id="category"
              onChange={handleTheChange}
              options={myFunction(professions, "category")}
              isMulti={true}
            />
          </div>

          <div>
            <label htmlFor="profession">Επάγγελμα</label>
            <ReactSelect
              name="profession"
              id="profession"
              onChange={handleTheChange}
              options={myFunction(professions, "profession")}
              isMulti={true}
            />
          </div>

          <div>
            <label htmlFor="apotelesma_name">
              Γενική Κατηγορία Αποτελέσματος
            </label>
            <ReactSelect
              name="apotelesma_name"
              id="apotelesma_name"
              onChange={handleTheChange}
              options={myFunction(apotelesmata, "apotelesma_name")}
              isMulti={true}
            />
          </div>

          <div>
            <label htmlFor="subapotelesma_name">Αποτέλεσμα</label>
            <ReactSelect
              name="subapotelesma_name"
              id="subapotelesma_name"
              onChange={handleTheChange}
              options={myFunction(apotelesmata, "subapotelesma_name")}
              isMulti={true}
            />
          </div>

          <div>
            <label htmlFor="salesman_name">Πωλητής</label>
            <ReactSelect
              name="salesman_name"
              id="salesman_name"
              onChange={handleTheChange}
              options={myFunction(salesman, "salesman_name")}
              isMulti={true}
            />
          </div>

          <div>
            <label htmlFor="subscription_category">Κατηγορία Συνδρομής</label>
            <ReactSelect
              name="subscription_category"
              id="subscription_category"
              onChange={handleTheChange}
              options={myFunction(subscriptions, "subscription_category")}
              isMulti={true}
            />
          </div>

          <div>
            <label htmlFor="subscription_name">Συνδρομή</label>
            <ReactSelect
              name="subscription_name"
              id="subscription_name"
              onChange={handleTheChange}
              options={myFunction(subscriptions, "subscription_name")}
              isMulti={true}
            />
          </div>
        </form>
        <br></br>
        <br></br>
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
