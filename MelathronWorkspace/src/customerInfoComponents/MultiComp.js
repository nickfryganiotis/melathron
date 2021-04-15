import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeToUnique, arrayToOption } from "../helperFunctions";

export default function MultiComp({ x, fun, c }) {
  const [locations, setLocations] = useState([]);
  const [professions, setProfessions] = useState([]);
  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    let locations_options = {
      method: "post",
      url: "http://localhost:5000/locations",
      data: { country_id: area["country_id"] },
    };
    let professions_options = "http://localhost:5000/professions";
    axios
      .all([axios(locations_options), axios.get(professions_options)])
      .then(
        axios.spread((obj1, obj2) => {
          setLocations(obj1.data);
          setProfessions(obj2.data);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChange(e) {
    e.preventDefault();
    const { value, name } = e.target;
    fun({ ...c, [name]: value });
  }
  const text_list = [
    "first_name",
    "last_name",
    "fathers_name",
    "company_name",
    "website",
    "email",
    "fax",
    "address_street",
    "address_number",
    "address_postal_code",
    "comments",
  ];
  const number_list = ["personnel"];

  if (text_list.includes(x))
    return <input type="text" name={x} id={x} onChange={handleChange}></input>;
  else if (number_list.includes(x))
    return (
      <input type="number" name={x} id={x} onChange={handleChange}></input>
    );
  else if (x == "state")
    return (
      <select name="state" id="state" onChange={handleChange}>
        <option></option>
        {makeToUnique(locations, "state", c).map(arrayToOption)}
      </select>
    );
  else if (x == "city")
    return (
      <select name="city" id="city" onChange={handleChange}>
        <option></option>
        {makeToUnique(locations, "city", c, "state").map(arrayToOption)}
      </select>
    );
  else if (x == "area")
    return (
      <select name="area" id="area" onChange={handleChange}>
        <option></option>
        {makeToUnique(locations, "area", c, "city").map(arrayToOption)}
      </select>
    );
    else if (x== "category")
    return (
        <select name="category" id="category" onChange={handleChange}>
        <option></option>
        {makeToUnique(professions, "category", c).map(arrayToOption)}
      </select>
    )
    else if (x == "profession")
    return (
        <select
        name="profession"
        id="profession"
        onChange={handleChange}
      >
        <option></option>
        {makeToUnique(professions, "profession", c, "category").map(
          arrayToOption
        )}
      </select>
    )
    else return null
}
