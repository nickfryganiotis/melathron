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

  /*useEffect(() => {
    loadAreaChoice(setAreaChoice);
  }, []);*/

  useEffect(() => {
    //let area = JSON.parse(localStorage.getItem('area_choice'))
    //loadAreaChoice(setAreaChoice)
    let area = window.require("electron").remote.getGlobal("contexts").areaChoice
    setAreaChoice(area)
    setSale({...sale, 'continent_id': area['continent_id'], 'country_id': area['country_id'] })
    let url1 = "http://localhost:5000/shipping_methods";
    let subscriptions_options = {
      method: "post",
      url: "http://localhost:5000/subscriptions",
      data: {'country_id': area['country_id']}
    }
    let url3 = "http://localhost:5000/salesman";
    axios.all([axios.get(url1), axios(subscriptions_options), axios.get(url3)]).then(
      axios.spread((obj1, obj2, obj3) => {
        setShippingMethods(obj1.data);
        setSubscriptions(obj2.data);
        setSalesman(obj3.data);
      })
    );
  }, []);

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
    <div className='total-main-page2'>
    <div className="user-form2">
      <h1>Εισαγωγή Νέας Πώλησης</h1>
      <form onSubmit={handleSubmit}>
      <div className='user-form-line2'>
      <div className='form-input2 left2'>
          <label htmlFor="spcode">Κωδικός Πελάτη</label>
          <input
            type="number"
            name="spcode"
            id="spcode"
            onChange={handleSaleChange}
          />
        </div>

        <div className='form-input2 left2'>
          <label htmlFor="salesman_name">Πωλητής</label>
          <select name="salesman_name" id="salesman_name" onChange={handleSaleChange}>
            <option/>
            {makeToUnique(salesman, "salesman_name", sale).map(arrayToOption)}
          </select>
        </div>
        <div className='form-input2'>
          <label htmlFor="order_date">Ημερομηνία Παραγγελίας</label>
          <input
            type="datetime-local"
            name="order_date"
            id="order_date"
            onChange={handleSaleChange}
          />
        </div>
        </div>

        <div className='user-form-line2'>
        <div className='form-input2 left2'>
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

        <div className='form-input2'>
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
        </div>

        <div className='user-form-line2'>
        <div className='form-input2 left2'>
          <label htmlFor="total_amount">Συνολικό Ποσό Πληρωμής</label>
          <input
            type="number"
            name="total_amount"
            id="total_amount"
            step="0.01"
            onChange={handleSaleChange}
          />
        </div>

        <div className='form-input2 left2'>
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

        <div className='form-input2'>
          <label htmlFor="voucher">Voucher</label>
          <input
            type="text"
            name="voucher"
            id="voucher"
            onChange={handleSaleChange}
          />
        </div>
        </div>
        <div className='user-form-line2'>
        <div className='form-input2'>
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
        </div>
        <br/>

        <div>
          {status === 1 && <UpfrontPaymentForm onChange={handleSaleChange} />}
          {status === 2 && <DosesPaymentForm onChange={handleSaleChange} />}
        </div>

        <br/>
        <div className='center2'>
        <button type="submit" className="btn btn-danger choice-btn2">
          Εισαγωγή
        </button>
        </div>
      </form>
      </div>
    </div>
  );
}
