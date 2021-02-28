import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyUserForm.css";
import { makeToUnique, arrayToOption, loadAreaChoice } from "./helperFunctions";
import UpfrontPaymentForm from "./UpfrontPaymentForm";
import DosesPaymentForm from "./DosesPaymentForm";

export default function MySaleForm() {
  const [sale, setSale] = useState({});
  const [salesman, setSalesman] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [status, setStatus] = useState(0);
  const [areaChoice, setAreaChoice] = useState({});

  useEffect(() => {
    loadAreaChoice(setAreaChoice);
  }, []);

  useEffect(() => {
    //var area = JSON.parse(localStorage.getItem('area_choice'))
    setSale({...sale, 'continent_id': areaChoice['continent_id'], 'country_id': areaChoice['country_id'] })
    let url1 = "http://localhost:5000/shipping_methods";
    let subscriptions_options = {
      method: "post",
      url: "http://localhost:5000/subscriptions",
      data: {'country_id': areaChoice['country_id']}
    }
    let url3 = "http://localhost:5000/salesman";
    axios.all([axios.get(url1), axios(subscriptions_options), axios.get(url3)]).then(
      axios.spread((obj1, obj2, obj3) => {
        setShippingMethods(obj1.data);
        setSubscriptions(obj2.data);
        setSalesman(obj3.data);
      })
    );
  }, [areaChoice]);

  const handleSaleChange = (e) => {
    const { value, name } = e.target;
    setSale({ ...sale, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let sale_options = {
      method: "post",
      url: "http://localhost:5000/send_sale",
      data: sale,
    };
    axios(sale_options)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
    setSale({});
    console.log(sale);
  };

  const radioHandler = (status) => {
    setStatus(status);
    setSale({ ...sale, status : status })
  };

  return (
    <div className="user-form">
      <h1>Εισαγωγή Νέας Πώλησης</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="spcode">Κωδικός Πελάτη</label>
          <input
            type="number"
            name="spcode"
            id="spcode"
            onChange={handleSaleChange}
          />
        </div>

        <div>
          <label htmlFor="salesman_name">Πωλητής</label>
          <select name="salesman_name" id="salesman_name" onChange={handleSaleChange}>
            <option/>
            {makeToUnique(salesman, "salesman_name", sale).map(arrayToOption)}
          </select>
        </div>

        <div>
          <label htmlFor="order_date">Ημερομηνία Παραγγελίας</label>
          <input
            type="date"
            name="order_date"
            id="order_date"
            onChange={handleSaleChange}
          />
        </div>

        <div>
          <label htmlFor="subscription_category">Κατηγορία Συνδρομής</label>
          <select
            name="subscription_category"
            id="subscription_category"
            onChange={handleSaleChange}
          >
            <option/>
            {makeToUnique(subscriptions, "subscription_category", sale).map(
              arrayToOption
            )}
          </select>
        </div>

        <div>
          <label htmlFor="subscription_name">Συνδρομή</label>
          <select
            name="subscription_name"
            id="subscription_name"
            onChange={handleSaleChange}
          >
            <option/>
            {makeToUnique(
              subscriptions,
              "subscription_name",
              sale,
              "subscription_category"
            ).map(arrayToOption)}
          </select>
        </div>

        <div>
          <label htmlFor="total_amount">Συνολικό Ποσό Πληρωμής</label>
          <input
            type="number"
            name="total_amount"
            id="total_amount"
            step="0.01"
            onChange={handleSaleChange}
          />
        </div>

        <div>
          <label htmlFor="shipping_method_name">Τρόπος Παράδοσης</label>
          <select
            name="shipping_method_name"
            id="shipping_method_name"
            onChange={handleSaleChange}
          >
            <option/>
            {makeToUnique(shippingMethods, "shipping_method_name", sale).map(
              arrayToOption
            )}
          </select>
        </div>

        <div>
          <label htmlFor="voucher">Voucher</label>
          <input
            type="text"
            name="voucher"
            id="voucher"
            onChange={handleSaleChange}
          />
        </div>

        <div>
          <label htmlFor="howToPay" >Τρόπος Εξόφλησης</label>
          <div className="maria">
            <input
              type="radio"
              name="howToPay"
              id="upfront"
              checked={status === 1}
              onClick={(e) => radioHandler(1)}
            />
            <label htmlFor="upfront" style={{'margin-top': 0, 'font-size': '16px'}}>Απευθείας Πληρωμή</label>
            </div>
            <div className="maria">
            <input
              type="radio"
              name="howToPay"
              id="doses"
              checked={status === 2}
              onClick={(e) => radioHandler(2)}
            />
            <label htmlFor="doses" style={{'margin-top': 0, 'font-size': '16px'}}>Πληρωμή με Δόσεις</label>
          </div>
        </div>
        <br/>

        <div>
          {status === 1 && <UpfrontPaymentForm onChange={handleSaleChange} />}
          {status === 2 && <DosesPaymentForm onChange={handleSaleChange} />}
        </div>

        <br/>
        <button type="submit" className="btn btn-danger">
          Εισαγωγή
        </button>
      </form>
    </div>
  );
}
