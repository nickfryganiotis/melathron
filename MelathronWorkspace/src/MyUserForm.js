import React, { useState, useEffect } from "react";
import "./MyUserForm.css";
import axios from "axios";
import { makeToUnique, arrayToOption } from "./helperFunctions";

export default function MyUserForm() {
  const [phoneList, setPhoneList] = useState([{ phone_number: "" }]);
  const [mobileList, setMobileList] = useState([{ mobile_number: "" }]);
  const [customer, setCustomer] = useState({});
  const [locations, setLocations] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [apotelesmata, setApotelesmata] = useState([]);
  const [salesman, setSalesman] = useState([]);
  const [phones, setPhones] = useState({});

  useEffect(() => {
    var url1 = "http://localhost:5000/apotelesmata";
    var url2 = "http://localhost:5000/locations";
    var url3 = "http://localhost:5000/professions";
    var url4 = "http://localhost:5000/salesman";
    axios
      .all([axios.get(url1), axios.get(url2), axios.get(url3), axios.get(url4)])
      .then(
        axios.spread((obj1, obj2, obj3, obj4) => {
          setApotelesmata(obj1.data);
          setLocations(obj2.data);
          setProfessions(obj3.data);
          setSalesman(obj4.data);
        })
      );
  }, []);

  const handlePhoneChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...phoneList];
    list[index][name] = value;
    setPhoneList(list);
    //setCustomer({ ...customer, phone: phoneList });
    setPhones({ ...phones, phone: phoneList });
  };

  const handleMobileChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...mobileList];
    list[index][name] = value;
    setMobileList(list);
    setPhones({ ...phones, mobile: mobileList });
  };

  const handleRemovePhone = (index) => {
    const list = [...phoneList];
    list.splice(index, 1);
    setPhoneList(list);
  };

  const handleRemoveMobile = (index) => {
    const list = [...mobileList];
    list.splice(index, 1);
    setMobileList(list);
  };

  const handleAddPhone = () => {
    setPhoneList([...phoneList, { phone_number: "" }]);
  };

  const handleAddMobile = () => {
    setMobileList([...mobileList, { mobile_number: "" }]);
  };

  const handleCustomerChange = (e) => {
    const { value, name } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var customer_options = {
      method: "post",
      url: "http://localhost:5000/send",
      data: customer,
    };
    var last_spcode;
    axios(customer_options)
      .then((response) => {
        last_spcode = response.data["spcode"];
        var phone_data = { ...phones, spcode: last_spcode };
        var phone_options = {
          method: "post",
          url: "http://localhost:5000/Graham",
          data: phone_data,
        };

        return axios(phone_options)
          .then((response) => {})
          .catch((error) => console.error("timeout exceeded"));
      })
      .catch((error) => console.error("timeout exceeded"));

    e.target.reset();
    setCustomer({});
    setPhones({});
    setPhoneList([{ phone_number: "" }]);
    setMobileList([{ mobile_number: "" }]);
  };

  return (
    <div className="user-form">
      <h1>Εισαγωγή Νέου Πελάτη</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="last_name">Επώνυμο</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            onChange={handleCustomerChange}
          />
        </div>

        <div>
          <label htmlFor="first_name">Όνομα</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            onChange={handleCustomerChange}
          />
        </div>

        <div>
          <label htmlFor="fathers_name">Πατρώνυμο</label>
          <input
            type="text"
            name="fathers_name"
            id="fathers_name"
            onChange={handleCustomerChange}
          />
        </div>

        <div>
          <label htmlFor="company_name">Επωνυμία Εταιρίας και Δυναμικό</label>
          <input
            type="text"
            name="company_name"
            id="company_name"
            onChange={handleCustomerChange}
          />
          <input
            type="number"
            name="personnel"
            id="personnel"
            style={{ marginLeft: "10px", width: 50 }}
            onChange={handleCustomerChange}
          />
        </div>

        <div>
          <label htmlFor="address_street">Διέυθυνση</label>
          <input
            type="text"
            name="address_street"
            id="address_street"
            onChange={handleCustomerChange}
          />
          <input
            type="text"
            name="address_number"
            id="address_number"
            style={{ marginLeft: "10px", width: 25 }}
            onChange={handleCustomerChange}
          />
          <input
            type="text"
            name="address_postal_code"
            id="address_postal_code"
            style={{ marginLeft: "10px", width: 25 }}
            onChange={handleCustomerChange}
          />
        </div>

        <div>
          <label htmlFor="fax">FAX</label>
          <input
            type="text"
            name="fax"
            id="fax"
            onChange={handleCustomerChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleCustomerChange}
          />
        </div>

        <div>
          <label htmlFor="website">Ιστοσελίδα</label>
          <input
            type="text"
            name="website"
            id="website"
            onChange={handleCustomerChange}
          />
        </div>

        <div>
          {phoneList.map((x, i) => {
            return (
              <div>
                <label htmlFor="phone_number"> {i === 0 && "Τηλέφωνο"}</label>
                <input
                  name="phone_number"
                  value={x.phone_number}
                  onChange={(e) => handlePhoneChange(e, i)}
                />

                {phoneList.length !== 1 && (
                  <button onClick={() => handleRemovePhone(i)}>-</button>
                )}
                {phoneList.length - 1 === i && (
                  <button onClick={handleAddPhone}>+</button>
                )}
              </div>
            );
          })}
        </div>

        <div>
          {mobileList.map((x, i) => {
            return (
              <div>
                <label htmlFor="mobile_number"> {i === 0 && "Κινητό"}</label>
                <input
                  name="mobile_number"
                  value={x.mobile_number}
                  onChange={(e) => handleMobileChange(e, i)}
                />

                {mobileList.length !== 1 && (
                  <button onClick={() => handleRemoveMobile(i)}>-</button>
                )}
                {mobileList.length - 1 === i && (
                  <button onClick={handleAddMobile}>+</button>
                )}
              </div>
            );
          })}
        </div>

        <div>
          <label htmlFor="state">Νομός/ Πολιτεία</label>
          <select name="state" id="state" onChange={handleCustomerChange}>
            <option></option>
            {makeToUnique(locations, "state", customer).map(arrayToOption)}
          </select>
        </div>

        <div>
          <label htmlFor="city">Πόλη</label>
          <select name="city" id="city" onChange={handleCustomerChange}>
            <option></option>
            {makeToUnique(locations, "city", customer, "state").map(
              arrayToOption
            )}
          </select>
        </div>

        <div>
          <label htmlFor="area">Περιοχή</label>
          <select name="area" id="area" onChange={handleCustomerChange}>
            <option></option>
            {makeToUnique(locations, "area", customer, "city").map(
              arrayToOption
            )}
          </select>
        </div>

        <div>
          <label htmlFor="category">Γενική Κατηγορία Επαγγέλματος</label>
          <select name="category" id="category" onChange={handleCustomerChange}>
            <option></option>
            {makeToUnique(professions, "category", customer).map(arrayToOption)}
          </select>
        </div>

        <div>
          <label htmlFor="profession">Επάγγελμα</label>
          <select
            name="profession"
            id="profession"
            onChange={handleCustomerChange}
          >
            <option></option>
            {makeToUnique(professions, "profession", customer, "category").map(
              arrayToOption
            )}
          </select>
        </div>

        <div>
          <label htmlFor="apotelesma_name">
            Γενική Κατηγορία Αποτελέσματος
          </label>
          <select
            name="apotelesma_name"
            id="apotelesma_name"
            onChange={handleCustomerChange}
          >
            <option></option>
            {makeToUnique(apotelesmata, "apotelesma_name", customer).map(
              arrayToOption
            )}
          </select>
        </div>

        <div>
          <label htmlFor="subapotelesma_name">Αποτέλεσμα</label>
          <select
            name="subapotelesma_name"
            id="subapotelesma_name"
            onChange={handleCustomerChange}
          >
            <option></option>
            {makeToUnique(
              apotelesmata,
              "subapotelesma_name",
              customer,
              "apotelesma_name"
            ).map(arrayToOption)}
          </select>
        </div>

        <div>
          <label htmlFor="salesman">Πωλητής</label>
          <select name="salesman" id="salesman" onChange={handleCustomerChange}>
            <option></option>
            {makeToUnique(salesman, "salesman", customer).map(arrayToOption)}
          </select>
        </div>

        <div>
          <label htmlFor="comments">Σχόλια</label>
          <textarea
            name="comments"
            id="comments"
            onChange={handleCustomerChange}
          ></textarea>
        </div>

        <br></br>
        <button type="submit" className="btn btn-danger">
          Εισαγωγή
        </button>
      </form>
    </div>
  );
}
