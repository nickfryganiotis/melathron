import React from "react";

export default function UpfrontPaymentForm({onChange}) {
  return (
    <div >
        <div>
          <label htmlFor="payment_amount">Πληρωθέν Ποσό</label>
          <input
            type="number"
            name="payment_amount"
            id="payment_amount"
            onChange={onChange}
          /> 
        </div>

        <div>
          <label htmlFor="payment_method">Μέθοδος Πληρωμής</label>
          <div className="maria">
          <input
            type="radio"
            name="payment_method"
            id = "card"
            value="Κάρτα"
            onClick={onChange}
          />
          <label htmlFor="card" style={{'margin-top': 0, 'font-size': '16px'}}>Τραπεζική Κατάθεση</label>
          </div>
          <div className="maria">
          <input
            type="radio"
            name="payment_method"
            id="cash"
            value="Μετρητά"
            onClick={onChange}
          />
          <label htmlFor="cash" style={{'margin-top': 0, 'font-size': '16px'}}>Μετρητά</label>
        </div>
        </div>

    </div>
  );
}
