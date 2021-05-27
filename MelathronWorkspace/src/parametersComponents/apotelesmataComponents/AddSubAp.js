import React, { useState } from "react";
import {makeToUnique, arrayToOption, sendParameterRequest} from "../../helperFunctions"

export default function AddAp() {
  const [apotelesmata, setApotelesmata] = useState([]);
  const [newsubap, setNewsubap] = useState("");
  const ipc = window.require("electron").ipcRenderer;
  ipc.on("subapotelesmata", (event, message) => {
    setApotelesmata(message);
  });

  function handleApChange(e) {
    const { value, name } = e.target;
    setNewsubap({ ...newsubap, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(newsubap);
    let x = {...newsubap, "continent_id" : apotelesmata[0]['continent_id']}
    sendParameterRequest("apotelesma", x)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="apotelesma_name">ΓΕΝΙΚΗ ΚΑΤΗΓΟΡΙΑ ΑΠΟΤΕΛΕΣΜΑΤΟΣ</label>
        <select
          name="apotelesma_name"
          id="apotelesma_name"
          onChange={handleApChange}
          required
        >
            <option></option>
                {makeToUnique(apotelesmata, "apotelesma_name", newsubap).map(
                  arrayToOption
                )}
        </select>
        <label htmlFor="subapotelesma_name">ΝΕΟ ΑΠΟΤΕΛΕΣΜΑ</label>
        <input
          type="text"
          name="subapotelesma_name"
          id="subapotelesma_name"
          onChange={handleApChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
