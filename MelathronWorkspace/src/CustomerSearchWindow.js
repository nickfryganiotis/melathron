import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import CustomerInfo from "./CustomerInfo";
import CustomerToFile from "./CustomerToFile";
import SalesmanAssignment from "./SalesmanAssignment";
import { useReactToPrint } from 'react-to-print';
import PelatesKartela from "./printComponents/PelatesKartela";

export default function CustomerSearchWindow() {
  const [results, setResults] = useState([]);
  const [exp, setExp] = useState({});
  const [customerOptions, setCustomerOptions] = useState({});
  const [areaChoice, setAreaChoice] = useState({});
  const [adminPriv, setAdminPriv] = useState(true);

  const ipc = window.require('electron').ipcRenderer;
  ipc.on('area-choice', (event, message) => {
    setAreaChoice(message);
  })

  const remote = window.require('electron').remote;
  const previewPrint = () => {
    const BrowserWindow = window.require("electron").remote.BrowserWindow;
    const win2 = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        webSecurity: false
      },
    });
    win2.setMenu(null);
    win2.webContents.openDevTools();
    win2.loadURL('http://localhost:3000/pelates_kartela');
    win2.webContents.on('did-finish-load', () => {
      win2.webContents.send('spcodes-to-print', results.map((customer) => customer["spcode"]));
  });
  }
  /*const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });*/

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

  function massDelete(){
    if (window.confirm('Πρόκειται να διαγράψετε ΟΛΟΥΣ τους πελάτες του πίνακα. Είστε σίγουροι ότι θέλετε να συνεχίσετε ;')) {
      let x = results.map( (customer) => {
        return({ 
        "spcode" : customer["spcode"]
        })
      }
      )
      let massdeloptions = {
        method: "post",
        url: "http://localhost:5000/delete_customers",
        data: {"spcodes" : x}
      }
  
      axios(massdeloptions).then((res) => console.log(res)).catch((err) => console.log(err))
      alert("Οι πελάτες διαγράφηκαν επιτυχώς.")
      remote.getCurrentWindow().close()
    } else {
      console.log("Mission aborted")
    }

  }

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
      <div>
      <SalesmanAssignment customers={results} />
      </div>
      <div>
      <CustomerToFile customers={results} />
      </div>
      <div>
      <button onClick={previewPrint}>ΕΚΤΥΠΩΣΗ ΚΑΡΤΕΛΩΝ</button>
      {adminPriv && <button onClick={massDelete}>ΜΑΖΙΚΗ ΔΙΑΓΡΑΦΗ</button>}
      </div>
    </div>
  );
}
