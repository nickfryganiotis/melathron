import React, { useEffect, useState } from "react";
import axios from "axios";
import { getRandomCustomers } from "./helperFunctions";

export default function SalesmanAssignment({ customers }) {
  const [salesmen, setSalesmen] = useState([]);
  //const [customer, setCustomer] = useState([]);
  const [chosenSalesman, setChosenSalesman] = useState(null);
  const [chosenCustomers, setChosenCustomers] = useState([]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/salesman")
      .then((res) => {
        setSalesmen(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /*useEffect(() => {
    setCustomer(customers);
  }, [customers]);*/

  const handleChange = (e) => {
    const { value, name } = e.target;
    setChosenSalesman(value);
  };

  const handleCustomerChange = (e) => {
    const { value, name } = e.target;
    setNum(value);
  };

  const assignSalesman = (e) => {
    e.preventDefault();
    let custs = getRandomCustomers(customers, num);
    let assign_options = {
      method: "post",
      url: "http://localhost:5000/mass_assignment",
      data: { salesman_id: chosenSalesman, spcode: custs },
    };
    console.log(assign_options["data"])
    axios(assign_options)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
      <label htmlFor="salesman_id">ΠΩΛΗΤΗΣ</label>
      <select name="salesman_id" id="salesman_id" onChange={handleChange}>
        <option value={null}></option>
        {salesmen.map((element) => (
          <option value={element["salesman_id"]}>
            {element["salesman_name"]}
          </option>
        ))}
      </select>
      </div>
      <div>
      <label htmlFor="num">ΑΡΙΘΜΟΣ ΠΕΛΑΤΩΝ</label>
      <input
        name="num"
        id="num"
        type="number"
        onChange={handleCustomerChange}
        max={customers.length}
      ></input>
      </div>
      <button onClick={assignSalesman}>ΑΝΑΘΕΣΗ</button>
    </div>
  );
}
