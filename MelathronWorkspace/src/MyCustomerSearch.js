import React, { useState } from "react";
import "./MyCustomSearch.css";
import axios from "axios";
import { getJSONValues, mapToRow } from "./helperFunctions";

export default function MyCustomerSearch() {
  const [people, setPeople] = useState([]);

  const getSearchResults = () => {
    axios
      .get("http://localhost:5000/customers")
      .then((response) => {
        setPeople(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const attributes = [
    "Κωδικός",
    "Όνομα",
    "Επώνυμο",
    "Πατρώνυμο",
    "Επωνυμία Εταιρίας",
    "Ιστοσελίδα",
    "Email",
    "Οδός",
    "Αριθμός",
    "Τ.Κ.",
    "FAX",
    "Σχόλια",
    "Δυναμικό",
    "...",
    "...",
  ];

  return (
    <>
      <button onClick={getSearchResults}>Αναζήτηση</button>
      <table>
        <tr>{mapToRow(attributes)}</tr>
        {getJSONValues(people)}
      </table>
      <br></br>
    </>
  );
}
