import React, {useState} from "react";
import {sendParameterRequest} from "../../helperFunctions"

export default function AddBiography() {
  const [newbio, setNewbio] = useState("")


  function handlebioChange(e){
        const { value, name } = e.target;
        setNewbio({ [name]: value });
  }

  function handleSubmit(e){
    e.preventDefault();

    console.log(newbio)
    sendParameterRequest("biography", newbio)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="biography_name">
          ΝΕΟ ΣΤΑΔΙΟ ΒΙΟΓΡΑΦΙΑΣ
        </label>
        <input
          type="text"
          name="biography_name"
          id="biography_name"
          onChange={handlebioChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
