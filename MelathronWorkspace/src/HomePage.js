import React from "react";
import { Link } from "react-router-dom";
import "./MyUserForm.css";

export default function HomePage() {
  return (
    <div className='user-form'>
        <h1>Καλωσήρθατε στην Εφαρμογή!</h1>
        <fieldset>
          <legend>Μεταβείτε σε μια σελίδα</legend>
      <div >
        <Link to="/insert_customer">Εισαγωγή Πελάτη</Link>
      </div>
      <div>
        <Link to="/insert_sale">Εισαγωγή Πώλησης</Link>
      </div>
      <div>
        <Link to="/search_customer">Αναζήτηση Πελάτη</Link>
      </div>
      <div>
        <Link to="/search_sale">Αναζήτηση Πώλησης</Link>
      </div>
      <div>
        <Link to="/load_from_file_customers">Μαζική Εισαγωγή Πελατών</Link>
      </div>
      <div>
        <Link to="/load_from_file_sales">Μαζική Εισαγωγή Πωλήσεων</Link>
      </div>
      <div>
        <Link to="/area_choice">Επιλογή Περιοχής Εργασίας</Link>
      </div>
      </fieldset>
    </div>
  );
}
