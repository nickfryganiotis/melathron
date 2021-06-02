import React, { useState } from "react";
import {
  makeToUnique,
  arrayToOption,
  sendParameterRequest,
} from "../../helperFunctions";
import axios from "axios";

export default function AddArea() {
  const [locs, setLocs] = useState([]);
  const [newarea, setNewarea] = useState("");
  const [areaChoice, setAreaChoice] = useState({});

  const ipc = window.require("electron").ipcRenderer;
  ipc.on("areas", (event, message) => {
    setAreaChoice(message);
    let locations_options = {
      method: "post",
      url: "http://localhost:5000/locations",
      data: { country_id: message["country_id"] },
    };
    axios(locations_options)
      .then((res) => {
        setLocs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function handleAreaChange(e) {
    const { value, name } = e.target;
    setNewarea({ ...newarea, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(newarea);
    let x = { ...newarea, country_id: locs[0]["country_id"] };
    x = { ...x, state: x["state_name"], city: x["city_name"] };
    delete x["state_name"];
    delete x["city_name"];
    sendParameterRequest("location", x);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="state">ΝΟΜΟΣ/ΠΟΛΙΤΕΙΑ</label>
        <select name="state" id="state" onChange={handleAreaChange} required>
          <option></option>
          {makeToUnique(locs, "state", newarea).map(arrayToOption)}
        </select>
        <label htmlFor="city">ΠΟΛΗ</label>
        <select name="city" id="city" onChange={handleAreaChange}>
          <option></option>
          {makeToUnique(locs, "city", newarea, "state").map(arrayToOption)}
        </select>
        <label htmlFor="area">ΝΕΑ ΠΕΡΙΟΧΗ</label>
        <input
          type="text"
          name="area"
          id="area"
          onChange={handleAreaChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
