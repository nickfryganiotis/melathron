import React, { useState, useRef } from "react";
import axios from "axios";
import PelatesToPrint from "./PelatesToPrint";
import LabelsToPrint from "./LabelsToPrint";
import {useReactToPrint} from "react-to-print"
import {timeConverter} from "../helperFunctions"
import SpecialKartela from "./SpecialKartela";
//import "./pelateskartela.css"

export default function PelatesKartela() {
  const [spcodes, setSpcodes] = useState([])


  const ipc = window.require("electron").ipcRenderer;
  ipc.on("spcodes-to-print", (event, message) => {
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
    <style type="text/css" media="print">{"\
          @page { size: a4; }\
        "}</style>
    {(spcodes.length !== 0) && spcodes.map((spcode) => {
      return(
        <div>
        <PelatesToPrint sp={spcode}/>
      </div>
      )
    } 

)}
</div>
    </>
  )
}
