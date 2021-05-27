import React, {useState} from "react";
import { sendParameterRequest } from "../../helperFunctions";

export default function AddAp() {
  const [continent, setContinent] = useState(0);
  const [newap, setNewap] = useState("")
  const ipc = window.require("electron").ipcRenderer;
  ipc.on("apotelesmata", (event, message) => {
    setContinent(message);
  });

  function handleApChange(e){
        const { value, name } = e.target;
        setNewap({ [name]: value });
  }

  function handleSubmit(e){
    e.preventDefault();
    let x = {...newap, "continent_id" : continent}
    sendParameterRequest("apotelesma", x)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="apotelesma_name">
          ΝΕΑ ΓΕΝΙΚΗ ΚΑΤΗΓΟΡΙΑ ΑΠΟΤΕΛΕΣΜΑΤΟΣ
        </label>
        <input
          type="text"
          name="apotelesma_name"
          id="apotelesma_name"
          onChange={handleApChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
