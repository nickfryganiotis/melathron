import React, {useState} from "react";
import {sendParameterRequest} from "../../helperFunctions"

export default function AddSubscriptionCategory() {
  const [continent, setContinent] = useState(0);
  const [newsubcat, setNewsubcat] = useState("")
  const ipc = window.require("electron").ipcRenderer;
  ipc.on("sundromes", (event, message) => {
    setContinent(message);
  });

  function handleSubcatChange(e){
        const { value, name } = e.target;
        setNewsubcat({ [name]: value });
  }

  function handleSubmit(e){
    e.preventDefault();

    console.log(newsubcat)
    let x = {...newsubcat, "continent_id" : continent}
    sendParameterRequest("subscrption", x)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subscription_category">
          ΝΕΑ ΓΕΝΙΚΗ ΚΑΤΗΓΟΡΙΑ ΣΥΝΔΡΟΜΗΣ
        </label>
        <input
          type="text"
          name="subscription_category"
          id="subscription_category"
          onChange={handleSubcatChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
