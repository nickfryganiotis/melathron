import { React, useState, useEffect } from "react";

export default function StaticInfo({ customer }) {
  const [cust, setCust] = useState({});
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
    category: "ΚΑΤΗΓΟΡΙΑ ΕΠΑΓΓΕΛΜΑΤΟΣ",
    profession: "ΕΠΑΓΓΕΛΜΑ",
  });
  const [status, setStatus] = useState({});

  useEffect(() => {
    setCust({...customer})
  }, [])

  function handleUpdate(e, key) {
    //let row_id = e.target.parentNode.id
    if (status[key]) {
      let x = status;
      delete x[key];
      setStatus(x);
    } else setStatus({ ...status, [key]: [key] });
  }

  return (
    <table>
      {Object.keys(cust).map((key) => {
        {<tr
          onDoubleClick={(e) => {
            handleUpdate(e, key);
          }}
        >
          {(status[key] && <p>Hello!</p>) || (!status[key] && cust[key])}
        </tr>}
      })}
    </table>
  );
}
