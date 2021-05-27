import React, { useState } from "react";
import {makeToUnique, arrayToOption, sendParameterRequest} from "../../helperFunctions"

export default function AddSubscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newsub, setNewsub] = useState("");
  const ipc = window.require("electron").ipcRenderer;
  ipc.on("subsundromes", (event, message) => {
    setSubscriptions(message);
  });

  function handleSubChange(e) {
    const { value, name } = e.target;
    setNewsub({ ...newsub, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(newsub);
    //console.log(country);
    let x = {...newsub, "continent_id" : subscriptions[0]['continent_id']}
    sendParameterRequest("subscription", x)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subscription_category">ΓΕΝΙΚΗ ΚΑΤΗΓΟΡΙΑ ΣΥΝΔΡΟΜΗΣ</label>
        <select
          name="subscription_category"
          id="subscription_category"
          onChange={handleSubChange}
          required
        >
            <option></option>
                {makeToUnique(subscriptions, "subscription_category", newsub).map(
                  arrayToOption
                )}
        </select>
        <label htmlFor="subscription_name">ΝΕΑ ΣΥΝΔΡΟΜΗ</label>
        <input
          type="text"
          name="subscription_name"
          id="subscription_name"
          onChange={handleSubChange}
          required
        />
        <button type="submit">ΠΡΟΣΘΗΚΗ</button>
      </form>
    </div>
  );
}
