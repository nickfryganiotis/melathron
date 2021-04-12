import axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./MyUserForm.css";
import { greekToEnglish } from "./helperFunctions.js";

export default function CustomersFromFile() {
  const [customers, setCustomers] = useState([]);
  const [res, setRes] = useState([]);

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
        console.log(file);
      };
    });

    promise.then((d) => {
      setCustomers(d);
    });
    promise.catch((error) => {
      //console.log(error);
      console.log(file);
    });
  };

  const tryit = (e) => {
    e.preventDefault();
    console.log(customers);
    e.target.reset();
    setCustomers([]);
    let phons = customers.map((customer) => ({
      phones: customer["ΣΤΑΘΕΡΑ"],
    }));
    let mobls = customers.map((customer) => ({
      mobiles: customer["ΚΙΝΗΤΑ"],
    }));
    console.log(mobls);
    console.log(phons);
    console.log(customers);
    let checkTele = {
      method: "post",
      url: "http://localhost:5000/check_phones",
      data: phons
    };
    axios(checkTele)
      .then((res) => console.log(res.data))
      .catch((error) => {
       console.log(error);
      });

    let checkMobl = {
        method: "post",
        url: "http://localhost:5000/check_mobiles",
        data: mobls
      };
      axios(checkMobl)
        .then((res) => console.log(res.data))
        .catch((error) => {
         console.log(error);
        });

    let options = customers.map((customer) => ({
      method: "post",
      url: "http://localhost:5000/customer_file",
      data: greekToEnglish(customer),
    }));
    console.log(options);
    axios
      .all(options.map((opt) => axios(opt)))
      .then(
        axios.spread((...responses) => {
          setRes(responses);
          console.log(responses);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className='total-main-page2'>
    <div className="user-form2">
      <h1>Εισαγωγή Πελατών από Αρχείο</h1>
      <form onSubmit={tryit}>
      <div className='center2'>
      <div className='user-form-line2'>
      <div className='form-input2'>
          <label>Επιλέξτε τον φάκελο που περιέχει τα δεδομένα</label>
          <input
            type="file"
            onChange={(e) => {
              const f = e.target.files[0];
              if (f) {
                readExcel(f);
              }
            }}
          ></input>
        </div>
        </div>
        </div>
        <br></br>
        <div className='center2'>
          <button type="submit" className="btn btn-danger choice-btn2">Εισαγωγή</button>
        </div>
      </form>
    </div>
    </div>
  );
}
