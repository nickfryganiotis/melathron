import React, { useState } from "react";
import Doses from "./Doses";
export default function DosesPaymentForm({ onChange }) {

  const [numDoses, setNumDoses] = useState(2);

  const myChange = (e) => {
    const {value} = e.target;
    if (value > 1 && value < 5) {
      setNumDoses(value);
    } else {
      setNumDoses(2);
    }
    onChange(e);
  };
  return (
    <div>
      <div className='user-form-line2 line-left2'>
      
      <div className='form-input2 number2'>
        <label htmlFor="number_of_doses">Αριθμός Δόσεων: {numDoses}</label>
        <input
          type="number"
          name="number_of_doses"
          id="number_of_doses"
          min="2"
          max="4"
          onChange={myChange}
        />
      </div>
      </div>

      <div>
        {numDoses == 2 && (
          <div style={{ padding: "10px" }}>
            {" "}
            <Doses i={1} onChange={onChange} /> <br/>
            <Doses i={2} onChange={onChange} />{" "}
          </div>
        )}
        {numDoses == 3 && (
          <div style={{ padding: "10px" }}>
            {" "}
            <Doses i={1} onChange={onChange} /> <br/>
            <Doses i={2} onChange={onChange} /> <br/>
            <Doses i={3} onChange={onChange} />{" "}
          </div>
        )}
        {numDoses == 4 && (
          <div style={{ padding: "10px" }}>
            {" "}
            <Doses i={1} onChange={onChange} /> <br/>
            <Doses i={2} onChange={onChange} /> <br/>
            <Doses i={3} onChange={onChange} /> <br/>
            <Doses i={4} onChange={onChange} />{" "}
          </div>
        )}
      </div>
    </div>
  );
}
