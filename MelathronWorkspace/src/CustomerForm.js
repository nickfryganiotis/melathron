import React, { useState, useEffect } from "react";
import "./MyUserForm.css";
import axios from "axios";
import { makeToUnique, arrayToOption, loadAreaChoice } from "./helperFunctions";
import { useRef } from "react";
import ReactSelect from "react-select";

export default function CustomerForm() {
  const [phoneList, setPhoneList] = useState([{ phone_number: "" }]);
  const [mobileList, setMobileList] = useState([{ mobile_number: "" }]);
  const [customer, setCustomer] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([])
  const [categories, setCategories] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [apotelesmata, setApotelesmata] = useState([]);
  const [salesman, setSalesman] = useState([]);
  const [phones, setPhones] = useState({});
  const [areaChoice, setAreaChoice] = useState({});
  const apref = useRef(null);
  const stref = useRef(null);
  const ctref = useRef(null);
  /*useEffect(() => {
    loadAreaChoice(setAreaChoice);
  }, []);*/

  useEffect(() => {
    let area = JSON.parse(localStorage.getItem("area_choice"));
    loadAreaChoice(setAreaChoice);
    setCustomer({
      ...customer,
      continent_id: area["continent_id"],
      country_id: area["country_id"],
    });
    let apotelesmata_options = {
      method: "post",
      url: "http://localhost:5000/apotelesmata",
      data: { continent_id: area["continent_id"] },
    };
    let states_options = {
      method: "post",
      url: "http://localhost:5000/states",
      data: { country_id: area["country_id"] },
    };
    let cities_options = {
        method: "post",
        url: "http://localhost:5000/cities",
        data: { country_id: area["country_id"] },
      };
    let areas_options = {
        method: "post",
        url: "http://localhost:5000/areas",
        data: { country_id: area["country_id"] },
      };
    let professions_options = "http://localhost:5000/professions";
    let salesman_options = "http://localhost:5000/salesman";
    let categories_options = "http://localhost:5000/categories";
    axios
      .all([
        axios(apotelesmata_options),
        axios(states_options),
        axios(cities_options),
        axios(areas_options),
        axios.get(professions_options),
        axios.get(salesman_options),
        axios.get(categories_options),
      ])
      .then(
        axios.spread((obj1, obj2, obj3, obj4, obj5, obj6, obj7) => {
          setApotelesmata(obj1.data);
          setStates(obj2.data);
          setCities(obj3.data);
          setAreas(obj4.data)
          setProfessions(obj5.data);
          setSalesman(obj6.data);
          setCategories(obj7.data);
        })
      );
    console.log(areaChoice);
    console.log(states)
  }, []);

  const handlePhoneChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...phoneList];
    list[index][name] = value;
    setPhoneList(list);
    setCustomer({ ...customer, phone: phoneList });
    //setPhones({ ...phones, phone: phoneList });
  };

  const handleMobileChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...mobileList];
    list[index][name] = value;
    setMobileList(list);
    setCustomer({ ...customer, mobile: mobileList });
    //setPhones({ ...phones, mobile: mobileList });
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
    console.log(customer);
    var customer_options = {
      method: "post",
      url: "http://localhost:5000/send",
      data: customer,
    };
    axios(customer_options)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    e.target.reset();
    setCustomer({});
    setCustomer({
      ...customer,
      continent_id: areaChoice["continent_id"],
      country_id: areaChoice["country_id"],
    });
    setPhones({});
    setPhoneList([{ phone_number: "" }]);
    setMobileList([{ mobile_number: "" }]);
  };



  return (
    <div className="total-main-page2">
      <div className="user-form2">
        <h1>Εισαγωγή Νέου Πελάτη</h1>
        <form onSubmit={handleSubmit}>
          <div className="user-form-line2">
            <div className="form-input2 left2">
              <label htmlFor="last_name">Επώνυμο</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                onChange={handleCustomerChange}
                required
              />
            </div>

            <div className="form-input2 left2">
              <label htmlFor="first_name">Όνομα</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                onChange={handleCustomerChange}
                required
              />
            </div>

            <div className="form-input2">
              <label htmlFor="fathers_name">Πατρώνυμο</label>
              <input
                type="text"
                name="fathers_name"
                id="fathers_name"
                onChange={handleCustomerChange}
              />
            </div>
          </div>
          <div className="user-form-line2">
            <div className="form-input2 left2">
              <label htmlFor="company_name">Επωνυμία Εταιρίας</label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                onChange={handleCustomerChange}
              />
            </div>
            <div className="form-input2 number2">
              <label htmlFor="personnel">Δυναμικό</label>
              <input
                type="number"
                name="personnel"
                id="personnel"
                onChange={handleCustomerChange}
              />
            </div>
          </div>

          <div className="user-form-line2">
            <div className="form-input2 left2">
              <label htmlFor="address_street">Διέυθυνση</label>
              <input
                type="text"
                name="address_street"
                id="address_street"
                onChange={handleCustomerChange}
              />
            </div>
            <div className="form-input2 left2 number2">
              <label htmlFor="address_number">Αριθμός</label>
              <input
                type="text"
                name="address_number"
                id="address_number"
                onChange={handleCustomerChange}
              />
            </div>
            <div className="form-input2 number2">
              <label htmlFor="address_postal_code">Τ.Κ.</label>
              <input
                type="text"
                name="address_postal_code"
                id="address_postal_code"
                onChange={handleCustomerChange}
              />
            </div>
          </div>

          <div className="user-form-line2">
            <div className="form-input2 left2">
              <label htmlFor="fax">FAX</label>
              <input
                type="text"
                name="fax"
                id="fax"
                onChange={handleCustomerChange}
              />
            </div>

            <div className="form-input2 left2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleCustomerChange}
              />
            </div>

            <div className="form-input2">
              <label htmlFor="website">Ιστοσελίδα</label>
              <input
                type="text"
                name="website"
                id="website"
                onChange={handleCustomerChange}
              />
            </div>
          </div>
          <div className="user-form-line2">
            <div className="form-input2 left2">
              {phoneList.map((x, i) => {
                return (
                  <div>
                    <label htmlFor="phone_number">
                      {" "}
                      {i === 0 && "Τηλέφωνο"}
                    </label>
                    <div className="maria">
                      <input
                        type="text"
                        name="phone_number"
                        value={x.phone_number}
                        onChange={(e) => handlePhoneChange(e, i)}
                      />

                      {phoneList.length !== 1 && (
                        <button
                          className="btn-plus"
                          onClick={() => handleRemovePhone(i)}
                        >
                          -
                        </button>
                      )}
                      {phoneList.length - 1 === i && (
                        <button className="btn-plus" onClick={handleAddPhone}>
                          +
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="form-input2">
              {mobileList.map((x, i) => {
                return (
                  <div>
                    <label htmlFor="mobile_number">
                      {" "}
                      {i === 0 && "Κινητό"}
                    </label>
                    <div className="maria">
                      <input
                        type="text"
                        name="mobile_number"
                        value={x.mobile_number}
                        onChange={(e) => handleMobileChange(e, i)}
                      />

                      {mobileList.length !== 1 && (
                        <button
                          className="btn-plus"
                          onClick={() => handleRemoveMobile(i)}
                        >
                          -
                        </button>
                      )}
                      {mobileList.length - 1 === i && (
                        <button className="btn-plus" onClick={handleAddMobile}>
                          +
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="user-form-line2">
            <div className="form-input2 left2">
              <label htmlFor="state_id">Νομός/ Πολιτεία</label>
              <select name="state_id" id="state_id" onChange={handleCustomerChange} ref={stref}>
                <option></option>
                {states.map( (element)=> {
                    return <option value={element["state_id"]}>{element["state_name"]}</option>
                })}
              </select>
            </div>

           <div className="form-input2 left2">
              <label htmlFor="city_id">Πόλη</label>
              <select name="city_id" id="city_id" onChange={handleCustomerChange} ref={ctref}>
                <option></option>
                {cities.map((element) => {
                  if (element["state_id"] == stref.current.value)
                    return (
                      <option value={element["city_id"]}>
                        {element["city_name"]}
                      </option>
                    );
                })}
              </select>
            </div>

            <div className="form-input2 left2">
              <label htmlFor="area_id">Περιοχή</label>
              <select name="area_id" id="area_id" onChange={handleCustomerChange}>
                <option></option>
                {areas.map((element) => {
                  if (element["city_id"] == ctref.current.value)
                    return (
                      <option value={element["area_id"]}>
                        {element["area_name"]}
                      </option>
                    );
                })}
              </select>
            </div>
            </div>

          <div className="user-form-line2">
            <div className="form-input2 left2">
              <label htmlFor="category_name">
                Γενική Κατηγορία Επαγγέλματος
              </label>
              <select
                name="category_name"
                id="category_name"
                onChange={handleCustomerChange}
              >
                <option></option>
                {makeToUnique(categories, "category_name", customer).map(
                  arrayToOption
                )}
              </select>
            </div>

            <div className="form-input2">
              <label htmlFor="profession_name">Επάγγελμα</label>
              <select
                name="profession_name"
                id="profession_name"
                onChange={handleCustomerChange}
              >
                <option></option>
                {makeToUnique(professions, "profession_name", customer).map(
                  arrayToOption
                )}
              </select>
            </div>
          </div>

          <div className="user-form-line2">
            <div className="form-input2 left2">
              <label htmlFor="apotelesma_name">
                Γενική Κατηγορία Αποτελέσματος
              </label>
              <select
                ref={apref}
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
            <div className="form-input2">
              <label htmlFor="subapotelesma_name">Αποτέλεσμα</label>
              <select
                name="subapotelesma_name"
                id="subapotelesma_name"
                onChange={handleCustomerChange}
              >
                {apotelesmata.map((element) => {
                  if (element["apotelesma_name"] == apref.current.value)
                    return (
                      <option value={element["subapotelesma_name"]}>
                        {element["subapotelesma_name"]}
                      </option>
                    );
                })}
              </select>
            </div>
          </div>

          <div className="user-form-line2">
            <div className="form-input2">
              <label htmlFor="salesman_name">Πωλητής</label>
              <select
                name="salesman_name"
                id="salesman_name"
                onChange={handleCustomerChange}
              >
                <option value={null}></option>
                {salesman.map((element) => (
                  <option value={element["salesman_name"]}>
                    {element["salesman_name"]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="user-form-line2">
            <div className="form-input2">
              <label htmlFor="comments">Σχόλια</label>
              <textarea
                name="comments"
                id="comments"
                onChange={handleCustomerChange}
              ></textarea>
            </div>
          </div>
          <br></br>
          <div className="center2">
            <button type="submit" className="btn btn-danger choice-btn2">
              Εισαγωγή
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
