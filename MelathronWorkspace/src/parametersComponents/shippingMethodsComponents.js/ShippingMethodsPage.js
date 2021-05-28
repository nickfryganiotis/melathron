import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ShippingMethodsPage() {
    const [shippingMethods, setShippingMethods] = useState([])
    const [adminPriv, setAdminPriv] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/shipping_methods")
          .then((res) => {
            setShippingMethods(res.data);
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
        if (window_type == "add_shipping_method") {
          win2.loadURL("http://localhost:3000/add_shipping_method_window");
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
            <th>ΤΡΟΠΟΣ ΠΑΡΑΔΟΣΗΣ</th>
          </tr>
          {shippingMethods.map((element) => {
            return (
              <tr>
                <td>{element["shipping_method_id"]}</td>
                <td>{element["shipping_method_name"]}</td>
              </tr>
            );
          })}
        </table>
        {adminPriv && <button onClick={(e) => createBrowserWindow("add_shipping_method")}>ΝΕΟΣ ΤΡΟΠΟΣ ΠΑΡΑΔΟΣΗΣ</button>}
      </div>
      </div>
    );

}