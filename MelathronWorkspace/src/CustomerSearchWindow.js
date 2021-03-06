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
    setAdminPriv(window.require("electron").remote.getGlobal("contexts").isAdmin)
  })

  const remote = window.require('electron').remote;
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
    if (typ === "pelates"){win2.loadURL('http://localhost:3000/pelates_kartela');
    win2.webContents.on('did-finish-load', () => {
      win2.webContents.send('spcodes-to-print', results.map((customer) => customer["spcode"]));  });
    }
    else if (typ === "etiketes"){
      win2.loadURL('http://localhost:3000/etiketes');
      win2.webContents.on('did-finish-load', () => {
      win2.webContents.send('etiketes-to-print', results.map((customer) => customer["spcode"]));  });
    }
    else if (typ === "special"){
      win2.loadURL('http://localhost:3000/special');
      win2.webContents.on('did-finish-load', () => {
      win2.webContents.send('special-to-print', results.map((customer) => customer["spcode"]));  });
    }
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
    console.log(x)
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
    let y = localStorage.getItem("is-admin")
    setAdminPriv(y)
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
  
      axios(massdeloptions)
      .then((res) => {
        alert("Οι πελάτες διαγράφηκαν επιτυχώς."); 
        remote.getCurrentWindow().close()
      })
      .catch((err) => console.log(err))
    } else {
      console.log("Mission aborted")
    }

  }

  return (
    <div>
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
      <div>
        <div>
          {adminPriv && <SalesmanAssignment customers={results} />}
        </div>
        <div >
          <CustomerToFile customers={results} />
        </div>
        <div>
          <button onClick={() => previewPrint("pelates")}>ΕΚΤΥΠΩΣΗ ΚΑΡΤΕΛΩΝ</button>
        </div>
        <div>
          <button onClick={() => previewPrint("etiketes")}>ΕΚΤΥΠΩΣΗ ΕΤΙΚΕΤΩΝ</button>
          </div>
          <div>
          <button onClick={() => previewPrint("special")}>ΕΙΔΙΚΗ ΕΚΤΥΠΩΣΗ</button>
          </div>
        <div>
          {adminPriv && <button onClick={massDelete}>ΜΑΖΙΚΗ ΔΙΑΓΡΑΦΗ</button>}
        </div>
    </div>
    </div>
  );
}
