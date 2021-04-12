import { React } from "react";

export default function ApHistory({ apHistory }) {
  return (
    <div>
      {
        <table className="elli">
          <tr>
            <th>Ημερομηνία Αλλαγής</th>
            <th>Γενική Κατηγορία Αποτελέσματος</th>
            <th>Αποτέλεσμα</th>
          </tr>
          {apHistory.map((element) => {
            return (
              <tr>
                <td>{Date.parse((element["instance_date"]))}</td>
                <td>{element["apotelesma_name"]}</td>
                <td>{element["subapotelesma_name"]}</td>
              </tr>
            );
          })}
        </table>
      }
    </div>
  );
}
