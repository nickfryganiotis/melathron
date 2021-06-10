import React, { useState, useRef } from "react";
import {useReactToPrint} from "react-to-print"
import SpecialToPrint from "./SpecialToPrint"
//import "./pelateskartela.css"

export default function SpecialKartela() {
  const [spcodes, setSpcodes] = useState([])


  const ipc = window.require("electron").ipcRenderer;
  ipc.on("special-to-print", (event, message) => {
    setSpcodes(message)
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
    {(spcodes.length !== 0) && spcodes.map((spcode) => {
      return(
        <div>
        <SpecialToPrint sp={spcode}/>
      </div>
      )
    } 

)}
</div>
    </>
  )
}
