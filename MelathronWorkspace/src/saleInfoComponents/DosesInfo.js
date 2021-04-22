import axios from "axios";
import React, { useState, useEffect } from "react";
import { timeConverter } from "../helperFunctions";

export default function DosesInfo({ dosess,sale_id }) {
  const [doses, setDoses] = useState([]);
  const [nDose, setNDose] = useState({});

  useEffect(() => {
    setDoses([...dosess]);
  }, [dosess]);

  function newDose(e) {
    e.preventDefault();
    let n_options = {
        method:"post",
        url: "http://localhost:5000/insert_dose",
        data : {...nDose, 'sale_id' : sale_id}
    }
    axios(n_options).then((res)=>console.log(res)).catch((error)=>console.log(error))
  }

  function handleChange(e){
    const { value, name } = e.target;
    setNDose({...nDose, [name] : value})
  }

  function delDose(e, i){
    e.preventDefault()
  }

  return (
    <div>
      <table>
        <th>ΑΡΙΘΜΟΣ ΔΟΣΗΣ</th>
        <th>ΠΟΣΟ ΔΟΣΗΣ</th>
        <th>ΠΛΗΡΩΘΕΝ ΠΟΣΟ</th>
        <th>ΠΡΟΘΕΣΜΙΑ ΕΞΟΦΛΗΣΗΣ ΔΟΣΗΣ</th>
        <th>ΗΜΕΡΟΜΗΝΙΑ ΕΞΟΦΛΗΣΗΣ</th>
        <th>ΜΕΘΟΔΟΣ ΠΛΗΡΩΜΗΣ</th>
        {doses.map((element) => {
          return (
            <tr>
              <td>{element["dose_number"]}</td>
              <td>{element["dose_amount"]}</td>
              <td>{element["payment_amount"]}</td>
              <td>{timeConverter(element["dose_deadline"])}</td>
              <td>{timeConverter(element["payment_date"])}</td>
              <td>{element["payment_method"]}</td>
              <td><button onClick={(e) => {delDose(e,element["dose_number"])}}>-</button></td>
            </tr>
          );
        })}
        {doses.length < 5 && <tr>
          <td>
            <input type="number" name="dose_amount" id="dose_amount" onChange={handleChange}></input>
          </td>
          <td>
            <input
              type="number"
              name="payment_amount"
              id="payment_amount"
              onChange={handleChange}
            ></input>
          </td>
          <td>
            <input type="date" name="dose_deadline" id="dose_deadline" onChange={handleChange}></input>
          </td>
          <td>-</td>
          <td>
            <select name="payment_method" id="payment_method" onChange={handleChange}>
                <option value={null}>{null}</option>
              <option value="Τραπεζική Κατάθεση">
                Τραπεζική Κατάθεση
              </option>
              <option value="Μετρητά">Μετρητά</option>
            </select>
          </td>
        </tr>}
      </table>
      {doses.length < 5 && <button onClick={newDose}>+</button>}
    </div>
  );
}
