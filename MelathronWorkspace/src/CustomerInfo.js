import axios from "axios";
import React, { useEffect, useState } from "react";
import ApHistory from "./customerInfoComponents/ApHistory";
import SalesMade from "./customerInfoComponents/SalesMade";
import SalesmenInfo from "./customerInfoComponents/SalesmenInfo";
import "./info.css";
export default function CustomerInfo({ sp }) {
  const [customer, setCustomer] = useState([]);
  const [hist, setHist] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    let url = "http://localhost:5000/customer_info";
    let opts = {
      method: "post",
      url: url,
      data: { spcode: sp },
    };
    axios(opts)
      .then((response) => {
        setCustomer(response.data[0]);
        setHist(response.data[1]);
        setSalesmen(response.data[2]);
        setSales(response.data[3]);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {customer.map((element) => {
        return (
          <table className="elli">
            {Object.keys(element).map((key, index) => {
              return (
                <tr>
                  <th>{key}</th>
                  <th>
                    <input type="text" placeholder={element[key]} />
                  </th>
                </tr>
              );
            })}
          </table>
        );
      })}
      { hist.length !== 0 && <ApHistory apHistory={hist} />}

      {<SalesmenInfo salesmenn={salesmen} spcode={sp} />}
      {sales.length !==0 && <SalesMade sales={sales} />}

    </>
  );
}
