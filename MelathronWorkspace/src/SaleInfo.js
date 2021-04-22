import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StaticSaleInfo from './saleInfoComponents/StaticSaleInfo'

export default function SaleInfo({sale_id}){

    const [sale, setSale] = useState({})
    const [doses, setDoses] = useState([])

    useEffect( () => {
        let sale_options = {
            method: "post",
            url: "http://localhost:5000/sale_info",
            data: {"sale_id" : sale_id}
        }

        axios(sale_options).then((res) => {
            setSale(res.data[0]);
            setDoses(res.data[1]);
        })
        .catch((error) => {console.log(error)})
    }, [])

    return(
        <div>
            <StaticSaleInfo ssale = {sale} />
        </div>
    )
}