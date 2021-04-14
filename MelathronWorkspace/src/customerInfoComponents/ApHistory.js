import { React } from "react";

export default function ApHistory({ apHistory }) {

  function newApotelesma(e){
    e.preventDefault();
  }


  return (
    <div>
        <table>
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
                <td><button>-</button></td>
              </tr>
            );
          })}
        </table>
        <button onClick={newApotelesma}>+</button>
    </div>
  );
}
