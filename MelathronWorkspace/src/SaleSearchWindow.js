import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
//import CustomerInfo from "./CustomerInfo";
import axios from "axios";

export default function SaleSearchWindow() {
  const [results, setResults] = useState([]);
  const [exp, setExp] = useState({});
  const [saleOptions, setSaleOptions] = useState({});

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

  async function readCustomerOptions() {
    let x = JSON.parse(localStorage.getItem("customer_search_options"));
    return x
  }

  async function customerOptionsSet(){
    let y = await readCustomerOptions()
    setCustomerOptions(y)
  }

  useEffect(() => {
    customerOptionsSet()
    console.log(customerOptions)
    let x = JSON.parse(localStorage.getItem("customer_search_options"))
    let opts = {
      method: "post",
      url: "http://localhost:5000/search_customer",
      data: x,
    };
    axios(opts)
      .then((response) => {
        setResults(response.data);
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              <CustomerInfo sp={row.original.spcode} />
            </div>
          );
        }}
      />
    </div>
  );
}