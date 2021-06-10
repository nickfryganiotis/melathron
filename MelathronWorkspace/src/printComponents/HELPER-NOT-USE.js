import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./pelateskartela.css";
import {timeConverter} from "../helperFunctions"
export default function PelatesToPrint({sp}) {
  const [cust, setCust] = useState({});
  const [sales, setSales] = useState([]);
  const [phones, setPhones] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [apotelesmata, setApotelesmata] = useState([]);
 
  useEffect(() => {
    let opts = {
      method: "post",
      url: "http://localhost:5000/customer_info",
      data: { spcode: sp },
    };
    let opts2= {
      method: "post",
      url: "http://localhost:5000/print_apotelesmata",
      data: { spcode: sp },
    };
    axios.all([axios(opts), axios(opts2)])
      .then(axios.spread((response, obj2) => {
        console.log(response.data)
        setCust(response.data[0][0]);
        setSales(response.data[2]);
        setPhones(response.data[3]);
        setMobiles(response.data[4]);
        setApotelesmata(obj2.data);
        console.log(obj2.data)
      }))
      .catch((error) => console.log(error));
  }, []);


  return (
    <div className='all'>
      <div className='body-a4'>
      <h1 className="headr">ΕΛΛΗΝΙΚΗ&nbsp;ΕΘΝΙΚΗ&nbsp;ΓΡΑΜΜΗ</h1>
      <div className='row'>
        <div className='title'>
          Ονοματεπώνυμο:
        </div>
        <div className='name'>
          {cust["last_name"]} {cust["first_name"]}
        </div>
        <div className='spcode'>
          {cust["spcode"]}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Επωνυμία Επιχείρησης: 
        </div>
        <div className='field'>
          {cust["company_name"]}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Κατηγορία:
        </div>
        <div className='field2'>
          {cust["category_name"]}
        </div>
        <div className='title'>
          Επάγγελμα:
        </div>
        <div className='field2'>
          {cust["profession_name"]}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Τηλέφωνα: 
        </div>
        <div className='field'>
        {phones.map((salmn, i) => {
            if (i == phones.length-1) return salmn["phone_number"]
            else if (typeof salmn["phone_number"] !== "undefined") return salmn["phone_number"] + " "
            })}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Κινητα: 
        </div>
        <div className='field'>
        {mobiles.map((salmn, i) => {
            if (i == mobiles.length-1) return salmn["mobile_number"]
            else if (typeof salmn["mobile_number"] !== "undefined") return salmn["mobile_number"] + " "
            })}
        </div>
      </div>


      <div className='row'>
        <div className='title'>
          Email:
        </div>
        <div className='field2'>
          {cust["email"]}
        </div>
        <div className='title'>
          Ιστοσελίδα:
        </div>
        <div className='field2'>
          {cust["website"]}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Διεύθυνση: 
        </div>
        <div className='field'>
          {cust["address_street"]}{" "}{cust["address_number"]}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Περιοχή:
        </div>
        <div className='field2'>
          {cust["area"]}
        </div>
        <div className='title'>
          Πόλη:
        </div>
        <div className='field2'>
          {cust["city"]}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Νομός:
        </div>
        <div className='field2'>
          {cust["state"]}
        </div>
        <div className='title'>
          Τ.Κ.:
        </div>
        <div className='field2'>
          {cust["address_postal_code"]}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Παρατηρήσεις: 
        </div>
        <div className='field'>
          {cust["comments"]} 
        </div>
      </div>

      <div className='column'>
        <div className='row'>
          <div className='f1 bold'>
            ΗΜΕΡΟΜΗΝΙΑ
          </div>
          <div className='f2 bold'>
            ΠΩΛΗΤΗΣ
            </div>
            <div className='f3 bold'>
            ΚΑΤΗΓΟΡΙΑ ΑΠΟΤΕΛΕΣΜΑΤΟΣ
            </div>
            <div className='f4 bold'>
            ΑΠΟΤΕΛΕΣΜΑ
            </div>
        </div>
            {apotelesmata.map((ap) => {
              return (
                <div className='row'>
                <div className='f1 '>
                  {timeConverter(ap["imerominia"],false)}
                </div>
                <div className='f2 '>
                  {ap["salesman_name"]}
                  </div>
                  <div className='f3 '>
                  {ap["apotelesma_name"]}
                  </div>
                  <div className='f4 '>
                  {ap["subapotelesma_name"]}
                  </div>
              </div>
              )
            })}


      </div>
      
      <div className='column'>
        <div className='row'>
          <div className='f1 bold'>
            ΑΠΟ
          </div>
          <div className='f2 bold'>
            ΠΩΛΗΤΗΣ
            </div>
            <div className='f3 bold'>
            ΣΥΝΔΡΟΜΗ
            </div>
            <div className='f4 bold'>
            ΠΟΣΟ
            </div>
        </div>
            {sales.map((sale) => {
              return (
                <div className='row'>
                  <div className='f1 '>
                  {timeConverter(sale["order_date"], false)}
                </div>
                <div className='f2 '>
                  {sale["salesman_name"]}
                  </div>
                  <div className='f3 '>
                  {sale["subscription_name"]}
                  </div>
                  <div className='f4 '>
                  {sale["total_amount"]}
                  </div>
              </div>
              )
            })}


      </div>
      </div>

      {/*<div className='foot'>
      <div className='row'>
        <div className='title'>
          Ημ. Εκτύπωσης:
        </div>
        <div className='field2'>
          {timeConverter(new Date())}
        </div>
        <div className='title'>
          Ημ. Αλλαγής:
        </div>
        <div className='field2'>
          {timeConverter(cust["date_changed"])}
        </div>
      </div>
      </div>*/}

    </div>
  );
}
