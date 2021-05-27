import axios from "axios";
import React, { useState, useEffect } from "react";

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState([])

    useEffect(() => {
        let area = JSON.parse(localStorage.getItem("area_choice"));
        //loadAreaChoice(setAreaChoice);
        let subscriptions_options = {
          method: "post",
          url: "http://localhost:5000/subscriptions",
          data: { country_id: area["country_id"] },
        };
        axios(subscriptions_options)
          .then((res) => {
            setSubscriptions(res.data);
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
            <th>ΚΑΤΗΓΟΡΙΑ ΣΥΝΔΡΟΜΗΣ</th>
            <th>ΣΥΝΔΡΟΜΗ</th>
          </tr>
          {subscriptions.map((element) => {
            return (
              <tr>
                <td>{element["subscription_id"]}</td>
                <td>{element["subscription_category"]}</td>
                <td>{element["subscription_name"]}</td>
              </tr>
            );
          })}
        </table>
      </div>
      </div>
    );

}
