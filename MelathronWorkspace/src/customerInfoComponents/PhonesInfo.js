import axios from "axios";
import { React, useEffect, useState } from "react";

export default function PhonesInfo({ phoness, spcode }) {
  const [phones, setPhones] = useState([]);
  const [addPhon, setAddPhon] = useState({});

  useEffect(() => {
    setPhones(phoness);
  }, [phoness]);

  function delPhone(e, id, idx) {
    e.preventDefault();
    let delOptions = {
      method: "post",
      url: "http://localhost:5000/delete_phone",
      data: { phone_number: id, spcode: spcode },
    };

    axios(delOptions)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    let pho = [...phones];
    pho.splice(idx, 1);
    setPhones(pho);
  }

  function handleCustomerChange(e) {
    const { value, name } = e.target;
    setAddPhon({ [name]: value });
  }

  function addPhone(e) {
    e.preventDefault();
    let addOptions = {
      method: "post",
      url: "http://localhost:5000/add_phone",
      data: { phone_number: addPhon["phone_number"], spcode: spcode },
    };
    console.log(addPhon);
    axios(addOptions)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  return (
    <table>
      <tr>
        <th>Σταθερά Τηλέφωνα</th>
      </tr>
      {phones.map((element, i) => {
        return (
          <tr>
            <td>{element["phone_number"]}</td>
            <td>
              <button onClick={(e) => delPhone(e, element["phone_number"], i)}>
                -
              </button>
            </td>
          </tr>
        );
      })}
      <tr>
        <input
          type="text"
          name="phone_number"
          id="phone_number"
          onChange={handleCustomerChange}
        />
      </tr>
      <button onClick={addPhone}>+</button>
    </table>
  );
}
