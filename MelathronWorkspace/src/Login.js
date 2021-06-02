import React, { useEffect, useState} from "react";
import "./MyForm.css";
import axios from "axios";
import {useHistory} from "react-router-dom"
const ipc = window.require('electron').ipcRenderer
const remote = window.require('electron').remote

export default function Login() {

  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const hist = useHistory();
  function tryLogin(acc) {
    let login_options = {
      method: "post",
      url: "http://localhost:5000/sign_in",
      data: account,
    };
    axios(login_options).then((response) => {
      if (response.status === 200){
        alert("Η ΕΙΣΟΔΟΣ ΗΤΑΝ ΕΠΙΤΥΧΗΣ!")
        hist.push("/area_choice")
        remote.getGlobal("contexts").isAdmin = (response.data.user.admin_priv === 1)
      }
      else{
        alert(response)
      }

    })
    .catch((error) => {
      if (error.response.status === 401){
        alert("ΛΑΘΟΣ ΟΝΟΜΑ ΧΡΗΣΤΗ Ή ΚΩΔΙΚΟΣ")
      }
      else{
        alert("ΣΦΑΛΜΑ ΣΥΣΤΗΜΑΤΟΣ")
      }

    });
  }

  useEffect(()=> {
    ipc.send('authenticated', false)
  }, [])

  const handleAccountChange = (e) => {
    const { value, name } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const acc = account;
    console.log(account);

    tryLogin(acc);
    e.target.reset();
  };

  return (
    <div className='total-main-page'>
      <div className="user-form-div">
      <div className="user-form-image"></div>
      <div className="user-form">
        <h1>ΕΙΣΟΔΟΣ ΧΡΗΣΤΗ</h1>
        <form  onSubmit={handleLogin}>
          <div>
          <label htmlFor="username">ΟΝΟΜΑ ΧΡΗΣΤΗ</label>
          <input
          className='user-form-select'
            type="text"
            name="username"
            id="username"
            onChange={handleAccountChange}
            required
          />
          </div>
          <div>
          <label htmlFor="password">ΚΩΔΙΚΟΣ ΧΡΗΣΤΗ</label>
          <input
          className='user-form-select'
            type="password"
            name="password"
            id="password"
            onChange={handleAccountChange}
            required
          />
          </div>
          <br></br>
        <br></br>
        <br></br>
        <div className='center'>
          <button type="submit" className="btn btn-danger choice-btn">
            Επιλογή
          </button>
        </div>
        </form>
        </div>
      </div>
    </div>
  );
}
