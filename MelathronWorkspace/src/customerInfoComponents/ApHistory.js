import axios from "axios";
import { React, useEffect, useState } from "react";
import { timeConverter, makeToUnique, arrayToOption } from "../helperFunctions";

export default function ApHistory({ apHistory, spcode }) {
  const [apotelesmata, setApotelesmata] = useState([]);
  const [newAp, setNewAp] = useState({});
  const [aps, setAps] = useState([])

  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    setNewAp({...newAp , continent_id : area["continent_id"], spcode:spcode})
    //setAps(apHistory)
    let apotelesmata_options = {
      method: "post",
      url: "http://localhost:5000/apotelesmata",
      data: { continent_id: area["continent_id"] },
    };
    axios(apotelesmata_options)
      .then((res) => setApotelesmata(res.data))
      .catch((error) => console.log(error));
  }, []);

  function newApotelesma(e) {
    e.preventDefault();
    console.log(newAp)
    let ap_options = {
      method: "post",
      url: "http://localhost:5000/add_apotelesma",
      data: newAp,
    };
    axios(ap_options)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  function handleApChange(e) {
    const { value, name } = e.target;
    setNewAp({ ...newAp, [name]: value });
  }

  function delApotelesma(e, i, ap, subap, insd){
    e.preventDefault()
    let x = [...aps]
    x.splice(i,1)
    setAps(x)
    let delap_options = {
      method:"post",
      url : "http://localhost:5000/delete_apotelesma",
      data: {spcode:spcode, apotelesma_name : ap, subapotelesma_name: subap, continent_id : newAp['continent_id'], instance_date: insd }
    }
    axios(delap_options).then((res)=>console.log(res)).catch((error) => console.log(error))
  }

  return (
    <div>
      <table>
        <tr>
          <th>Ημερομηνία Αλλαγής</th>
          <th>Γενική Κατηγορία Αποτελέσματος</th>
          <th>Αποτέλεσμα</th>
        </tr>
        {apHistory.map((element, i) => {
          return (
            <tr>
              <td>{timeConverter(element["instance_date"])}</td>
              <td>{element["apotelesma_name"]}</td>
              <td>{element["subapotelesma_name"]}</td>
              <td>
                <button onClick={(e) => delApotelesma(e,i, element["apotelesma_name"], element["subapotelesma_name"], Date.parse(element["instance_date"]) )}>-</button>
                <button>ΑΛΛΑΓΗ</button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td>-</td>
          <td>
            {" "}
            <select
              name="apotelesma_name"
              id="apotelesma_name"
              onChange={handleApChange}
            >
              <option></option>
              {makeToUnique(apotelesmata, "apotelesma_name", newAp).map(
                arrayToOption
              )}
            </select>
          </td>
          <td>
            <select
              name="subapotelesma_name"
              id="subapotelesma_name"
              onChange={handleApChange}
            >
              <option></option>
              {makeToUnique(
                apotelesmata,
                "subapotelesma_name",
                newAp,
                "apotelesma_name"
              ).map(arrayToOption)}
            </select>
          </td>
        </tr>
      </table>
      <button onClick={newApotelesma}>+</button>
    </div>
  );
}
