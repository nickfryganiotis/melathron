import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyForm.css";
import { makeToUnique, arrayToOption } from "./helperFunctions";
import { useHistory } from "react-router-dom";

export default function AreaChoice() {
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [choice, setChoice] = useState({});

  const history = useHistory();

  useEffect(() => {
    var url1 = "http://localhost:5000/continents";
    var url2 = "http://localhost:5000/countries";
    axios.all([axios.get(url1), axios.get(url2)]).then(
      axios.spread((obj1, obj2) => {
        setContinents(obj1.data);
        setCountries(obj2.data);
      })
    );
  }, []);

  const handleContinentChange = (e) => {
    const { value, name } = e.target;
    var selected_item = continents.find(function (item) {
      return item["continent_name"] === value;
    });
    setChoice({ ...choice, continent_id: selected_item["continent_id"] });
  };

  const handleCountryChange = (e) => {
    const { value, name } = e.target;
    var selected_item = countries.find(function (item) {
      return item["country_name"] === value;
    });
    setChoice({ ...choice, country_id: selected_item["country_id"] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('area_choice', JSON.stringify(choice) )
    //console.log(JSON.parse(localStorage.getItem('area_choice')))
    history.push("/insert_customer");
  };
 
  return (
    <div className='total-main-page'>
      <div className="user-form-div">
        <div className="user-form-image"></div>
    <div className="user-form">
      <h1>Επιλέξτε Περιοχή Εργασίας</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="continent_name">Ήπειρος</label>
          <select className='user-form-select'
            name="continent_name"
            id="continent_name"
            onChange={handleContinentChange}
            required
          >
            <option></option>
            {makeToUnique(continents, "continent_name").map(arrayToOption)}
          </select>
        </div>

        <div>
          <label htmlFor="country">Χώρα</label>
          <select className='user-form-select'
            type='text'
            name="country"
            id="country"
            onChange={handleCountryChange}
            required
          >
            <option></option>
            {makeToUnique(
              countries,
              "country_name",
              choice,
              "continent_id"
            ).map(arrayToOption)}
          </select>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className='center'>
          <button type="submit" className="btn btn-danger choice-btn">
            Επιλογή
          </button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
}
