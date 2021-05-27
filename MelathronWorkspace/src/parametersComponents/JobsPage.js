import axios from "axios";
import React, { useState, useEffect } from "react";

export default function LocationsPage() {
  const [professions, setProfessions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
    .all([
      axios.get("http://localhost:5000/categories"),
      axios.get("http://localhost:5000/professions"),
    ])
      .then(axios.spread((obj1, obj2) => {
        setCategories(obj1.data);
        setProfessions(obj2.data);
        console.log(obj2.data)
      }))
      .catch((error) => {
        console.log(error);
      });
  }, []);

    return (
      <div className="total-main-page2">
        <div className="user-form2">
        <table>
          <tr>
            <th>ΚΩΔΙΚΟΣ</th>
            <th>ΚΑΤΗΓΟΡΙΑ ΕΠΑΓΓΕΛΜΑΤΟΣ</th>
          </tr>
          {categories.map((element) => {
            return (
              <tr>
                <td>{element["category_id"]}</td>
                <td>{element["category_name"]}</td>
              </tr>
            );
          })}
        </table>
        <table>
          <tr>
            <th>ΚΩΔΙΚΟΣ</th>
            <th>ΕΠΑΓΓΕΛΜΑ</th>
          </tr>
          {professions.map((element) => {
            return (
              <tr>
                <td>{element["profession_id"]}</td>
                <td>{element["profession_name"]}</td>
              </tr>
            );
          })}
        </table>
      </div>
      </div>
    );

}
