import React, { useState, useEffect } from "react";
import axios from "axios";
import "./salesprint.css";
import { timeConverter } from "../helperFunctions";
export default function SalesToPrint({ sale_ids, salesman_name }) {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    sale_ids.map((sale_id) => {
      let opts = {
        method: "post",
        url: "http://localhost:5000/print_sale",
        data: { sale_id: sale_id },
      };
      axios(opts)
        .then((res) => setSales((sales) => [...sales, res.data[0]]))
        .catch((error) => console.log(error));
    });
  }, [sale_ids]);

  function sumSales(arr) {
    if (arr.length === 0) {
      return 0;
    } else {
      let i = 0;
      let s = 0;
      for (i = 0; i < arr.length; i++) {
        s += arr[i]["total_amount"];
      }
      return s;
    }
  }

  function sumMaybe(arr) {
    if (arr.length === 0) {
      return 0;
    } else {
      let i = 0;
      let s = 0;
      for (i = 0; i < arr.length; i++) {
        s += arr[i]["total_paid"];
      }
      return s;
    }
  }

  return (
    <table className="tabel">
      <thead>
        <tr className="troo">
          <th>
            {salesman_name != undefined ? (
              <h1 className="headr">{salesman_name}</h1>
            ) : (
              <h1 className="headr">ΓΕΝΙΚΗ&nbsp;ΕΚΤΥΠΩΣΗ&nbsp;ΠΩΛΗΣΕΩΝ</h1>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="troo">
          <tr className="troo">
            <td className="g1 bold">Α/Α</td>
            <td className="g2 bold">ΠΩΛΗΤΗΣ</td>
            <td className="g3 bold">ΣΥΝΔΡΟΜΗ</td>
            <td className="g4 bold">ΠΕΛΑΤΗΣ</td>
            <td className="g5 bold">ΠΑΡΑΓΓΕΛΙΑ</td>
            <td className="g6 bold">ΕΙΣΠΡΑΞΗ</td>
            <td className="g7 bold">ΤΡΟΠΟΣ ΠΛΗΡΩΜΗΣ</td>
          </tr>
          {sales.map((sale) => {
            return (
              <tr className="troo">
                <td className="g1">{sale["sale_id"]}</td>
                <td className="g2" style={{ textAlign: "start" }}>
                  {sale["salesman_name"]}
                </td>
                <td className="g3" style={{ textAlign: "start" }}>
                  {sale["subscription_name"]}
                </td>
                <td className="g4" style={{ textAlign: "start" }}>
                  {sale["spcode"]} {sale["last_name"]} {sale["first_name"]}
                </td>
                <td className="g5" style={{ textAlign: "start" }}>
                  {sale["total_amount"]}{" "}
                  {timeConverter(sale["order_date"], false)}
                </td>
                <td className="g6" style={{ textAlign: "start" }}>
                  {sale["total_paid"]} {timeConverter(sale["date_paid"], false)}
                </td>
                <td className="g7" style={{ textAlign: "start" }}>
                  ΜΕΤΡΗΤΑ
                </td>
              </tr>
            );
          })}
        </tr>
      </tbody>
      <tfoot className="tfeet">
        <tr
          className="troo"
          style={{ display: "table", width: "100%", marginTop: "20px" }}
        >
          <td
            className="f1"
            style={{
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            ΠΑΡΑΓΓΕΛΙΕΣ:
          </td>
          <td className="f2">
            {sales.length}
          </td>
          <td className="f3"> </td>
          <td
            className="f4"
            style={{
              textAlign: "start",
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            ΓΕΝΙΚΟ ΣΥΝΟΛΟ:
          </td>
          <td className="f5"> </td>
          <td className="f6" style={{ textAlign: "start" }}>
            {sumSales(sales)}
          </td>
          <td className="f7"></td>
          <td className="f6" style={{ textAlign: "start" }}>
            {sumMaybe(sales)}
          </td>
          <td className="f8"> </td>
        </tr>
      </tfoot>
    </table>
  );
}
