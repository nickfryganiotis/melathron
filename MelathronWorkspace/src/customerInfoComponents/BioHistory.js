import axios from "axios";
import { React, useEffect, useState } from "react";
import { timeConverter, makeToUnique, arrayToOption, deleteCommon } from "../helperFunctions";

export default function BioHistory({ bioHistory, spcode }) {
  const [biographies, setBiographies] = useState([]);
  const [newBio, setNewBio] = useState({});
  const [bios, setBios] = useState([])
  const [updBio, setUpdBio] = useState({})
  const [status, setStatus] = useState(-1)

  useEffect(() => {
    setNewBio({...newBio , spcode:spcode})
    let bio_options = {
      method: "get",
      url: "http://localhost:5000/biographies",
    };
    axios(bio_options)
      .then((res) => setBiographies(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect( ()=>{
    setBios([...bioHistory])
  } , [bioHistory])


  function newBiography(e) {
    e.preventDefault();
    console.log(newBio)
    let bio_options = {
      method: "post",
      url: "http://localhost:5000/add_biography",
      data: newBio,
    };
    axios(bio_options)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  function handleBioChange(e) {
    const { value, name } = e.target;
    setNewBio({ ...newBio, [name]: value });
  }

  function handleBiographyChange(e){
    const { value, name } = e.target;
    setUpdBio({...updBio, [name] : value})
  }

  function showDropdown(e, dat){
    let row_id = e.target.parentNode.id
    if (status == row_id) {setStatus(-1); setUpdBio({})}
    else {setStatus(row_id) ; setUpdBio( {"instance_date" : Date.parse(dat["instance_date"]), "biography_name" : dat["biography_name"]})}
  }

  function delBiography(e, i, bio, insd){
    e.preventDefault()
    let x = [...bios]
    x.splice(i,1)
    setBios(x)
    let delbio_options = {
      method:"post",
      url : "http://localhost:5000/delete_biography",
      data: {"spcode":spcode, "biography_name" : bio, instance_date: insd }
    }
    axios(delbio_options).then((res)=>console.log(res)).catch((error) => console.log(error))
  }

  function updBiography(e){
    e.preventDefault()
    console.log(updBio)
    let upd_options = {
      method:"post",
      url: "http://localhost:5000/update_biography",
      data: {...updBio, "spcode" : spcode}
    }
    axios(upd_options).then((res) => console.log(res)).catch((error) => console.log(error))
  }

  return (
    <div className='ap-history'>
      <table>
        <tr>
          <th>ΗΜΕΡΟΜΗΝΙΑ ΑΛΛΑΓΗΣ</th>
          <th>ΣΤΑΔΙΟ ΒΙΟΓΡΑΦΙΑΣ</th>
        </tr>
        {bios.map((element, i) => {
          return (
            <tr id={i} onDoubleClick={(e) => {showDropdown(e, element)}}>
              <td>{timeConverter(element["instance_date"])}</td>
              <td>{((status!=i) && element["biography_name"]) || ((status==i) && <select
              name="biography_name"
              id="biography_name"
              onChange={(e) => {handleBiographyChange(e, element["instance_date"])}}
            >
              <option selected>{element["biography_name"]}</option>
              <option>{null}</option>
              {makeToUnique(biographies, "biography_name", updBio).map(
                arrayToOption
              )}
            </select> )}</td>
              <td>
                <button onClick={(e) => delBiography(e,i, element["biography_name"], Date.parse(element["instance_date"]) )} className="btn-plus2">-</button>
                {status==i && <button onClick={updBiography}>ΑΛΛΑΓΗ</button>}
              </td>
            </tr>
          );
        })}
        <tr>
          <td>-</td>
          <td>
            <select
              name="biography_name"
              id="biography_name"
              onChange={handleBioChange}
            >
              <option></option>
              {makeToUnique(biographies, "biography_name", newBio).map(
                arrayToOption
              )}
            </select>
          </td>
          <td>
          <button onClick={newBiography} className="btn-plus2">+</button>
          </td>
        </tr>
      </table>
    </div>
  );
}
