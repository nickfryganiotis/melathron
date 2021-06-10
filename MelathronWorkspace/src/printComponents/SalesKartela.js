import React, { useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import SalesToPrint from "./SalesToPrint";
import "./salesprint.css";

export default function SalesKartela() {
  const [saleids, setSaleids] = useState([]);

  const ipc = window.require("electron").ipcRenderer;
  ipc.on("saleid-to-print", (event, message) => {
    setSaleids(message);
  });

  const componentRef = useRef();
  const printCustomers = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <button onClick={printCustomers}>ΕΚΤΥΠΩΣΗ</button>
      <div ref={componentRef}>
        <style type="text/css" media="print">{"\
          @page { size: a4 landscape; }\
        "}</style>
        <SalesToPrint sale_ids={saleids} />
      </div>
    </>
  );
}
