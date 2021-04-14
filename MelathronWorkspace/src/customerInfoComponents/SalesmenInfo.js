import axios from "axios";
import { React, useEffect, useState } from "react";

export default function SalesmenInfo({ salesmenn, spcode}) {
  const [salesmen, setSalesmen] = useState([]);
  const [salesman, setSalesman] = useState([]);
  const [addSal, setAddSal] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/salesman")
      .then((res) => setSalesman(res.data))
      .catch((error) => console.log(error));
    setSalesmen(salesmenn)
  }, []);

  function delSalesman(e, id, idx) {
    e.preventDefault();
    let delOptions = {
      method: "post",
      url: "http://localhost:5000/delete_salesman",
      data: { salesman_id: id, spcode: spcode },
    };

    axios(delOptions)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    let sal = [...salesmen];
    sal.splice(idx, 1);
    setSalesmen(sal);
  }

  function handleCustomerChange(e){
    const { value, name } = e.target;
    setAddSal({[name]: value });
  };

  function addSalesman(e){
    e.preventDefault();
    let addOptions = {
      method: "post",
      url: "http://localhost:5000/add_salesman",
      data: { salesman_id: addSal["salesman_name"], spcode: spcode },
    };
    console.log(addSal)
    axios(addOptions)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  return (
    <table>
      <tr>
        <th>Πωλητές</th>
      </tr>
      {salesmenn.map((element, i) => {
        return (
          <tr>
            <td>{element["salesman_name"]}</td>
            <td>
              <button onClick={(e) => delSalesman(e, element["salesman_id"], i)}>
                -
              </button>
            </td>
          </tr>
        );
      })}
      <tr>
        <select
          name="salesman_name"
          id="salesman_name"
          onChange={handleCustomerChange}
        >
          <option></option>
          {salesman.map((element) => <option value={element["salesman_id"]}>{element["salesman_name"]}</option>)}
        </select>
      </tr>
      <button onClick={addSalesman}>+</button>
    </table>
  );
}
