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

  const previewPrint = (typ) => {
    const BrowserWindow = window.require("electron").remote.BrowserWindow;
    const win2 = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        webSecurity: false,
        contextIsolation: false
      },
    });
    win2.setMenu(null);
    win2.webContents.openDevTools();
    if (typ === "sales"){win2.loadURL('http://localhost:3000/sales_kartela');
    win2.webContents.on('did-finish-load', () => {
      win2.webContents.send('saleid-to-print', results.map((sales) => sales["sale_id"]));  });
    }
    else if (typ === "salesmen"){
      win2.loadURL('http://localhost:3000/salesman_print');
      win2.webContents.on('did-finish-load', () => {
        win2.webContents.send('saleids-to-print', results.map((sales) => {
          return {
            "sale_id" : sales["sale_id"],
            "salesman_name" : sales["salesman_name"]
          }
        }));  });
    }
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

      <div>
        <button onClick={() => previewPrint("sales")}>ΕΚΤΥΠΩΣΗ ΚΑΡΤΕΛΩΝ</button>
      </div>
      <div>
                <button onClick={() => previewPrint("salesmen")}>ΕΚΤΥΠΩΣΗ ΣΥΝΕΡΓΑΤΩΝ</button>
      </div>
    </div>
  );
}