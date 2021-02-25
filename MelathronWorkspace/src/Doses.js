import React from 'react'

export default function Doses({i, onChange}){

    return (      
    <div style={{'border' : '1px solid black'}} >
        <br/>
        <div>
          <label htmlFor="dose_amount">Ποσό Δόσης {i}</label>
          <input
            type="number"
            name={"dose_amount" + i}
            id={"dose_amount" + i}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="dose_deadline">Προσθεσμία Εξόφλησης Δόσης {i}</label>
          <input
            type="date"
            name={"dose_deadline" + i}
            id={"dose_deadline" + i}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="payment_amount">Πληρωθέν Ποσό Δόσης {i}</label>
          <input
            type="number"
            name={"payment_amount" + i}
            id={"payment_amount" + i}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="payment_method">Μέθοδος Πληρωμής Δόσης {i}</label>
          <div className="maria">
            <input
              type="radio"
              name={"payment_method" + i}
              id={"card" + i}
              value="Κάρτα"
              onClick={onChange}
            />
            <label
              htmlFor="card"
              style={{ "margin-top": 0, "font-size": "16px" }}
            >
              Τραπεζική Κατάθεση
            </label>
          </div>
          <div className="maria">
            <input
              type="radio"
              name={"payment_method" + i}
              id={"card" + i}
              value="Μετρητά"
              onClick={onChange}
            />
            <label
              htmlFor="cash"
              style={{ "margin-top": 0, "font-size": "16px" }}
            >
              Μετρητά
            </label>
          </div>
        </div>
        <br/>
      </div>)
}