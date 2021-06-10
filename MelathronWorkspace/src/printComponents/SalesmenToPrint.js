import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import SalesToPrint from "./SalesToPrint";
import SalesMade from "../customerInfoComponents/SalesMade";

export default function SalesmenToPrint() {
  const [saleids, setSaleids] = useState([]);
  const [sal, setSal] = useState({});
  const ipc = window.require("electron").ipcRenderer;
  ipc.on("saleids-to-print", (event, message) => {
    setSaleids(message);
  });

  useEffect(() => {
    let x = {}
    for(const sale of saleids){
        if (x.hasOwnProperty(sale["salesman_name"])){
            x[sale["salesman_name"]].push(sale["sale_id"])
        }
        else {
            x[sale["salesman_name"]] = [sale["sale_id"]]
        }
    }
    setSal(x)
  }, [saleids]);

  const componentRef = useRef();
  const printCustomers = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <button onClick={printCustomers}>ΕΚΤΥΠΩΣΗ</button>
      <div ref={componentRef}>
        {Object.keys(sal).map((key) => <SalesToPrint sale_ids={sal[key]} salesman_name={key} />)}
      </div>
    </>
  );
}
