import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeToUnique, arrayToOption } from "../helperFunctions";

export default function MultiComp({ x, fun, c }) {
  const [locations, setLocations] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    let locations_options = {
      method: "post",
      url: "http://localhost:5000/locations",
      data: { country_id: area["country_id"] },
    };
    let professions_options = "http://localhost:5000/professions";
    let categories_options = "http://localhost:5000/categories";
    axios
      .all([axios(locations_options), axios.get(professions_options), axios.get(categories_options)])
      .then(
        axios.spread((obj1, obj2, obj3) => {
          setLocations(obj1.data);
          setProfessions(obj2.data);
          setCategories(obj3.data);
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
    else if (x== "category_name")
    return (
        <select name="category_id" id="category_id" onChange={handleChange}>
        <option></option>
        {/*makeToUnique(categories, "category_name", c).map(arrayToOption)*/}
        {categories.map((element) => <option value={element["category_id"]}> {element["category_name"]} </option>)}
      </select>
    )
    else if (x == "profession_name")
    return (
        <select
        name="profession_id"
        id="profession_id"
        onChange={handleChange}
      >
        <option></option>
        {/*makeToUnique(professions, "profession_name", c).map(
          arrayToOption
        )*/}
        {professions.map((element) => <option value={element["profession_id"]}> {element["profession_name"]} </option>)}
      </select>
    )
    else return null
}
