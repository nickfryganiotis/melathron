import React, { useState, useEffect } from "react";
import {
  loadAreaChoice,
  makeToUnique,
  arrayToOption,
} from "../helperFunctions";
import axios from "axios";

export default function MultiCompSale({ x, fun, c }) {
  const [areaChoice, setAreaChoice] = useState({});
  const [shippingMethods, setShippingMethods] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [salesman, setSalesman] = useState([]);

  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    loadAreaChoice(setAreaChoice);
    let url1 = "http://localhost:5000/shipping_methods";
    let subscriptions_options = {
      method: "post",
      url: "http://localhost:5000/subscriptions",
      data: { country_id: area["country_id"] },
    };
    let url3 = "http://localhost:5000/salesman";
    axios
      .all([axios.get(url1), axios(subscriptions_options), axios.get(url3)])
      .then(
        axios.spread((obj1, obj2, obj3) => {
          setShippingMethods(obj1.data);
          setSubscriptions(obj2.data);
          setSalesman(obj3.data);
        })
      )
      .catch((error) => console.log(error));
  }, []);

  function handleChange(e) {
    e.preventDefault();
    const { value, name } = e.target;
    fun({ ...c, [name]: value });
  }

  const date_list = ["order_date"];
  const number_list = ["total_amount", "spcode"];
  const text_list = ["voucher"];

  if (date_list.includes(x))
    return <input type="datetime-local" name={x} id={x} onChange={handleChange}></input>;
  else if (number_list.includes(x))
    return (
      <input type="number" name={x} id={x} onChange={handleChange}></input>
    );
  else if (text_list.includes(x))
    return <input type="text" name={x} id={x} onChange={handleChange}></input>;
  else if (x == "shipping_method_name")
    return (
      <select
        name="shipping_method_id"
        id="shipping_method_id"
        onChange={handleChange}
      >
        <option></option>
        {/*makeToUnique(categories, "category_name", c).map(arrayToOption)*/}
        {shippingMethods.map((element) => (
          <option value={element["shipping_method_id"]}>
            {" "}
            {element["shipping_method_name"]}{" "}
          </option>
        ))}
      </select>
    );
  else if (x == "subscription_category")
    return (
      <select
        name="subscription_category"
        id="subscription_category"
        onChange={handleChange}
      >
        {makeToUnique(subscriptions, "subscription_category", c).map(
          arrayToOption
        )}
      </select>
    );
  else if (x == "subscription_name")
    return (
      <select
        name="subscription_name"
        id="subscription_name"
        onChange={handleChange}
      >
        {makeToUnique(
          subscriptions,
          "subscription_name",
          c,
          "subscription_category"
        ).map(arrayToOption)}
      </select>
    );
    else if (x == "salesman_name")
    return (
      <select name="salesman_id" id="salesman_name" onChange={handleChange}>
        {salesman.map((element) => (
          <option value={element["salesman_id"]}>
            {element["salesman_name"]}
          </option>
        ))}
      </select>
    )
}
