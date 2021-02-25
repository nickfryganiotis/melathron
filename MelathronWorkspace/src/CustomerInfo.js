import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function CustomerInfo({sp}){
    const [customer, setCustomer] = useState([])

    useEffect( () => {
        let url = "http://localhost:5000/customer_info";
        let opts = {
            method: "post",
            url: url,
            data: { spcode : sp},
          };
        axios(opts)
        .then((response) => {
            setCustomer(response.data)
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])


    return(
        <div>
            <pre>{JSON.stringify(customer, null, 2) }</pre>
        </div>
    )
}