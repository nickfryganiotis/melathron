import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./MyUserForm.css";

export default function CustomersFromFile() {
  const [customers, setCustomers] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        //reject(error);
        console.log(file)
      };
    });

    promise.then((d) => {
      setCustomers(d);
    });
    promise.catch((error) => {
      //console.log(error);
      console.log(file)
    });
  };

  const tryit = (e) => {
    e.preventDefault()
    console.log(customers);
    e.target.reset();
    setCustomers([]);
  };

  return (
    <div className="user-form">
      <h1>Εισαγωγή Πελατών από Αρχείο</h1>
      <form onSubmit={tryit}>
        <div>
          <label>Επιλέξτε τον φάκελο που περιέχει τα δεδομένα</label>
          <input
            type="file"
            onChange={(e) => {
              const f = e.target.files[0];
              if (f){
                readExcel(f);
              }
              
            }}
          ></input>
        </div>
        <br></br>
        <div>
          <button type="submit" className='btn btn-danger'>Εισαγωγή Στοιχείων</button>
        </div>
      </form>
    </div>
  );
}
