import axios from "axios";
import React, { useState, useEffect } from "react";
import { loadAreaChoice } from "../helperFunctions";
import "../MyUserForm";

export default function LocationsPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [areaChoice, setAreaChoice] = useState({});
  const [adminPriv, setAdminPriv] = useState(true);

  useEffect(() => {
    //let area = JSON.parse(localStorage.getItem("area_choice"));
    let area = window.require("electron").remote.getGlobal("contexts").areaChoice
    setAreaChoice(area)
    setAdminPriv(window.require("electron").remote.getGlobal("contexts").isAdmin)
    //loadAreaChoice(setAreaChoice);
    let locations_options = {
      method: "post",
      url: "http://localhost:5000/location_parameters",
      data: { country_id: area["country_id"] },
    };
    axios(locations_options)
      .then((res) => {
        setStates(res.data[0])
        setAreas(res.data[1])
        setCities(res.data[2])
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
    if (window_type == "add_state") {
      win2.loadURL("http://localhost:3000/add_state_window");
      win2.webContents.on("did-finish-load", () => {
        win2.webContents.send("locs", areaChoice["country_id"] );
      });
    } else if (window_type == "add_city") {
      win2.loadURL("http://localhost:3000/add_city_window");
      win2.webContents.on("did-finish-load", () => {
        win2.webContents.send("cities", states );
      });
    } else if (window_type == "add_area") {
      win2.loadURL("http://localhost:3000/add_area_window");
      win2.webContents.on("did-finish-load", () => {
        win2.webContents.send("areas", areaChoice );
      });
    }else {
      console.log("ERROR");
    }
  }

    return (
      <div className="total-main-page2">
        <div className="user-form2">
        <table>
          <tr>
            <th>ΚΩΔΙΚΟΣ</th>
            <th>ΝΟΜΟΣ/ΠΟΛΙΤΕΙΑ</th>
          </tr>
          {states.map((element) => {
            return (
              <tr>
                <td>{element["state_id"]}</td>
                <td>{element["state_name"]}</td>
              </tr>
            );
          })}
        </table>
        {adminPriv && <button onClick={(e) => createBrowserWindow("add_state")}>ΝΕΟΣ ΝΟΜΟΣ/ΠΟΛΙΤΕΙΑ</button>}
        <table>
          <tr>
            <th>ΚΩΔΙΚΟΣ</th>
            <th>ΠΟΛΗ</th>
          </tr>
          {cities.map((element) => {
            return (
              <tr>
                <td>{element["city_id"]}</td>
                <td>{element["city_name"]}</td>
              </tr>
            );
          })}
        </table>
        {adminPriv && <button onClick={(e) => createBrowserWindow("add_city")}>ΝΕΑ ΠΟΛΗ</button>}
        <table>
          <tr>
            <th>ΚΩΔΙΚΟΣ</th>
            <th>ΠΕΡΙΟΧΗ</th>
          </tr>
          {areas.map((element) => {
            return (
              <tr>
                <td>{element["area_id"]}</td>
                <td>{element["area_name"]}</td>
              </tr>
            );
          })}
        </table>
        {adminPriv && <button onClick={(e) => createBrowserWindow("add_area")}>ΝΕΑ ΠΕΡΙΟΧΗ</button>}
      </div>
      </div>
    );

}
