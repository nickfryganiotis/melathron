import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import CustomerInfo from "./CustomerInfo";

export default function CustomerSearchWindow() {
  const [results, setResults] = useState([]);
  const [exp, setExp] = useState({});

  const attributes = [
    { Header: "Κωδικός", accessor: "spcode" },
    { Header: "Όνομα", accessor: "first_name" },
    { Header: "Επώνυμο", accessor: "last_name" },
    { Header: "Πατρώνυμο", accessor: "fathers_name" },
    { Header: "Επωνυμία Εταιρίας", accessor: "company_name" },
    { Header: "Ιστοσελίδα", accessor: "website" },
    { Header: "Email", accessor: "email" },
    { Header: "Οδός", accessor: "address_street" },
    { Header: "Τ.Κ.", accessor: "address_postal_code" },
    { Header: "Κατηγορία Αποτελέσματος", accessor: "apotelesma_name" },
    { Header: "Αποτέλεσμα", accessor: "subapotelesma_name" },
  ];

  /*const attributes = [
    "Κωδικός",
    "Όνομα", 
     "Επώνυμο", 
    "Πατρώνυμο", 
    "Επωνυμία Εταιρίας", 
    "Ιστοσελίδα",
    "Email", 
    "Οδός", 
    "Τ.Κ.",
    "Κατηγορία Αποτελέσματος",
    "Αποτέλεσμα",
  ];*/

  useEffect(() => {
    setResults(JSON.parse(localStorage.getItem("customer_search_results")));
    console.log(results);
  }, []);

  /* return(<div>
        <table>
          <tr>{mapToRow(attributes)}</tr>
          {getJSONValues(results)}
        </table>
        <ReactTable />
    </div>)*/
  return (
    <div>
      <ReactTable
        data={results}
        columns={attributes}
        defaultPageSize={20}
        className="-striped -highlight"
        expanded={exp}
        getTrProps={(state, rowInfo, columns, expanded) => {
          return {
            onClick: (e) => {
              if (exp[rowInfo.viewIndex]) {
                setExp({ ...exp, [rowInfo.viewIndex]: false });
              } else {
                setExp({ ...exp, [rowInfo.viewIndex]: true });
              }
            },
          };
        }}
        SubComponent={(row) => {
          return (
            <div>
              <CustomerInfo sp = {row.original.spcode}/>
            </div>
          );
        }}
      />
    </div>
  );
}

