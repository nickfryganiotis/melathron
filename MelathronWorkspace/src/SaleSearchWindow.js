import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
//import CustomerInfo from "./CustomerInfo";
import axios from "axios";
import SaleInfo from "./SaleInfo";

export default function SaleSearchWindow() {
  const [results, setResults] = useState([]);
  const [exp, setExp] = useState({});
  const [saleOptions, setSaleOptions] = useState({});

  const attributes = [
    { Header: "Κωδικός Πώλησης", accessor: "sale_id" },
    { Header: "Πωλητής", accessor: "salesman_name" },
    { Header: "Κωδικός Πελάτη", accessor: "spcode" },
    { Header: "Επώνυμο", accessor: "last_name" },
    { Header: "Όνομα", accessor: "first_name" },
    { Header: "Επωνυμία Εταιρίας", accessor: "company_name" },
    { Header: "Κατηγορία Συνδρομής", accessor: "subscription_category" },
    { Header: "Συνδρομή", accessor: "subscription_name" },
    { Header: "Ημερομηνία Παραγγελίας", accessor: "order_date" },
    { Header: "Εξοφλημένη", accessor: "paid" },
  ];

  async function readSaleOptions() {
    let x = JSON.parse(localStorage.getItem("sale_search_options"));
    return x
  }

  async function saleOptionsSet(){
    let y = await readSaleOptions()
    setSaleOptions(y)
  }

  useEffect(() => {
    saleOptionsSet()
    console.log(saleOptions)
    let x = JSON.parse(localStorage.getItem("sale_search_options"))
    console.log(x)
    let opts = {
      method: "post",
      url: "http://localhost:5000/search_sale",
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
              <SaleInfo sale_id={row.original.sale_id} />
            </div>
          );
        }}
      />
    </div>
  );
}