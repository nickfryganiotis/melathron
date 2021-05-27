import axios from "axios";
import React, { useState, useEffect } from "react";
import { timeConverter } from "../helperFunctions";
import MultiCompDose from "./MultiCompDose"

export default function DosesInfo({ dosess,sale_id }) {
  const [doses, setDoses] = useState([]);
  const [nDose, setNDose] = useState({});
  const [dicto, setDicto] = useState({
    "dose_number" : "ΑΡΙΘΜΟΣ ΔΟΣΗΣ",
    "dose_amount" : "ΣΥΝΟΛΙΚΟ ΠΟΣΟ ΔΟΣΗΣ",
    "payment_amount" : "ΠΛΗΡΩΘΕΝ ΠΟΣΟ ΔΟΣΗΣ",
    "dose_deadline" : "ΠΡΟΘΕΣΜΙΑ ΕΞΟΦΛΗΣΗΣ ΔΟΣΗΣ",
    "payment_date" : "ΗΜΕΡΟΜΗΝΙΑ ΕΞΟΦΛΗΣΗΣ ΔΟΣΗΣ",
    "payment_method" : "ΜΕΘΟΔΟΣ ΠΛΗΡΩΜΗΣ ΔΟΣΗΣ"
  });
  const [stat, setStat] = useState([{}, {}, {}, {}])
  const [updDose, setUpdDose] = useState([{}, {}, {}, {}])

  useEffect(() => {
    setDoses([...dosess]);
  }, [dosess]);



  function handleUpdate(e, key, i) {
    //let row_id = e.target.parentNode.id
    let st = stat[i]
    let s = [...stat]
    if(!st.hasOwnProperty(key) ){
      if (key=="dose_number"){
        ;
      }
      else st[key] = key;
      s[i] = st
      setStat(s)
    }
    else{
      let x = st;
      if (key=="dose_number"){
        ;
      }
      else
      delete x[key];
      s[i] = x
      setStat(s)
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    let upd_options = {
      "method" : "post",
      "url" : "http://localhost:5000/update_dose",
      "data" : {"doses" : updDose, "sale_id" : sale_id }
    }
    console.log(updDose)
  }

  /*function newDose(e) {
    e.preventDefault();
    let n_options = {
        method:"post",
        url: "http://localhost:5000/insert_dose",
        data : {...nDose, 'sale_id' : sale_id}
    }
    console.log(n_options)
    axios(n_options).then((res)=>console.log(res)).catch((error)=>console.log(error))
  }

  function handleChange(e){
    const { value, name } = e.target;
    setNDose({...nDose, [name] : value})
  }

  function delDose(e, i){
    e.preventDefault()
    let del_options = {
        method: "post",
        url: "http://localhost:5000/delete_dose",
        data : {'dose_number' : i, 'sale_id' : sale_id}
    }
    console.log(del_options)
    axios(del_options).then((res) => console.log(res)).catch((error) => console.log(error))
  }

  return (
    <div>
      <table>
        {doses.length > 1 && <th>ΑΡΙΘΜΟΣ ΔΟΣΗΣ</th>}
        {doses.length > 1 ? <th>ΣΥΝΟΛΙΚΟ ΠΟΣΟ ΔΟΣΗΣ</th> : <th>ΣΥΝΟΛΙΚΟ ΠΟΣΟ</th>}
        <th>ΠΛΗΡΩΘΕΝ ΠΟΣΟ</th>
        {doses.length > 1 ? <th>ΠΡΟΘΕΣΜΙΑ ΕΞΟΦΛΗΣΗΣ ΔΟΣΗΣ</th> : <th>ΠΡΟΘΕΣΜΙΑ ΕΞΟΦΛΗΣΗΣ</th>}
        <th>ΗΜΕΡΟΜΗΝΙΑ ΕΞΟΦΛΗΣΗΣ</th>
        <th>ΜΕΘΟΔΟΣ ΠΛΗΡΩΜΗΣ</th>
        {doses.map((element, i) => {
          return (
            <tr>
              {doses.length > 1 && <td>{i+1}</td>}
              <td>{element["dose_amount"]}</td>
              <td>{element["payment_amount"]}</td>
              <td>{timeConverter(element["dose_deadline"])}</td>
              <td>{timeConverter(element["payment_date"])}</td>
              <td>{element["payment_method"]}</td>
              <td><button onClick={(e) => {delDose(e,element["dose_number"])}}>-</button></td>
            </tr>
          );
        })}
        {doses.length < 4 && <tr>
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
            <input type="datetime-local" name="dose_deadline" id="dose_deadline" onChange={handleChange}></input>
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
  );*/

  return (
    <div className='ap-history2'>
      <table>
      <tr>
        {<th>ΑΡΙΘΜΟΣ ΔΟΣΗΣ</th>}
        {doses.length > 1 ? <th>ΣΥΝΟΛΙΚΟ ΠΟΣΟ ΔΟΣΗΣ</th> : <th>ΣΥΝΟΛΙΚΟ ΠΟΣΟ</th>}
        <th>ΠΛΗΡΩΘΕΝ ΠΟΣΟ</th>
        {doses.length > 1 ? <th>ΠΡΟΘΕΣΜΙΑ ΕΞΟΦΛΗΣΗΣ ΔΟΣΗΣ</th> : <th>ΠΡΟΘΕΣΜΙΑ ΕΞΟΦΛΗΣΗΣ</th>}
        <th>ΗΜΕΡΟΜΗΝΙΑ ΕΞΟΦΛΗΣΗΣ</th>
        <th>ΜΕΘΟΔΟΣ ΠΛΗΡΩΜΗΣ</th>
        </tr>
        {doses.map((element, i) => {
          return (
            <tr>
              {Object.keys(element).map((key) => {
                if (key.includes("date") || key.includes("dose_deadline"))
                return <td onDoubleClick={(e) => {handleUpdate(e, key, i)}}>{dicto.hasOwnProperty(key) && (stat[i].hasOwnProperty(key) ? <MultiCompDose x={key} fun={setUpdDose} c={updDose} idx={i}/> : timeConverter(element[key]))}</td>
                else
                return <td onDoubleClick={(e) => {handleUpdate(e, key, i)}}>{dicto.hasOwnProperty(key) && (stat[i].hasOwnProperty(key) ? <MultiCompDose x={key} fun={setUpdDose} c={updDose} idx={i} /> : element[key])}</td>
              })}
            </tr>
          );
        })}
      </table>
      <div className='static-info-button'>
        <button onClick={handleSubmit} className="choice-btn3">ΑΛΛΑΓΗ</button>
      </div>
    </div>
  );
}
