import React, { useState, useRef } from "react";
import axios from "axios";
import PelatesToPrint from "./PelatesToPrint";
import LabelsToPrint from "./LabelsToPrint";
import {useReactToPrint} from "react-to-print"
//import "./pelateskartela.css"

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

  const componentRef = useRef();
  const printCustomers = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
    <button onClick={printCustomers}>
      ΕΚΤΥΠΩΣΗ
    </button>
    <div ref={componentRef}>
    {(customers.length !== 0) && customers.map((customer, idx) => {
      return(

        <LabelsToPrint customer={customer}/>

      )
    } 

)}
</div>
    </>
  )
}
