import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ApotelesmataPage() {
    const [apotelesmata, setApotelesmata] = useState([])

    useEffect(() => {
        let area = JSON.parse(localStorage.getItem("area_choice"));
        //loadAreaChoice(setAreaChoice);
        let apotelesmata_options = {
          method: "post",
          url: "http://localhost:5000/apotelesmata",
          data: { continent_id: area["continent_id"] },
        };
        axios(apotelesmata_options)
          .then((res) => {
            setApotelesmata(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    return (
      <div>
        <table>
          <tr>
            <th>ΚΩΔΙΚΟΣ</th>
            <th>ΚΑΤΗΓΟΡΙΑ ΑΠΟΤΕΛΕΣΜΑΤΟΣ</th>
            <th>ΑΠΟΤΕΛΕΣΜΑ</th>
          </tr>
          {apotelesmata.map((element) => {
            return (
              <tr>
                <td>{element["apotelesma_id"]}</td>
                <td>{element["apotelesma_name"]}</td>
                <td>{element["subapotelesma_name"]}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );

}