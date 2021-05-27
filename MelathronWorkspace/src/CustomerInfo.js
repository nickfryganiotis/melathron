import axios from "axios";
import React, { useEffect, useState } from "react";
import ApHistory from "./customerInfoComponents/ApHistory";
import MobilesInfo from "./customerInfoComponents/MobilesInfo";
import PhonesInfo from "./customerInfoComponents/PhonesInfo";
import SalesMade from "./customerInfoComponents/SalesMade";
import SalesmenInfo from "./customerInfoComponents/SalesmenInfo";
import StaticInfo from "./customerInfoComponents/StaticInfo";
import "./info.css";
export default function CustomerInfo({ sp }) {
  const [customer, setCustomer] = useState([]);
  const [hist, setHist] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [sales, setSales] = useState([]);
  const [phones, setPhones] = useState([]);
  const [mobiles, setMobiles] = useState([]);

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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <div className='customerMatrixColumn'>
      <div className='customerMatrix'>
        <div className='customerMatrixColumn2'>
        {<StaticInfo customer={customer[0]}/>}
        </div>
        <div className='customerMatrixColumn2'>
          {<ApHistory apHistory={hist} spcode={sp} />}
          <div className='customerMatrixRow'>
            {<SalesmenInfo salesmenn={salesmen} spcode={sp} />}
            {<MobilesInfo mobiless={mobiles} spcode={sp} />}
            {<PhonesInfo phoness={phones} spcode={sp} />}
          </div>
        </div>
      </div>
      {<SalesMade sales={sales} />}
    </div>
    </>
  );
}
