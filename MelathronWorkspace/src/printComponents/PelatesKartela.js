import React, { useState } from "react";
import axios from "axios";
import PelatesToPrint from "./PelatesToPrint";

export default function PelatesKartela() {
  const [customers, setCustomers] = useState([]);

  const ipc = window.require("electron").ipcRenderer;
  ipc.on("spcodes-to-print", (event, message) => {
    if (message.length !== 0) {
      message.forEach((sp) => {
        let url = "http://localhost:5000/customer_info";
        let opts = {
          method: "post",
          url: url,
          data: { spcode: sp },
        };
        axios(opts)
          .then((res) => {
            setCustomers(oldArray => [...oldArray, res.data[0]])
          })
          .catch((error) => alert(error));
      });
    }
  });

  return (
    <>
    {(customers.length !== 0) && customers.map((customer) => 
    <PelatesToPrint customer={customer}/>)}
    </>
  )
}
