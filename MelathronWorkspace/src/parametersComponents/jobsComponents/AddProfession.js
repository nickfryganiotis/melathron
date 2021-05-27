import React, {useState} from "react";
import {sendParameterRequest} from "../../helperFunctions"

export default function AddProfession() {
  const [newprof, setNewprof] = useState("")


  function handleprofChange(e){
        const { value, name } = e.target;
        setNewprof({ [name]: value });
  }

  function handleSubmit(e){
    e.preventDefault();

    console.log(newprof)
    sendParameterRequest("profession", newprof)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="profession_name">
          ΝΕΑ ΓΕΝΙΚΗ ΚΑΤΗΓΟΡΙΑ ΕΠΑΓΓΕΛΜΑΤΟΣ
        </label>
        <input
          type="text"
          name="profession_name"
          id="profession_name"
          onChange={handleprofChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
