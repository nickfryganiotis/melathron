import React, {useState} from "react";
import {sendParameterRequest} from "../../helperFunctions"

export default function AddShippingMethod() {
  const [newsm, setNewsm] = useState("")

  function handlesmChange(e){
        const { value, name } = e.target;
        setNewsm({ [name]: value });
  }

  function handleSubmit(e){
    e.preventDefault();

    console.log(newsm)
    sendParameterRequest("shipping_method", newsm)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="shipping_method_name">
          ΝΕΟΣ ΤΡΟΠΟΣ ΠΑΡΑΔΟΣΗΣ
        </label>
        <input
          type="text"
          name="shipping_method_name"
          id="shipping_method_name"
          onChange={handlesmChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
