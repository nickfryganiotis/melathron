import axios from "axios";
import React, { useEffect, useState } from "react";
import ApHistory from "./customerInfoComponents/ApHistory";
import SalesMade from "./customerInfoComponents/SalesMade";
import SalesmenInfo from "./customerInfoComponents/SalesmenInfo";
import StaticInfo from "./customerInfoComponents/StaticInfo";
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
      {<StaticInfo customer={customer[0]}/>}
      {<ApHistory apHistory={hist} spcode={sp} />}
      {<SalesmenInfo salesmenn={salesmen} spcode={sp} />}
      {<SalesMade sales={sales} />}
    </>
  );
}
