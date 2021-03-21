import React from 'react'

export default function Doses({i, onChange}){

    return (      
    <div>
        <br/>
        <div className='user-form-line2'>
        <div className='form-input2 left2'>
          <label htmlFor="dose_amount">Ποσό Δόσης {i}</label>
          <input
            type="number"
            name={"dose_amount" + i}
            id={"dose_amount" + i}
            onChange={onChange}
          />
          </div>
        

          <div className='form-input2 left2'>
          <label htmlFor="dose_deadline">Προσθεσμία Εξόφλησης Δόσης {i}</label>
          <input
            type="date"
            name={"dose_deadline" + i}
            id={"dose_deadline" + i}
            onChange={onChange}
          />
        </div>

        <div className='form-input2 left2'>
          <label htmlFor="payment_amount">Πληρωθέν Ποσό Δόσης {i}</label>
          <input
            type="number"
            name={"payment_amount" + i}
            id={"payment_amount" + i}
            onChange={onChange}
          />
        </div>

        <div className='form-input2'>
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
            >
              Μετρητά
            </label>
          </div>
        </div>
        <br/>
      </div>
      </div>)
}