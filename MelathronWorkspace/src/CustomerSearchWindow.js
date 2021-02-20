import React, { useState, useEffect } from 'react';
import { getJSONValues, mapToRow } from './helperFunctions';


export default function CustomerSearchWindow(){
    const [results, setResults] = useState([])
    const attributes = [
        "Κωδικός",
        "Όνομα",
        "Επώνυμο",
        "Πατρώνυμο",
        "Επωνυμία Εταιρίας",
        "Ιστοσελίδα",
        "Email",
        "Οδός",
        "Τ.Κ.",
        "Κατηγορία Αποτελέσματος",
        "Αποτέλεσμα"
      ];
    useEffect( () => {
            setResults(JSON.parse(localStorage.getItem('customer_search_results')));
            console.log(results)
    }, [])
    return(<div>
        <table>
          <tr>{mapToRow(attributes)}</tr>
          {getJSONValues(results)}
        </table>
    </div>)

}