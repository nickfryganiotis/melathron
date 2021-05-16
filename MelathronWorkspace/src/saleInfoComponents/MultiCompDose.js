import React from "react";

export default function MultiCompDose({ x, fun, c, idx }) {
  function handleChange(e) {
    e.preventDefault();
    const { value, name } = e.target;
    let k = [...c]
    let m = c[idx]
    m[name] = value
    k[idx] = m
    fun(k);
  }

  const date_list = ["dose_deadline", "payment_date"];
  const number_list = ["dose_amount", "payment_amount"];

  if (date_list.includes(x))
    return (
      <input
        type="datetime-local"
        name={x}
        id={x}
        onChange={handleChange}
      ></input>
    );
  else if (number_list.includes(x))
    return (
      <input type="number" name={x} id={x} onChange={handleChange}></input>
    );
  else if (x == "payment_method")
    return (
      <select name="payment_method" id="payment_method" onChange={handleChange}>
        <option value="Τραπεζική Κατάθεση">Τραπεζική Κατάθεση</option>
        <option value="Μετρητά">Μετρητά</option>
      </select>
    );
  else return null;
}
