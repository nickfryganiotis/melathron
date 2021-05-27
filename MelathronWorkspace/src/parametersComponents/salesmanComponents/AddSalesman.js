import React, {useState} from "react";
import {sendParameterRequest} from "../../helperFunctions"

export default function AddSalesman() {
  const [newsal, setNewsal] = useState("")


  function handleSalChange(e){
        const { value, name } = e.target;
        setNewsal({ [name]: value });
  }

  function handleSubmit(e){
    e.preventDefault();

    console.log(newsal)
    sendParameterRequest("salesman", newsal)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="salesman_name">
          ΝΕΟΣ ΠΩΛΗΤΗΣ
        </label>
        <input
          type="text"
          name="salesman_name"
          id="salesman_name"
          onChange={handleSalChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
