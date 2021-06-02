import React, {useState} from "react";
import { sendParameterRequest } from "../../helperFunctions";

export default function AddState() {
  const [country, setCountry] = useState(0);
  const [newstate, setNewstate] = useState("")
  const ipc = window.require("electron").ipcRenderer;
  ipc.on("locs", (event, message) => {
    setCountry(message);
  });

  function handleStateChange(e){
        const { value, name } = e.target;
        setNewstate({ [name]: value });
  }

  function handleSubmit(e){
    e.preventDefault();
    let x = {...newstate, "country_id" : country}
    sendParameterRequest("location", x)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="state">
          ΝΕΟΣ ΝΟΜΟΣ/ΠΟΛΙΤΕΙΑ
        </label>
        <input
          type="text"
          name="state"
          id="state"
          onChange={handleStateChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
