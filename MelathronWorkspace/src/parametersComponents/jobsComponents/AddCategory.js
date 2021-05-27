import React, {useState} from "react";
import {sendParameterRequest} from "../../helperFunctions"

export default function AddCategory() {
  const [newcat, setNewcat] = useState("")


  function handleCatChange(e){
        const { value, name } = e.target;
        setNewcat({ [name]: value });
  }

  function handleSubmit(e){
    e.preventDefault();

    console.log(newcat)
    sendParameterRequest("category", newcat)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category_name">
          ΝΕΑ ΓΕΝΙΚΗ ΚΑΤΗΓΟΡΙΑ ΕΠΑΓΓΕΛΜΑΤΟΣ
        </label>
        <input
          type="text"
          name="category_name"
          id="category_name"
          onChange={handleCatChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
