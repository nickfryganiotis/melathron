import axios from "axios";
import { React, useEffect, useState } from "react";
import {
  timeConverter,
  makeToUnique,
  arrayToOption,
  deleteCommon,
} from "../helperFunctions";

export default function ApHistory({ apHistory, spcode }) {
  const [apotelesmata, setApotelesmata] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [newAp, setNewAp] = useState({});
  const [aps, setAps] = useState([]);
  const [updAp, setUpdAp] = useState({});
  const [status, setStatus] = useState(-1);

  useEffect(() => {
    //let area = JSON.parse(localStorage.getItem("area_choice"));
    let area = window.require("electron").remote.getGlobal("contexts").areaChoice;
    setNewAp({ ...newAp, continent_id: area["continent_id"], spcode: spcode });
    let apotelesmata_options = {
      method: "post",
      url: "http://localhost:5000/apotelesmata",
      data: { continent_id: area["continent_id"] },
    };
    let salesmen_options = {
      method: "get",
      url: "http://localhost:5000/salesman",
    };
    axios
      .all([axios(apotelesmata_options), axios(salesmen_options)])
      .then(
        axios.spread((obj1, obj2) => {
          setApotelesmata(obj1.data);
          setSalesmen(obj2.data);
          console.log(obj1, obj2)
        })
      )
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setAps([...apHistory]);
  }, [apHistory]);

  function newApotelesma(e) {
    e.preventDefault();
    console.log(newAp);
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

  function handleApotelesmaChange(e) {
    const { value, name } = e.target;
    setUpdAp({ ...updAp, [name]: value });
  }

  function showDropdown(e, dat) {
    let row_id = e.target.parentNode.id;
    if (status == row_id) {
      setStatus(-1);
      setUpdAp({});
    } else {
      setStatus(row_id);
      setUpdAp({
        instance_date: Date.parse(dat["instance_date"]),
        apotelesma_name: dat["apotelesma_name"],
        subapotelesma_name: dat["subapotelesma_name"],
        salesman_name: dat["salesman_name"],
      });
    }
  }

  function delApotelesma(e, i, ap, subap, insd, sname) {
    e.preventDefault();
    let x = [...aps];
    x.splice(i, 1);
    setAps(x);
    let delap_options = {
      method: "post",
      url: "http://localhost:5000/delete_apotelesma",
      data: {
        spcode: spcode,
        apotelesma_name: ap,
        subapotelesma_name: subap,
        continent_id: newAp["continent_id"],
        instance_date: insd,
        salesman_name: sname
      },
    };
    axios(delap_options)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  function updApotelesma(e) {
    e.preventDefault();
    console.log(updAp);
    let upd_options = {
      method: "post",
      url: "http://localhost:5000/update_apotelesma",
      data: { ...updAp, spcode: spcode, continent_id: newAp["continent_id"] },
    };
    axios(upd_options)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  return (
    <div className="ap-history">
      <table>
        <tr>
          <th>Ημερομηνία Αλλαγής</th>
          <th>Πωλητής</th>
          <th>Γενική Κατηγορία Αποτελέσματος</th>
          <th>Αποτέλεσμα</th>
        </tr>
        {aps.map((element, i) => {
          return (
            <tr
              id={i}
              onDoubleClick={(e) => {
                showDropdown(e, element);
              }}
            >
              <td>{timeConverter(element["instance_date"])}</td>
              <td>
                {(status != i && element["salesman_name"]) ||
                  (status == i && (
                    <select
                      name="salesman_name"
                      id="salesman_name"
                      onChange={(e) => {
                        handleApotelesmaChange(e, element["salesman_name"]);
                      }}
                    >
                      <option selected>{element["salesman_name"]}</option>
                      {makeToUnique(salesmen, "salesman_name", updAp).map(
                        arrayToOption
                      )}
                    </select>
                  ))}
              </td>
              <td>
                {(status != i && element["apotelesma_name"]) ||
                  (status == i && (
                    <select
                      name="apotelesma_name"
                      id="apotelesma_name"
                      onChange={(e) => {
                        handleApotelesmaChange(e, element["instance_date"]);
                      }}
                    >
                      <option selected>{element["apotelesma_name"]}</option>
                      <option>{null}</option>
                      {makeToUnique(apotelesmata, "apotelesma_name", updAp).map(
                        arrayToOption
                      )}
                    </select>
                  ))}
              </td>
              <td>
                {(status != i && element["subapotelesma_name"]) ||
                  (status == i && (
                    <select
                      name="subapotelesma_name"
                      id="subapotelesma_name"
                      onChange={(e) => {
                        handleApotelesmaChange(e, element["instance_date"]);
                      }}
                    >
                      <option>{element["subapotelesma_name"]}</option>
                      <option>{null}</option>
                      {makeToUnique(
                        apotelesmata,
                        "subapotelesma_name",
                        updAp,
                        "apotelesma_name"
                      ).map(arrayToOption)}
                    </select>
                  ))}
              </td>
              <td>
                <button
                  onClick={(e) =>
                    delApotelesma(
                      e,
                      i,
                      element["apotelesma_name"],
                      element["subapotelesma_name"],
                      Date.parse(element["instance_date"]),
                      element["salesman_name"]
                    )
                  }
                  className="btn-plus2"
                >
                  -
                </button>
                {status == i && <button onClick={updApotelesma}>ΑΛΛΑΓΗ</button>}
              </td>
            </tr>
          );
        })}
        <tr>
          <td>-</td>
          <td>
            <select
              name="salesman_name"
              id="salesman_name"
              onChange={handleApChange}
              className="search-select"
            >
              <option>{null}</option>
              {makeToUnique(salesmen, "salesman_name", newAp).map(
                arrayToOption
              )}
            </select>
          </td>
          <td>
            <select
              name="apotelesma_name"
              id="apotelesma_name"
              onChange={handleApChange}
              className="search-select"
            >
              <option>{null}</option>
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
              className="search-select"
            >
              <option>{null}</option>
              {makeToUnique(
                apotelesmata,
                "subapotelesma_name",
                newAp,
                "apotelesma_name"
              ).map(arrayToOption)}
            </select>
          </td>
          <td>
            <button onClick={newApotelesma} className="btn-plus2">
              +
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}
