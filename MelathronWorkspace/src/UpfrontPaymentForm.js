import React from "react";
import "./MyUserForm.css";

export default function UpfrontPaymentForm({onChange}) {
  return (
    <div className='user-form-line2'>
        <div className='form-input2 left2'>
            <label htmlFor="dose_deadline1">Προσθεσμία Εξόφλησης </label>
            <input
                type="date"
                name={"dose_deadline1"}
                id={"dose_deadline1"}
                onChange={onChange}
            />
        </div>

        <div className='form-input2 left2'>
          <label htmlFor="payment_amount1">Πληρωθέν Ποσό</label>
          <input
            type="number"
            name="payment_amount1"
            id="payment_amount1"
            onChange={onChange}
          /> 
        </div>

        <div className='form-input2'>
          <label htmlFor="payment_method1">Μέθοδος Πληρωμής</label>
          <div className="maria">
          <input
            type="radio"
            name="payment_method1"
            id = "card"
            value="Κάρτα"
            onClick={onChange}
          />
          <label htmlFor="card">Τραπεζική Κατάθεση</label>
          </div>
          <div className="maria">
          <input
            type="radio"
            name="payment_method1"
            id="cash"
            value="Μετρητά"
            onClick={onChange}
          />
          <label htmlFor="cash">Μετρητά</label>
        </div>
        </div>

    </div>
  );
}
