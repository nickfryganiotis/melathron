import React, { useEffect, useState } from "react";
import "./MyUserForm.css";
import axios from "axios";
import { loadAreaChoice, removeDuplicates } from "./helperFunctions";
import ReactSelect from "react-select";

export default function CustomerSearch() {
  const [areaChoice, setAreaChoice] = useState({});
  const [customerOptions, setCustomerOptions] = useState({});
  const [locations, setLocations] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [apotelesmata, setApotelesmata] = useState([]);
  const [salesman, setSalesman] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [spcode, setSpcode] = useState({});

  /*useEffect(() => {
    loadAreaChoice(setAreaChoice);
  }, []);*/

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
    loadAreaChoice(setAreaChoice);
    setCustomerOptions({
      ...customerOptions,
      continent_id: area["continent_id"],
      country_id: area["country_id"],
    });
    let apotelesmata_options = {
      method: "post",
      url: "http://localhost:5000/apotelesmata",
      data: { continent_id: area["continent_id"] },
    };
    let locations_options = {
      method : "post",
      url: "http://localhost:5000/locations",
      data: {'country_id': area['country_id']}
    }
    let url3 = "http://localhost:5000/professions";
    let url4 = "http://localhost:5000/salesman";
    let subscriptions_options = {
      method: "post",
      url: "http://localhost:5000/subscriptions",
      data: {'country_id': area['country_id']}
    }
    let url6 = "http://localhost:5000/categories"
    axios
      .all([
        axios(apotelesmata_options),
        axios(locations_options),
        axios.get(url3),
        axios.get(url4),
        axios(subscriptions_options),
        axios.get(url6)
      ])
      .then(
        axios.spread((obj1, obj2, obj3, obj4, obj5, obj6) => {
          setApotelesmata(obj1.data);
          setLocations(obj2.data);
          setProfessions(obj3.data);
          setSalesman(obj4.data);
          setSubscriptions(obj5.data);
          setCategories(obj6.data);
        })
      );
  }, []);

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
      webPreferences: {
        nodeIntegration: true
      }
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
    <div className='total-main-page2'>
      <div className="user-form2">
        <h1>Αναζήτηση Πελάτη</h1>

        <form>
        <div className='user-form-line2 line-left2'>
      <div className='form-input2 left2 number2'>
            <label htmlFor="spcode">Κωδικός Πελάτη</label>
            <input
              type="number"
              name="spcode"
              id="spcode"
              onChange={handleSpcodeChange}
            />
            </div>
            <button className='btn btn-danger choice-btn2 btn-code2' onClick={getSpcodeResults}>Αναζήτηση με Κωδικό</button>
          </div>

          <div className='user-form-line2'>
          <div className='form-input2 left2'>
            <label htmlFor="last_name">Επώνυμο</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div className='form-input2'>
            <label htmlFor="first_name">Όνομα</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              onChange={handleCustomerOptionsChange}
            />
          </div>
          </div>
          <div className='user-form-line2'>
          <div className='form-input2 left2'>
            <label hmtlFor="phone_number">Σταθερό Τηλέφωνο</label>
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div className='form-input2 left2'>
            <label hmtlFor="mobile_number">Κινητό Τηλέφωνο</label>
            <input
              type="text"
              name="mobile_number"
              id="mobile_number"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div className='form-input2'>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleCustomerOptionsChange}
            />
          </div>
          </div>
          <div className='user-form-line2'>
          <div className='form-input2 left2'>
            <label htmlFor="website">Ιστοσελίδα</label>
            <input
              type="text"
              name="website"
              id="website"
              onChange={handleCustomerOptionsChange}
            />
          </div>

          <div className='form-input2'>
            <label htmlFor="company_name">Επωνυμία Εταιρίας</label>
            <input
              type="text"
              name="company_name"
              id="company_name"
              onChange={handleCustomerOptionsChange}
            />
          </div>
          </div>
          <div className='user-form-line2'>
          <div className='form-input2 left2'>
            <label htmlFor="state">Νομός/ Πολιτεία</label>
            <ReactSelect
              name="state"
              id="state"
              onChange={handleTheChange}
              options={myFunction(locations, "state")}
              isMulti={true}
            />
          </div>

          <div className='form-input2 left2'>
            <label htmlFor="city">Πόλη</label>
            <ReactSelect
              name="city"
              id="city"
              onChange={handleTheChange}
              options={myFunction(locations, "city")}
              isMulti={true}
            />
          </div>

          <div className='form-input2'>
            <label htmlFor="area">Περιοχή</label>
            <ReactSelect
              name="area"
              id="area"
              onChange={handleTheChange}
              options={myFunction(locations, "area")}
              isMulti={true}
            />
          </div>
          </div>
          <div className='user-form-line2'>
          <div className='form-input2 left2'>
            <label htmlFor="category_name">Γενική Κατηγορία Επαγγέλματος</label>
            <ReactSelect
              name="category_name"
              id="category_name"
              onChange={handleTheChange}
              options={myFunction(categories, "category_name")}
              isMulti={true}
            />
          </div>

          <div className='form-input2'>
            <label htmlFor="profession_name">Επάγγελμα</label>
            <ReactSelect
              name="profession_name"
              id="profession_name"
              onChange={handleTheChange}
              options={myFunction(professions, "profession_name")}
              isMulti={true}
            />
          </div>
          </div>
          <div className='user-form-line2'>
          <div className='form-input2 left2'>
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

          <div className='form-input2'>
            <label htmlFor="subapotelesma_name">Αποτέλεσμα</label>
            <ReactSelect
              name="subapotelesma_name"
              id="subapotelesma_name"
              onChange={handleTheChange}
              options={myFunction(apotelesmata, "subapotelesma_name")}
              isMulti={true}
            />
          </div>
          </div>
          <div className='user-form-line2'>
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

          <div className='form-input2'>
            <label htmlFor="subscription_name">Συνδρομή</label>
            <ReactSelect
              name="subscription_name"
              id="subscription_name"
              onChange={handleTheChange}
              options={myFunction(subscriptions, "subscription_name")}
              isMulti={true}
            />
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

      {/*<div>
        <table>
          <tr>{mapToRow(attributes)}</tr>
          {getJSONValues(people)}
        </table>
        <br></br>
      </div>*/}
    </div>
  );
}
