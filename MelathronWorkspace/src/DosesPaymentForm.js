import React from "react";

export default function DosesPaymentForm({ onChange }) {
  return (
    <div>
      <div>
        <label htmlFor="number_of_doses">Αριθμός Δόσεων</label>
        <input
          type="number"
          name="number_of_doses"
          id="number_of_doses"
          min="2"
          max="4"
          onChange={onChange}
        />
      </div>

      <div >
        <div>
          <label htmlFor="dose_amount">Ποσό Δόσης</label>
          <input
            type="number"
            name="dose_amount"
            id="dose_amount"
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="dose_deadline">Προσθεσμία Εξόφλησης Δόσης</label>
          <input
            type="date"
            name="dose_deadline"
            id="dose_deadline"
            onChange={onChange}
          />
        </div>

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
    </div>
  );
}
