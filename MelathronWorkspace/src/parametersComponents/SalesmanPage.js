import axios from "axios";
import React, { useState, useEffect } from "react";

export default function SalesmanPage() {
    const [salesman, setSalesman] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/salesman")
          .then((res) => {
            setSalesman(res.data);
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
            <th>ΠΩΛΗΤΗΣ</th>
          </tr>
          {salesman.map((element) => {
            return (
              <tr>
                <td>{element["salesman_id"]}</td>
                <td>{element["salesman_name"]}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );

}