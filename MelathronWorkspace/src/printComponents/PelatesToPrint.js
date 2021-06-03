import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./pelateskartela.css";
export default function PelatesToPrint({sp}) {
  const [cust, setCust] = useState({});
  const [sales, setSales] = useState([]);
  const [phones, setPhones] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [salesmen, setSalesmen] = useState([]);

  useEffect(() => {
    let url = "http://localhost:5000/customer_info";
    let opts = {
      method: "post",
      url: url,
      data: { spcode: sp },
    };
    axios(opts)
      .then((response) => {
        setCust(response.data[0][0]);
        setSalesmen(response.data[2]);
        setSales(response.data[3]);
        setPhones(response.data[4]);
        setMobiles(response.data[5]);
      })
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
          Κατηγορία Αποτελέσματος:
        </div>
        <div className='field2'>
          {cust["apotelesma_name"]}
        </div>
        <div className='title'>
          Αποτέλεσμα:
        </div>
        <div className='field2'>
          {cust["subapotelesma_name"]}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Πωλητής: 
        </div>
        <div className='field'>
        {salesmen.map((salmn, i) => {
            if (i == salesmen.length-1) return salmn["salesman_name"]
            else if (typeof salmn["salesman_name"] !== "undefined") return salmn["salesman_name"] + " "
            })}
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
            ΠΑΛΑΙΟΙ ΣΥΝΕΡΓΑΤΕΣ
          </div>
          <div className='f2 bold'>
            ΑΠΟ
            </div>
            <div className='f3 bold'>
            ΣΧΟΛΙΑ
            </div>
            <div className='f4 bold'>
            ΠΟΣΟ
            </div>
        </div>
            {sales.map((sale) => {
              return (
                <div className='row'>
                <div className='f1 '>
                  {sale["salesman_name"]}
                </div>
                <div className='f2 '>
                  {sale["order_date"]}
                  </div>
                  <div className='f3 '>
                  {" "}
                  </div>
                  <div className='f4 '>
                  {sale["total_amount"]}
                  </div>
              </div>
              )
            })}


      </div>
      </div>

      <div className='foot'>
      <div className='row'>
        <div className='title'>
          Ημ. Εκτύπωσης:
        </div>
        <div className='field2'>
          {new Date().toJSON().slice(0,10).replace(/-/g,'/')}
        </div>
        <div className='title'>
          Ημ. Αλλαγής:
        </div>
        <div className='field2'>
          13/05/2021
        </div>
      </div>
      </div>

    </div>
  );
}
