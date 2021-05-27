import axios from "axios";
import React, { useState, useEffect } from "react";

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState([])
    const [adminPriv, setAdminPriv] = useState(true);

    useEffect(() => {
        let area = JSON.parse(localStorage.getItem("area_choice"));
        //loadAreaChoice(setAreaChoice);
        let subscriptions_options = {
          method: "post",
          url: "http://localhost:5000/subscriptions",
          data: { country_id: area["country_id"] },
        };
        axios(subscriptions_options)
          .then((res) => {
            setSubscriptions(res.data);
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
        if (window_type == "add_subscription_category") {
          win2.loadURL("http://localhost:3000/add_subscription_category_window");
          win2.webContents.on("did-finish-load", () => {
            win2.webContents.send("sundromes", subscriptions[0]['country_id']);
          });
        } else if (window_type == "add_subscription") {
          win2.loadURL("http://localhost:3000/add_subscription_window");
          win2.webContents.on("did-finish-load", () => {
            win2.webContents.send("subsundromes", subscriptions);
          });
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
            <th>ΚΑΤΗΓΟΡΙΑ ΣΥΝΔΡΟΜΗΣ</th>
            <th>ΣΥΝΔΡΟΜΗ</th>
          </tr>
          {subscriptions.map((element) => {
            return (
              <tr>
                <td>{element["subscription_id"]}</td>
                <td>{element["subscription_category"]}</td>
                <td>{element["subscription_name"]}</td>
              </tr>
            );
          })}
        </table>
        {adminPriv && <button onClick={(e) => createBrowserWindow("add_subscription_category")}>ΝΕA ΚΑΤΗΓΟΡΙΑ ΣΥΝΔΡΟΜΗΣ</button>}
        {adminPriv && <button onClick={(e) => createBrowserWindow("add_subscription")}>ΝΕΑ ΣΥΝΔΡΟΜΗ</button>}
      </div>
      </div>
    );

}