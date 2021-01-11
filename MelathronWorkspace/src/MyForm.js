import React from "react";
import { useFormik, FieldArray, Field, Form } from "formik";
import "./MyForm.css";

  /* const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customer);
    const cust = customer;
    console.log(cust);
    fetch("http://localhost:5000/send", {
      method: "POST",

      body: JSON.stringify(cust),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setCustomer({});
    setPhoneList([{ "phone_number": "" }]);
    setMobileList([{ "mobile_number": "" }]);
  };*/
    /*const getLocations = useCallback(() => {
    async function sendQuery() {
      try {
        const response = await fetch("http://localhost:5000/locations");
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
      } catch (error) {
        return console.warn(error);
      }
    }

    sendQuery().then((response) => setLocations(response));
    //console.log(locations.state);
  }, []);

  const getProfessions = useCallback(() => {
    async function sendQuery() {
      try {
        const response = await fetch("http://localhost:5000/professions");
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
      } catch (error) {
        return console.warn(error);
      }
    }

    sendQuery().then((response) => setProfessions(response));
    //console.log(professions.state);
  }, []);

  const getApotelesmata = useCallback(() => {
    async function sendQuery() {
      try {
        const response = await fetch("http://localhost:5000/apotelesmata");
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
      } catch (error) {
        return console.warn(error);
      }
    }

    sendQuery().then((response) => setApotelesmata(response));
  }, []);

  const getSalesman = useCallback(() => {
    async function sendQuery() {
      try {
        const response = await fetch("http://localhost:5000/salesman");
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
      } catch (error) {
        return console.warn(error);
      }
    }

    sendQuery().then((response) => setSalesman(response));
    //console.log(salesman.state);
  }, []);

  useEffect(() => {
    getApotelesmata();
    getLocations();
    getProfessions();
    getSalesman();
  }, [getApotelesmata, getLocations, getProfessions, getSalesman]);
*/


/*const getSalesman = useCallback(() => {
    async function sendQuery() {
      try {
        const response = await fetch("http://localhost:5000/salesman");
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
      } catch (error) {
        return console.warn(error);
      }
    }

    sendQuery().then((response) => setSalesman(response));
    //console.log(salesman);
  }, []);

  const getSubscriptions = useCallback(() => {
    async function sendQuery() {
      try {
        const response = await fetch("http://localhost:5000/subscriptions");
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
      } catch (error) {
        return console.warn(error);
      }
    }

    sendQuery().then((response) => setSubscriptions(response));
    //console.log(subscriptions);
  }, []);

  const getShippingMethods = useCallback(() => {
    async function sendQuery() {
      try {
        const response = await fetch("http://localhost:5000/shipping_methods");
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
      } catch (error) {
        return console.warn(error);
      }
    }

    sendQuery().then((response) => setShippingMethods(response));
    //console.log(shippingMethods);
  }, []);

  useEffect(() => {
    getSalesman();
    getSubscriptions();
    getShippingMethods();
  }, [getSalesman, getSubscriptions, getShippingMethods]);*/
export default function MyForm() {
  const customer = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      fathers_name: "",
      company_name: "",
      personnel: 0,
      website: "",
      email: "",
      address_street: "",
      address_number: "",
      address_postal_code: "",
      comments: "",
      phones: [""],
      mobiles: [],
    },
    onSubmit: (values) => {
      console.log("Form Data: ", values);
    },
  });

  return (
    <>
      <form onSubmit={customer.handleSubmit}>
        <div>
          <label htmlFor="first_name">Όνομα</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={customer.handleChange}
            value={customer.values.first_name}
          />
        </div>
        <div>
          <label htmlFor="last_name">Επώνυμο</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            onChange={customer.handleChange}
            value={customer.values.last_name}
          />
        </div>
        <div>
          <label htmlFor="fathers_name">Πατρώνυμο</label>
          <input
            type="text"
            id="fathers_name"
            name="fathers_name"
            onChange={customer.handleChange}
            value={customer.values.fathers_name}
          />
        </div>

        <div>
          <label htmlFor="company_name">Επωνυμία Εταιρίας και Δυναμικό</label>
          <input
            type="text"
            name="company_name"
            id="company_name"
            onChange={customer.handleChange}
            value={customer.values.company_name}
          />
          <input
            type="number"
            name="personnel"
            id="personnel"
            style={{ marginLeft: "10px", width: 50 }}
            onChange={customer.handleChange}
            value={customer.values.personnel}
          />
        </div>

        <div>
          <label htmlFor="address_street">Διέυθυνση</label>
          <input
            type="text"
            name="address_street"
            id="address_street"
            onChange={customer.handleChange}
            value={customer.values.address_street}
          />
          <input
            type="text"
            name="address_number"
            id="address_number"
            style={{ marginLeft: "10px", width: 25 }}
            onChange={customer.handleChange}
            value={customer.values.address_number}
          />
          <input
            type="text"
            name="address_postal_code"
            id="address_postal_code"
            style={{ marginLeft: "10px", width: 25 }}
            onChange={customer.handleChange}
            value={customer.values.address_postal_code}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={customer.handleChange}
            value={customer.values.email}
          />
        </div>

        <div>
          <label htmlFor="website">Ιστοσελίδα</label>
          <input
            type="text"
            name="website"
            id="website"
            onChange={customer.handleChange}
            value={customer.values.website}
          />
        </div>

        <div className="form-control">
          <label>Λίστα Τηλεφώνων</label>
          <FieldArray name='phones'>
            {
              (fieldArrayProps) => {
                console.log(fieldArrayProps)
                return <div>FieldArray</div>
              }
            }
          </FieldArray>
        </div>

        <button type="submit">Υποβολή</button>
      </form>
    </>
  );
}
