import React, { useState, useEffect } from "react";
import "./pelateskartela.css";
import axios from 'axios'
export default function PelatesToPrint({spcodes}) {
  const [customers, setCustomers] = useState([]);


  useEffect(() =>{
    spcodes.forEach((spcode)=>{
      let lbl_options = {
        method: "post",
        url: "http://localhost:5000/labels",
        data: {spcode : spcode}
      }
      axios(lbl_options).then((res)=>{
        setCustomers([...customers, res.data[0]])
      }).catch((error) => console.log(error))
    })
    console.log(customers)
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
if (customers.length !== 0){
  return (
    <div className='all'>
      {splitArray(customers, 3).map((customer3) => {
        return(
          <div className='row cus'>
            {customer3.map((customer) => {
              return(
                <div className='column'>
                  <div className="bigr">
                    {customer["company_name"]}
                    </div>
                <div className="bigr">
                  {customer["address_street"]}{" "}{customer["address_number"]}
                </div>
                <div className="bigr">
                  {customer["address_postal_code"]}{"   "}{customer["city"]}
                </div>
                <div className="bigr">
                  {customer["country_name"]}
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
else{
  return null
}

}
