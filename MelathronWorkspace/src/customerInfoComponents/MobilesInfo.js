import axios from "axios";
import { React, useEffect, useState } from "react";

export default function MobilesInfo({ mobiless, spcode }) {
  const [mobiles, setMobiles] = useState([]);
  const [addMob, setAddMob] = useState({});

  useEffect(() => {
    setMobiles(mobiless);
  }, [mobiless]);

  function delMobile(e, id, idx) {
    e.preventDefault();
    let delOptions = {
      method: "post",
      url: "http://localhost:5000/delete_mobile",
      data: { mobile_number: id, spcode: spcode },
    };

    axios(delOptions)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    let mob = [...mobiles];
    mob.splice(idx, 1);
    setMobiles(mob);
  }

  function handleCustomerChange(e) {
    const { value, name } = e.target;
    setAddMob({ [name]: value });
  }

  function addMobile(e) {
    e.preventDefault();
    let addOptions = {
      method: "post",
      url: "http://localhost:5000/add_mobile",
      data: { mobile_number: addMob["mobile_number"], spcode: spcode },
    };
    console.log(addMob);
    axios(addOptions)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  return (
    <table>
      <tr>
        <th>Κινητά Τηλέφωνα</th>
      </tr>
      {mobiles.map((element, i) => {
        return (
          <tr>
            <td>{element["mobile_number"]}</td>
            <td>
              <button onClick={(e) => delMobile(e, element["mobile_number"], i)} className="btn-plus2 btn-minus">
                -
              </button>
            </td>
          </tr>
        );
      })}
      <tr>
        <td>
          <input
            type="text"
            name="mobile_number"
            id="mobile_number"
            onChange={handleCustomerChange}
            className='search-select'
          />
        </td>
        <td>
        <button onClick={addMobile} className="btn-plus2">+</button>
        </td>
      </tr>
    </table>
  );
}
