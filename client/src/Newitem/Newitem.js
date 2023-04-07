import { exchangeContext } from "../App.js";
import "./Newitem.css";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Newitem() {
  const { srvPort, user, setUser, currItems, setItems, currItem, setItem } =
    React.useContext(exchangeContext);
  let params = useParams();
  let detailedItem = currItems.find(element => element.Id === params.Id);
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    "itemName": "",
    "description": "",
    "quantity": ""
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setInputs(values => ({...values, [name]: value }))
  }

  async function updateInventory() {
    fetch(`http://localhost:${srvPort}/`)
    .then(res => res.json())
    .then(items => setItems(items))
  }

  // Get a specific user
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(event.target)
    // console.log([{
    //   "UserId": user.UserId,
    //   "ItemName": event.target[0].value,
    //   "Description": event.target[1].value,
    //   "Quantity": event.target[2].value
    // }])
    await fetch(`http://localhost:${srvPort}/newitem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      body: JSON.stringify({
        "UserId": user.UserId,
        "ItemName": event.target[0].value,
        "Description": event.target[1].value,
        "Quantity": event.target[2].value
      })
    })
    .then(res => res.json())
    .then(data => updateInventory())
    .then(navigate(`/`))
    .catch(err => err.errorMessage)
    console.log("Submission Successful");
  }


  //
  return (

    <div className=" home-wrapper mt-10 ">
      <div className="trainer-section ">
        { user.hasOwnProperty('UserId') ?
          <div>
            <h1 className="custom-title parent">EDITOR MODE</h1>
            <div className="viewed-items spacer">
              <form className="advancedForm rounded-2x1 single-item expanded-form" onSubmit={handleSubmit}>
                <label className=" custom-title">
                  Pokemon Name: <input className="textBox expanded-inputs" name="itemName" value={inputs.itemName} type="text" onChange={handleChange} />
                </label>
                <br/><br/>
                <label className="single-item">
                  Pokemon Description: <input className="textBox expanded-inputs" name="description" value={inputs.description} type="text" onChange={handleChange} />
                </label>
                <br/><br/>
                <label className="single-item">
                  Pokemon Quantity: <input className="textBox expanded-inputs" name="quantity" value={inputs.quantity} type="text" onChange={handleChange}/>
                </label>
                <br/><br/>
                <input className="custom-title" type="submit" />
              </form>
            </div>
          </div> :
          <div></div>
        }
      </div>
    </div>
  )
};

export default Newitem;