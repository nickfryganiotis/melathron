import { React } from "react";

export default function SalesMade({ sales }) {
  return (
    <div>
      <table>
        <tr>
          <th>Κωδικός Πώλησης</th>
          <th>Ημερομηνία Παραγγελίας</th>
          <th>Συνολικό Ποσό Πληρωμής</th>
          <th>Voucher</th>
          <th>Αριθμός Δόσεων</th>
          <th>Εξοφλημένη</th>
          <th>Πωλητής</th>
          <th>Κατηγορία Συνδρομής</th>
          <th>Συνδρομή</th>
        </tr>
        {sales.map((element) => {
          return (
            <tr>
              <td>{element["sale_id"]}</td>
              <td>{Date.parse(element["instance_date"])}</td>
              <td>{element["total_amount"]}</td>
              <td>{element["voucher"]}</td>
              <td>{element["number_of_doses"]}</td>
              <td>{element["paid"] ? "Ναι" : "Όχι"}</td>
              <td>{element["salesman_name"]}</td>
              <td>{element["subscription_category"]}</td>
              <td>{element["subscription_name"]}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
