import axios from "axios";
import React, { useEffect, useState } from "react";
import "./info.css";
export default function CustomerInfo({ sp }) {
  const [customer, setCustomer] = useState([]);
  const [hist, setHist] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    let url = "http://localhost:5000/customer_info";
    let opts = {
      method: "post",
      url: url,
      data: { spcode: sp },
    };
    axios(opts)
      .then((response) => {
        setCustomer(response.data[0]);
        setHist(response.data[1]);
        setSalesmen(response.data[2]);
        setSales(response.data[3]);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {customer.map((element) => {
        return (
          <table className="elli">
            {Object.keys(element).map((key, index) => {
              return (
                <tr>
                  <th>{key}</th>
                  <th>{element[key]}</th>
                  <th>
                    <input type="text" />
                  </th>
                </tr>
              );
            })}
          </table>
        );
      })}

      {hist.length !== 0 && <table className="elli">
        <tr>
        {Object.keys(hist[0]).map((key, index) => {
                return <th>{key}</th>;
              })}
        </tr>
        {hist.map((element) => {
          return (
            <tr>
              {Object.keys(element).map((key, index) => {
                return <th>{element[key]}</th>;
              })}
            </tr>
          );
        })}
      </table>}

      {salesmen.length !== 0 && <table className="elli">
        <tr>
        {Object.keys(salesmen[0]).map((key, index) => {
                return <th>{key}</th>;
              })}
        </tr>
        {salesmen.map((element) => {
          return (
            <tr>
              {Object.keys(element).map((key, index) => {
                return <th>{element[key]}</th>;
              })}
            </tr>
          );
        })}
      </table>}

      {sales.length !== 0 && <table className="elli">
        <tr>
        {Object.keys(sales[0]).map((key, index) => {
                return <th>{key}</th>;
              })}
        </tr>
        {sales.map((element) => {
          return (
            <tr>
              {Object.keys(element).map((key, index) => {
                return <th>{element[key]}</th>;
              })}
            </tr>
          );
        })}
      </table>}
    </>
  );
}
