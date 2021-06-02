import React from "react";
import { Link } from "react-router-dom";
import "./MyForm.css";

export default function HomePage() {
  return (
    <div className='total-main-page'>
      <div className='home-page'>
        <div className='home-page-row'>
          <h1>ΜΕΛΑΘΡΟ ΟΙΚΟΥΜΕΝΙΚΟΥ ΕΛΛΗΝΙΣΜΟΥ</h1>
        </div>
        <div className='home-page-row'>
          <div className='home-page-column'>
            <div className='center'>
              <Link to="/insert_customer" className="link-to-btn  home-page-button">ΕΙΣΑΓΩΓΗ ΠΕΛΑΤΗ</Link>
            </div>
            <div className='center'>
              <Link to="/insert_sale"  className="link-to-btn  home-page-button">ΕΙΣΑΓΩΓΗ ΠΩΛΗΣΗΣ</Link>
            </div>
          </div>
          <div className='home-page-column'>
            <div className='center'>
              <Link to="/search_customer"  className="link-to-btn  home-page-button">ΑΝΑΖΗΤΗΣΗ ΠΕΛΑΤΗ</Link>
            </div>
            <div className='center'>
              <Link to="/search_sale" className="link-to-btn  home-page-button">ΑΝΑΖΗΤΗΣΗ ΠΩΛΗΣΗΣ</Link>
            </div>  
          </div>
            <div className='home-page-column'>
              <div className='center'>
                <Link to="/load_from_file_customers" className="link-to-btn  home-page-button">ΜΑΖΙΚΗ ΕΙΣΑΓΩΓΗ ΠΕΛΑΤΩΝ</Link>
              </div>
              <div className='center'>
                <Link to="/area_choice" className="link-to-btn  home-page-button">ΠΕΡΙΟΧΗ ΕΡΓΑΣΙΑΣ</Link>
              </div>
            </div>
        </div>

      <br></br>
      <br></br>
      <br></br>
      <div className='center'>
      <Link to="/login" className="link-to-btn sign-out">ΑΠΟΣΥΝΔΕΣΗ</Link>
      </div>
      </div>
    </div>
  );
}
