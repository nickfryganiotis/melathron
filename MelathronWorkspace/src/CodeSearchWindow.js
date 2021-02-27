import React, { useEffect, useState } from "react";
import CustomerInfo from "./CustomerInfo";

export default function CodeSearchWindow() {
  const [customerOptions, setCustomerOptions] = useState({});

  async function readCustomerOptions() {
    let x = JSON.parse(localStorage.getItem("spcode_search"));
    return x;
  }

  async function customerOptionsSet() {
    let y = await readCustomerOptions();
    setCustomerOptions(y);
    console.log(customerOptions['spcode'])
  }

  useEffect(() => {
    customerOptionsSet();
    console.log(customerOptions['spcode'])
  }, []);


  return(
  <div>
     {customerOptions['spcode'] && <CustomerInfo sp={customerOptions['spcode']}/>} 
  </div>)
}
