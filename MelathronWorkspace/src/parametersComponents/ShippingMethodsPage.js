import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ShippingMethodsPage() {
    const [shippingMethods, setShippingMethods] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/shipping_methods")
          .then((res) => {
            setShippingMethods(res.data);
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
            <th>ΤΡΟΠΟΣ ΠΑΡΑΔΟΣΗΣ</th>
          </tr>
          {shippingMethods.map((element) => {
            return (
              <tr>
                <td>{element["shipping_method_id"]}</td>
                <td>{element["shipping_method_name"]}</td>
              </tr>
            );
          })}
        </table>
      </div>
      </div>
    );

}
