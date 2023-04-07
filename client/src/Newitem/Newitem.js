// Get needed dependencies
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { exchangeContext } from "../App.js";
import "./Newitem.css";



// Provides all functionality for the newitem page
function Newitem() {

  // Initializes useful variables
  const { srvPort, user, setUser, currItems, setItems, currItem, setItem } =
    React.useContext(exchangeContext);
  let params = useParams();
  const navigate = useNavigate();
  const [inputs,setInputs] = useState({
    "itemName": "",
    "description": "",
    "quantity": ""
  });

  // Handles real-time user input changes for the new item
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setInputs(values => ({...values, [name]: value }))
  }

  // Updates the total inventory
  async function updateInventory() {
    // Gets all items from the database
    fetch(`http://localhost:${srvPort}/`)
    .then(res => res.json())
    .then(items => setItems(items))
  }

  // Handles a new item submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Posts the new item to the database and redirects to home upon completion
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


  // New item creation capability is provided, but only to logged in users
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



// Exports the file for later user
export default Newitem;
