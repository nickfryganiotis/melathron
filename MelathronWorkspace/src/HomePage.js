import React from "react";
import { Link } from "react-router-dom";
import "./MyForm.css";

export default function HomePage() {
  return (
    <div className='total-main-page'>
      <div className="user-form-div">
      <div className="user-form">
        <h1>ΜΕΛΑΘΡΟ ΟΙΚΟΥΜΕΝΙΚΟΥ ΕΛΛΗΝΙΣΜΟΥ</h1>
      <div className='center'>
        <Link to="/insert_customer" className="link-to-btn">ΕΙΣΑΓΩΓΗ ΠΕΛΑΤΗ</Link>
      </div>
      <div className='center'>
        <Link to="/insert_sale"  className="link-to-btn">ΕΙΣΑΓΩΓΗ ΠΩΛΗΣΗΣ</Link>
      </div>
      <div className='center'>
        <Link to="/search_customer"  className="link-to-btn">ΑΝΑΖΗΤΗΣΗ ΠΕΛΑΤΗ</Link>
      </div>
      <div className='center'>
        <Link to="/search_sale" className="link-to-btn">ΑΝΑΖΗΤΗΣΗ ΠΩΛΗΣΗΣ</Link>
      </div>
      <div className='center'>
        <Link to="/load_from_file_customers" className="link-to-btn">ΜΑΖΙΚΗ ΕΙΣΑΓΩΓΗ ΠΕΛΑΤΩΝ</Link>
      </div>
      <div className='center'>
        <Link to="/area_choice" className="link-to-btn">ΠΕΡΙΟΧΗ ΕΡΓΑΣΙΑΣ</Link>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className='center'>
        <Link to="/login" className="link-to-btn">ΑΠΟΣΥΝΔΕΣΗ</Link>
      </div>
    </div>
    </div>
    </div>
  );
}
