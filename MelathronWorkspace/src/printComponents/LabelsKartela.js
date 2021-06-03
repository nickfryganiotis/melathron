import React, { useState, useRef } from "react";
import axios from "axios";
import LabelsToPrint from "./LabelsToPrint";
import {useReactToPrint} from "react-to-print"
//import "./pelateskartela.css"

export default function PelatesKartela() {
  const [spcodes, setSpcodes] = useState([])


  const ipc = window.require("electron").ipcRenderer;
  ipc.on("etiketes-to-print", (event, message) => {
    setSpcodes(message)
  });

  const componentRef = useRef();
  const printCustomers = useReactToPrint({
    content: () => componentRef.current,
  });

  const splitArray = (array, n) => {
    let i, j , temparray
    let resarray = [];
    for (i=0,j=array.length; i<j; i+=n) {
        if(i + n < j)
            temparray = array.slice(i,i+n);
        else
            temparray = array.slice(i, j);
        resarray.push(temparray)
    }
    console.log(resarray)
    return resarray
  }

  return (
    <>
    <button onClick={printCustomers}>
      ΕΚΤΥΠΩΣΗ
    </button>
    <div ref={componentRef}>
    {
        splitArray(spcodes, 27).map((arr) => 
            <LabelsToPrint spcodes={spcodes} />
        )
    }
</div>
    </>
  )
}
