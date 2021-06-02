import axios from "axios";
import React, { useState, useEffect } from "react";

export default function LocationsPage() {
  const [professions, setProfessions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adminPriv, setAdminPriv] = useState(true);

  useEffect(() => {
    setAdminPriv(window.require("electron").remote.getGlobal("contexts").isAdmin)
    axios
    .all([
      axios.get("http://localhost:5000/categories"),
      axios.get("http://localhost:5000/professions"),
    ])
      .then(axios.spread((obj1, obj2) => {
        setCategories(obj1.data);
        setProfessions(obj2.data);
        console.log(obj2.data)
      }))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function createBrowserWindow(window_type) {
    const BrowserWindow = window.require("electron").remote.BrowserWindow;
    const remote = window.require('electron').remote;
    const win2 = new BrowserWindow({
      height: 200,
      width: 400,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
      parent: remote.getCurrentWindow(),
      modal: true
    });
    win2.setMenu(null);
    win2.webContents.openDevTools();
    if (window_type == "add_category") {
      win2.loadURL("http://localhost:3000/add_category_window");
    } else if (window_type == "add_profession") {
      win2.loadURL("http://localhost:3000/add_profession_window");
    } else {
      console.log("ERROR");
    }
  }


    return (
      <div className="total-main-page2">
        <div className="user-form2">
        <table>
          <tr>
            <th>ΚΩΔΙΚΟΣ</th>
            <th>ΚΑΤΗΓΟΡΙΑ ΕΠΑΓΓΕΛΜΑΤΟΣ</th>
          </tr>
          {categories.map((element) => {
            return (
              <tr>
                <td>{element["category_id"]}</td>
                <td>{element["category_name"]}</td>
              </tr>
            );
          })}
        </table>
        {adminPriv && <button onClick={(e) => createBrowserWindow("add_category")}>ΝΕA ΚΑΤΗΓΟΡΙΑ ΕΠΑΓΓΕΛΜΑΤΟΣ</button>}
        <table>
          <tr>
            <th>ΚΩΔΙΚΟΣ</th>
            <th>ΕΠΑΓΓΕΛΜΑ</th>
          </tr>
          {professions.map((element) => {
            return (
              <tr>
                <td>{element["profession_id"]}</td>
                <td>{element["profession_name"]}</td>
              </tr>
            );
          })}
        </table>
        {adminPriv && <button onClick={(e) => createBrowserWindow("add_profession")}>ΝΕΟ ΕΠΑΓΓΕΛΜΑ</button>}
      </div>
      </div>
    );

}