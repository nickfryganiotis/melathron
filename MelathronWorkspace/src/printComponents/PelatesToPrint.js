import React, { useState, useEffect } from "react";
import "./pelateskartela.css";
export default function PelatesToPrint({ customer }) {
  const [cust, setCust] = useState({});
  useEffect(() => {
    setCust(customer[0]);
    console.log(customer);
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
          {cust["salesman"]}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Τηλέφωνα: 
        </div>
        <div className='field'>
          {cust["PHONES"]}
        </div>
      </div>

      <div className='row'>
        <div className='title'>
          Κινητα: 
        </div>
        <div className='field'>
          {cust["PHONES"]}
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
          {cust["address_street"]}{" " + cust["address_number"]}
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
          {cust["comments"]}dfhhhssfffffffffffffffffffff fffffffffffffdfhhhssfffffffffffffffffdfhhhssfff fffffffffffffdfhhhssfffffffffffffffffdfhhhssfff
          fffffffffffffdfhhhssfffffffffffffffffdfhhhssfff fffffffffffffffffffffffffffffffdfhhhssffffffffffffffffffffffffffffffffffdfhhhssff 
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

        <div className='row'>
          <div className='f1 '>
            ΠΑΛΑΙΟΙ ΣΥΝΕΡΓΑΤΕΣgf
          </div>
          <div className='f2 '>
            ΑΠΟfg
            </div>
            <div className='f3 '>
            ΣΧΟΛΙΑfg
            </div>
            <div className='f4 '>
            ΠΟΣΟfg
            </div>
        </div>
      </div>
      </div>

      <div className='foot'>
      <div className='row'>
        <div className='title'>
          Ημ. Εκτύπωσης:
        </div>
        <div className='field2'>
          13/05/2021
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
