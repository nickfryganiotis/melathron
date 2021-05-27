import axios from "axios";
import React, { useState, useEffect } from "react";
import { loadAreaChoice } from "../helperFunctions";
import "../MyUserForm";

export default function LocationsPage() {
  const [locs, setLocs] = useState([]);
  const [areaChoice, setAreaChoice] = useState({});

  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    //loadAreaChoice(setAreaChoice);
    let locations_options = {
      method: "post",
      url: "http://localhost:5000/locations",
      data: { country_id: area["country_id"] },
    };
    axios(locations_options)
      .then((res) => {
        setLocs(res.data);
      })
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
              <th>ΝΟΜΟΣ/ΠΟΛΙΤΕΙΑ</th>
              <th>ΠΟΛΗ</th>
              <th>ΠΕΡΙΟΧΗ</th>
            </tr>
            {locs.map((element) => {
              return (
                <tr>
                  <td>{element["location_id"]}</td>
                  <td>{element["state"]}</td>
                  <td>{element["city"]}</td>
                  <td>{element["area"]}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );

}
