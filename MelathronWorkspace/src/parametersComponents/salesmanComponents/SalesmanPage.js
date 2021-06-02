import axios from "axios";
import React, { useState, useEffect } from "react";

export default function SalesmanPage() {
    const [salesman, setSalesman] = useState([])
    const [adminPriv, setAdminPriv] = useState(false);

    useEffect(() => {
        setAdminPriv(window.require("electron").remote.getGlobal("contexts").isAdmin)
        axios.get("http://localhost:5000/salesman")
          .then((res) => {
            setSalesman(res.data);
          })
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
        if (window_type == "add_salesman") {
          win2.loadURL("http://localhost:3000/add_salesman_window");
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
            <th>ΠΩΛΗΤΗΣ</th>
          </tr>
          {salesman.map((element) => {
            return (
              <tr>
                <td>{element["salesman_id"]}</td>
                <td>{element["salesman_name"]}</td>
              </tr>
            );
          })}
        </table>
        {adminPriv && <button onClick={(e) => createBrowserWindow("add_salesman")}>ΝΕΟΣ ΠΩΛΗΤΗΣ</button>}
      </div>
      </div>
    );

}