import React, { useState } from "react";
import "./Login.css";
//const ipcRenderer = require("electron").ipcRenderer;
import axios from "axios";
import {useHistory} from "react-router-dom"

export default function Login() {
  const [account, setAccount] = useState({
    username: "",
    passcode: "",
  });
  const hist = useHistory();
  function tryLogin(acc) {
    login_options = {
      method: "post",
      url: "http://localhost:5000/login",
      data: account,
    };
    axios(login_options).then((response) => {
      console.log(response)
      hist.push("http://localhost:5000/")
    });
  }

  const handleAccountChange = (e) => {
    const { value, name } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const acc = account;
    console.log(account);

    tryLogin(acc);
  };

  return (
    <>
      <div className="login-form">
        <h1>Είσοδος Χρήστη</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleAccountChange}
            required
          />
          <input
            type="password"
            name="passcode"
            id="passcode"
            onChange={handleAccountChange}
            required
          />
          <button type="submit">Είσοδος</button>
        </form>
      </div>
    </>
  );
}
