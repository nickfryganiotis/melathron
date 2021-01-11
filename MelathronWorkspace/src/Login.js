import React, { useState } from "react";
import "./Login.css";
//const ipcRenderer = require("electron").ipcRenderer;

export default function Login() {
  const [account, setAccount] = useState({
    username: "",
    passcode: "",
  });

  function tryLogin(acc) {
    fetch("http://localhost:5000/auth", {
      method: "POST",
      body: JSON.stringify(acc),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((resp) => {
      console.log(resp.status);
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
            id ="username"
            onChange={handleAccountChange}
            required
          />
          <input
            type="password"
            name="passcode"
            id = "passcode"
            onChange={handleAccountChange}
            required
          />
          <button type="submit">
            Είσοδος
          </button>
        </form>
      </div>
    </>
  );
}
