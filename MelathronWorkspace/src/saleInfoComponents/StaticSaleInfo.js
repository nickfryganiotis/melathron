import React, { useEffect, useState } from 'react'
import MultiCompSale from './MultiCompSale'
import axios from 'axios'
import {timeConverter} from '../helperFunctions';

export default function StaticSaleInfo({ssale, sale_id}){

    const [sale, setSale] = useState({});
    const [stat, setStat] = useState({});
    const [newSale, setNewSale] = useState({});
    const [area, setArea] = useState({});
    const [dicto, setDicto] = useState({
        "order_date" : "ΗΜΕΡΟΜΗΝΙΑ ΠΑΡΑΓΓΕΛΙΑΣ",
        "total_amount" : "ΣΥΝΟΛΙΚΟ ΠΟΣΟ ΠΛΗΡΩΜΗΣ",
        "shipping_method_name" : "ΤΡΟΠΟΣ ΠΑΡΑΔΟΣΗΣ",
        "voucher" : "VOUCHER",
        "number_of_doses" : "ΑΡΙΘΜΟΣ ΔΟΣΕΩΝ",
        "paid" : "ΕΞΟΦΛΗΜΕΝΗ",
        "spcode" : "ΚΩΔΙΚΟΣ ΠΕΛΑΤΗ",
        "subscription_category" : "ΚΑΤΗΓΟΡΙΑ ΣΥΝΔΡΟΜΗΣ",
        "subscription_name" : "ΣΥΝΔΡΟΜΗ",
        "salesman_name" : "ΠΩΛΗΤΗΣ"
      });

    useEffect( () => {
        setSale({...ssale})
        let ar = JSON.parse(localStorage.getItem("area_choice"));
        setArea({...ar})
    }, [ssale])

    function handleUpdate(e, key) {
        //let row_id = e.target.parentNode.id
        if(!stat.hasOwnProperty(key) ){
    
          if (key =="subscription_category" || key=="subscription_name"){
            setStat({...stat, "subscription_category":"subscription_category", "subscription_name":"subscription_name"})
          }
          else if (key=="number_of_doses" || key=="paid"){
            ;
          }
          else setStat({ ...stat, [key]: [key] })
        }
        else{
          let x = stat;
          if (key =="subscription_category" || key=="subscription_name"){
            delete x["subscription_category"];
            delete x["subscription_name"];
            setStat({...x})
          }
          else if (key=="number_of_doses" || key=="paid"){
            ;
          }
          else{
          delete x[key];
          setStat({...x})}
          
        }
      }

    function submitChange(){
        let udp_options = {
          method: "post",
          url: "http://localhost:5000/update_sale",
          data : {...newSale, sale_id : sale["sale_id"], country_id : area["country_id"], continent_id: area["continent_id"]}
        }
        console.log(newSale)
        axios(udp_options).then((res)=>console.log(res)).catch((error) => console.log(error))
      }

    return(
    <div className='static-info'>
    <table className='sales-info-table'>
      {Object.keys(sale).map((key) => { if (key == "order_date") return(        
      
        <tr onDoubleClick={(e) => {handleUpdate(e, key)}}>
          <th>{dicto.hasOwnProperty(key) && dicto[key]}</th>
          <td>{dicto.hasOwnProperty(key) && (stat.hasOwnProperty(key) ? <MultiCompSale x={key} fun={setNewSale} c={newSale} /> : timeConverter(sale[key]))}</td>
        </tr>)
      else return (
        <tr onDoubleClick={(e) => {handleUpdate(e, key)}}>
          <th>{dicto.hasOwnProperty(key) && dicto[key]}</th>
          <td>{dicto.hasOwnProperty(key) && (stat.hasOwnProperty(key) ? <MultiCompSale x={key} fun={setNewSale} c={newSale} /> : sale[key])}</td>
        </tr>
      )
      })}
    </table>
    <div className='static-info-button'>{newSale !== {} && <button onClick={submitChange} className="choice-btn3">ΑΛΛΑΓΗ</button>}</div>
    </div>
    )
}
