import axios from "axios";
import React, { useState, useEffect } from "react";
import MultiComp from "./MultiComp";

export default function StaticInfo({ customer }) {
  const [dicto, setDicto] = useState({
    first_name: "ΟΝΟΜΑ",
    last_name: "ΕΠΩΝΥΜΟ",
    fathers_name: "ΠΑΤΡΩΝΥΜΟ",
    company_name: "ΕΠΩΝΥΜΙΑ ΕΤΑΙΡΙΑΣ",
    personnel: "ΔΥΝΑΜΙΚΟ",
    fax: "FAX",
    email: "EMAIL",
    website: "ΙΣΤΟΣΕΛΙΔΑ",
    address_street: "ΟΔΟΣ",
    address_number: "ΑΡΙΘΜΟΣ",
    address_postal_code: "ΤΚ",
    comments: "ΣΧΟΛΙΑ",
    state: "ΝΟΜΟΣ/ΠΟΛΙΤΕΙΑ",
    city: "ΠΟΛΗ",
    area: "ΠΕΡΙΟΧΗ",
    apotelesma_name: "ΚΑΤΗΓΟΡΙΑ ΑΠΟΤΕΛΕΣΜΑΤΟΣ",
    subapotelesma_name: "ΑΠΟΤΕΛΕΣΜΑ",
    category_name: "ΚΑΤΗΓΟΡΙΑ ΕΠΑΓΓΕΛΜΑΤΟΣ",
    profession_name: "ΕΠΑΓΓΕΛΜΑ",
  });
  const [status, setStatus] = useState({});
  const [cust, setCust] = useState({});
  const [newCustomer, setNewCustomer] = useState({});
  const [area, setArea] = useState({});

  useEffect(()=>{
    let ar = JSON.parse(localStorage.getItem("area_choice"));
    setArea({...ar})
    setCust({...customer})
  }, [customer])

  function handleUpdate(e, key) {
    //let row_id = e.target.parentNode.id
    if(!status.hasOwnProperty(key) ){

      if (key =="category_name" || key=="profession_name"){
        setStatus({...status, "category_name":"category_name", "profession_name":"profession_name"})
      }
      else if (key=="state" || key=="city" || key=="area"){
        setStatus({...status, "state":"state", "city":"city", "area":"area"})
      }
      else if (key=="apotelesma_name" || key=="subapotelesma_name"){
        ;
      }
      else setStatus({ ...status, [key]: [key] })
    }
    else{
      let x = status;
      if (key =="category_name" || key=="profession_name"){
        delete x["category_name"];
        delete x["profession_name"];
        setStatus({...x})
      }
      else if (key=="state" || key=="city" || key=="area"){
        delete x["state"];
        delete x["city"];
        delete x["area"];
        setStatus({...x});
      }
      else if (key=="apotelesma_name" || key=="subapotelesma_name"){
        ;
      }
      else{
      delete x[key];
      setStatus({...x})}
      
    }
  }

  function submitChange(){
    let udp_options = {
      method: "post",
      url: "http://localhost:5000/update_customer",
      data : {...newCustomer, spcode : cust["spcode"], country_id : area["country_id"], continent_id: area["continent_id"]}
    }
    console.log(newCustomer)
    axios(udp_options).then((res)=>console.log(res)).catch((error) => console.log(error))
  }


  return (
    <div className='static-info'>
    <table>
      {Object.keys(cust).map((key) => { return (
        <tr onDoubleClick={(e) => {handleUpdate(e, key)}}>
          <th>{dicto.hasOwnProperty(key) && dicto[key]}</th>
          <td>{dicto.hasOwnProperty(key) && (status.hasOwnProperty(key) ? <MultiComp x={key} fun={setNewCustomer} c={newCustomer} /> : cust[key])}</td>
        </tr>
      )
      })}
    </table>
    <div className='static-info-button'>{newCustomer !== {} && <button onClick={submitChange} className="choice-btn3">ΑΛΛΑΓΗ</button>}</div>
    </div>
  );
}
