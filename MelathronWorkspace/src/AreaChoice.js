import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyForm.css";
import { makeToUnique, arrayToOption } from "./helperFunctions";
const ipcRenderer = window.require('electron').ipcRenderer;



export default function AreaChoice() {
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [choice, setChoice] = useState({});

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
    var selected_item = continents.find(function(item){
        return item["continent_name"] === value; 
      }); 
    setChoice({ ...choice, continent_id : selected_item["continent_id"] });
  };

  const handleCountryChange = (e) => {
      const {value, name} = e.target;
      var selected_item = countries.find(function(item){
        return item["country_name"] === value; 
      });
      setChoice({...choice, country_id : selected_item["country_id"]})
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(choice);
      ipcRenderer.send('CountNotifElectron', choice);
      //setLoc(choice)
  }


  return (
    <div className="user-form">
      <h1>Επιλέξτε Περιοχή Εργασίας</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="continent_name">Ήπειρος</label>
          <select
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
          <select
            name="country"
            id="country"
            onChange={handleCountryChange}
            required
          >
            <option></option>
            {makeToUnique(countries, "country_name", choice, "continent_id").map(arrayToOption)}
          </select>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <button type='submit' className='btn btn-danger'>Επιλογή</button>
      </form>
    </div>
  );
}
