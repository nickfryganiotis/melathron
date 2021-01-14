import React, { useState, useEffect } from "react";
import "./MyCustomSearch.css";
import axios from "axios";
import {
  getJSONValues,
  mapToRow,
  loadAreaChoice,
  makeToUnique,
  arrayToOption,
} from "./helperFunctions";

export default function MyCustomerSearch() {
  const [people, setPeople] = useState([]);
  const [areaChoice, setAreaChoice] = useState({});
  const [customerOptions, setCustomerOptions] = useState({});
  const [locations, setLocations] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [apotelesmata, setApotelesmata] = useState([]);
  const [salesman, setSalesman] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const getSearchResults = () => {
    axios
      .get("http://localhost:5000/customers")
      .then((response) => {
        setPeople(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(customerOptions);
  };

  useEffect(() => {
    loadAreaChoice(setAreaChoice);
  }, []);

  useEffect(() => {
    //console.log(JSON.parse(localStorage.getItem('area_choice')))

    var url1 = "http://localhost:5000/apotelesmata";
    var url2 = "http://localhost:5000/locations";
    var url3 = "http://localhost:5000/professions";
    var url4 = "http://localhost:5000/salesman";
    var url5 = "http://localhost:5000/subscriptions";
    axios
      .all([
        axios.get(url1),
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
            <select
              name="state"
              id="state"
              onChange={handleCustomerOptionsChange}
            >
              <option></option>
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
              <option></option>
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
              <option></option>
              {makeToUnique(locations, "area", customerOptions).map(
                arrayToOption
              )}
            </select>
          </div>

          <div>
            <label htmlFor="category">Γενική Κατηγορία Επαγγέλματος</label>
            <select
              name="category"
              id="category"
              onChange={handleCustomerOptionsChange}
            >
              <option></option>
              {makeToUnique(professions, "category", customerOptions).map(
                arrayToOption
              )}
            </select>
          </div>

          <div>
            <label htmlFor="profession">Επάγγελμα</label>
            <select
              name="profession"
              id="profession"
              onChange={handleCustomerOptionsChange}
            >
              <option></option>
              {makeToUnique(professions, "profession", customerOptions).map(
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
            >
              <option></option>
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
            >
              <option></option>
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
              <option></option>
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
              <option></option>
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
              <option></option>
              {makeToUnique(
                subscriptions,
                "subscription_name",
                customerOptions
              ).map(arrayToOption)}
            </select>
          </div>
        </form>
        <button onClick={getSearchResults}>Αναζήτηση</button>
      </div>

      <div>
        <table>
          <tr>{mapToRow(attributes)}</tr>
          {getJSONValues(people)}
        </table>
        <br></br>
      </div>
    </>
  );
}
