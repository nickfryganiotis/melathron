import axios from "axios";
import React, { useEffect, useState, useRef} from "react";
import ApHistory from "./customerInfoComponents/ApHistory";
import MobilesInfo from "./customerInfoComponents/MobilesInfo";
import PhonesInfo from "./customerInfoComponents/PhonesInfo";
import SalesMade from "./customerInfoComponents/SalesMade";
import SalesmenInfo from "./customerInfoComponents/SalesmenInfo";
import StaticInfo from "./customerInfoComponents/StaticInfo";
import BioHistory from "./customerInfoComponents/BioHistory"
import "./info.css";


export default function CustomerInfo({ sp }) {
  const [customer, setCustomer] = useState([]);
  const [hist, setHist] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [sales, setSales] = useState([]);
  const [phones, setPhones] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [biohist, setBiohist] = useState([])
  const [adminPriv, setAdminPriv] = useState(true);
  const remote = window.require('electron').remote;


  useEffect(() => {
    let url = "http://localhost:5000/customer_info";
    let opts = {
      method: "post",
      url: url,
      data: { spcode: sp },
    };
    axios(opts)
      .then((response) => {
        setCustomer(response.data[0]);
        setHist(response.data[1]);
        setSalesmen(response.data[2]);
        setSales(response.data[3]);
        setPhones(response.data[4]);
        setMobiles(response.data[5]);
        setBiohist(response.data[6])
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      setAdminPriv(window.require("electron").remote.getGlobal("contexts").isAdmin)
  }, []);

  function delCustomer(){
    if (window.confirm('Πρόκειται να διαγράψετε αυτόν τον πελάτη. Είστε σίγουροι ότι θέλετε να συνεχίσετε ;')) {
    let deloptions = {
      method: "post",
      url: "http://localhost:3000/delete_customer",
      data: {"spcode" : sp}
    }
    axios(deloptions).then((res) => console.log(res)).catch((err) => console.log(err))
    alert("Ο πελάτης διαγράφθηκε επιτυχώς.")
    remote.getCurrentWindow().reload()
  }
  else{
    console.log("Aborteeeed")
  }
}

  return (
    <>
   <div className='customerMatrixColumn'>
      <div className='customerMatrix'>
        <div className='customerMatrixColumn2'>
        {<StaticInfo customer={customer[0]}/>}
        </div>
        <div className='customerMatrixColumn2'>
          {<ApHistory apHistory={hist} spcode={sp} />}
          {<BioHistory bioHistory={biohist} spcode={sp} />}
          <div className='customerMatrixRow'>
            {<SalesmenInfo salesmenn={salesmen} spcode={sp} />}
            {<MobilesInfo mobiless={mobiles} spcode={sp} />}
            {<PhonesInfo phoness={phones} spcode={sp} />}
          </div>
        </div>
      </div>
      {<SalesMade sales={sales} />}
      { adminPriv && <button onClick={delCustomer}>ΔΙΑΓΡΑΦΗ</button>}
      </div>
    </>
  );
}
