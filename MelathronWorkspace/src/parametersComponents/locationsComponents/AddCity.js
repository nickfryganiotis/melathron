import React, { useState } from "react";
import {makeToUnique, arrayToOption, sendParameterRequest} from "../../helperFunctions"

export default function AddCity() {
  const [states, setStates] = useState([]);
  const [newcity, setNewcity] = useState("");
  const ipc = window.require("electron").ipcRenderer;
  ipc.on("cities", (event, message) => {
    setStates(message);
  });

  function handleCityChange(e) {
    const { value, name } = e.target;
    setNewcity({ ...newcity, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(newcity);
    let x = {...newcity, "country_id" : states[0]['country_id']}
    x = {...x, "state" : x["state_name"]}
    delete x["state_name"]
    sendParameterRequest("location", x)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="state">ΝΟΜΟΣ/ΠΟΛΙΤΕΙΑ</label>
        <select
          name="state"
          id="state"
          onChange={handleCityChange}
          required
        >
            <option></option>
                {makeToUnique(states, "state_name", newcity).map(
                  arrayToOption
                )}
        </select>
        <label htmlFor="city">ΝΕΑ ΠΟΛΗ</label>
        <input
          type="text"
          name="city"
          id="city"
          onChange={handleCityChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
