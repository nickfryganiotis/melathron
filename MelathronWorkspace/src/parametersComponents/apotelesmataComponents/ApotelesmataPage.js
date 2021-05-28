import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ApotelesmataPage() {
  const [apotelesmata, setApotelesmata] = useState([]);
  const [adminPriv, setAdminPriv] = useState(true);

  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    //loadAreaChoice(setAreaChoice);
    let apotelesmata_options = {
      method: "post",
      url: "http://localhost:5000/apotelesmata",
      data: { continent_id: area["continent_id"] },
    };
    axios(apotelesmata_options)
      .then((res) => {
        setApotelesmata(res.data);
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
    if (window_type == "add_apotelesma") {
      win2.loadURL("http://localhost:3000/add_apotelesma_window");
      win2.webContents.on("did-finish-load", () => {
        win2.webContents.send("apotelesmata", apotelesmata[0]['continent_id']);
      });
    } else if (window_type == "add_subapotelesma") {
      win2.loadURL("http://localhost:3000/add_subapotelesma_window");
      win2.webContents.on("did-finish-load", () => {
        win2.webContents.send("subapotelesmata", apotelesmata);
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
          <th>ΚΑΤΗΓΟΡΙΑ ΑΠΟΤΕΛΕΣΜΑΤΟΣ</th>
          <th>ΑΠΟΤΕΛΕΣΜΑ</th>
        </tr>
        {apotelesmata.map((element) => {
          return (
            <tr>
              <td>{element["apotelesma_id"]}</td>
              <td>{element["apotelesma_name"]}</td>
              <td>{element["subapotelesma_name"]}</td>
            </tr>
          );
        })}
      </table>
      {adminPriv && <button onClick={(e) => createBrowserWindow("add_apotelesma")}>ΝΕA ΚΑΤΗΓΟΡΙΑ ΑΠΟΤΕΛΕΣΜΑΤΟΣ</button>}
      {adminPriv && <button onClick={(e) => createBrowserWindow("add_subapotelesma")}>ΝΕΟ ΑΠΟΤΕΛΕΣΜΑ</button>}
    </div>
    </div>
  );
}
