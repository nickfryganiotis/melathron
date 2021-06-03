import React, { useState, useEffect } from "react";
import "./pelateskartela.css";
export default function PelatesToPrint({spcodes}) {
  const [customers, setCustomers] = useState([]);
  const [areachoice, setAreachoice] = useState({});

  useEffect(() =>{
    setCustomers(spcodes)
    let x = window.require("electron").remote.getGlobal("contexts").areaChoice
    setAreachoice(x)
  } , [])

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
if (spcodes.length !== 0){
  return (
    <div className='all'>
      {splitArray(spcodes, 3).map((customer3) => {
        return(
          <div className='row cus'>
            {customer3.map((customer) => {
              return(
                <div className='column'>
                  <div>
                    {customer["company_name"]}
                    </div>
                <div>
                  {customer["address_street"]}{" "}{customer["address_number"]}
                </div>
                <div>
                  {customer["address_postal_code"]}&nbsp;{customer["city"]}
                </div>
                <div>
                  {areachoice["country_id"]}
                </div>
              </div>
              )
            })}
            </div>
        )
      } )}
    </div>
  )
    }


}
