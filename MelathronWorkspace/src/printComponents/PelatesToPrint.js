import React, { useState, useEffect } from "react";
import "./pelateskartela.css";
export default function PelatesToPrint({ customer }) {
  const [cust, setCust] = useState({});
  useEffect(() => {
    setCust(customer[0]);
    console.log(customer);
  }, []);

  return (
    <>
      <h1 className="headr">ΕΛΛΗΝΙΚΗ&nbsp;ΕΘΝΙΚΗ&nbsp;ΓΡΑΜΜΗ</h1>
      <div >
        Ονοματεπώνυμο: {cust["last_name"]} {cust["first_name"]}
      </div>
      <div>
        Επωνυμία Επιχείρησης: <span>{cust["company_name"]}</span>
      </div>
      <div >
        Κατηγορία: <div className="attrs">{cust["category"]}</div>
        {" "}
        Επάγγελμα: <div className="attrs">{cust["profession"]}</div>
      </div>
    </>
  );
}
