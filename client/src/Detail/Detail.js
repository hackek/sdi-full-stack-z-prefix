// Get needed dependencies
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { exchangeContext } from "../App.js";
import "./Detail.css";



// Implement all functionality of viewing a specific item
function Detail() {

  // Initialize useful variables
  const { srvPort, user, setUser, currItems, setItems, currItem, setItem } =
    React.useContext(exchangeContext);
  let params = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // Toogle boolean for edit mode
  const [inputs,setInputs] = useState({
    "itemName": currItem.ItemName,
    "description": currItem.Description,
    "quantity": currItem.Quantity
  }); // Inputs for edit mode

  // When an edit or deletion is submitted, handles updated the inventory
  async function updateInventory() {
    // Retrieves all database items
    fetch(`http://localhost:${srvPort}/`)
    .then(res => res.json())
    .then(items => setItems(items))
  }

  // Deletes a specific item
  const deleteItem = async (event) => {
    // Deletes the current viewed item in the database
    await fetch(`http://localhost:${srvPort}/detail/${params.id}`, {
      method: "DELETE"
    })
    .then(
      currItems.filter(parseItems => parseItems.id !== params.id)
    )
    .then(items => updateInventory())
    .then(setItem({}))
    .then(navigate(`/`))
    .catch(err => err.errorMessage)
  }

  // Edits a specific item
  const editItem = async (event) => {
    // Shows the same detailed view item in edit mode
    setIsEditing(!isEditing)
    updateInventory()
    navigate(`/detail/${params.id}`)
  }

  // Updates in real-time user changes when editing
  const handleChange = (event) => {
    // Updates the edit fields when changes occur when editing a specific item
    const name = event.target.name;
    const value = event.target.value
    setInputs(values => ({...values, [name]: value }))
  }

  // Resolves submitting an edit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Patches the changes the user made to the item and sends to the database
    await fetch(`http://localhost:${srvPort}/detail/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      body: JSON.stringify({
        "UserId": currItem.UserId,
        "ItemName": event.target[0].value,
        "Description": event.target[1].value,
        "Quantity": event.target[2].value
      })
    })
    .then(res => res.json())
    .then(setItem({
      "id": currItem.Id,
      "UserId": currItem.UserId,
      "ItemName": inputs.itemName,
    "Description": inputs.description,
    "Quantity": inputs.quantity
    }))
    .then(editItem())
    .catch(err => err.errorMessage)
  }


  // Provides users different view if they are viewing an item they made, and if they are editing that item
  return (
    <div className=" home-wrapper mt-10 ">
      <div className="trainer-section ">
          { user.hasOwnProperty('UserId') && user.UserId === currItem.UserId ?
            <div className="spacer">
              { !isEditing ?
                <div>
                  <div className="viewed-items spacer">
                    <div className="rounded-2x1 transform transition-all single-item">
                      <div className="item-property">{currItem.ItemName}</div>
                      <br/>
                      <div className="description">{currItem.Description}</div>
                      <br/>
                      <div className="item-property"># Available for Trade: {currItem.Quantity}</div>
                    </div>
                  </div>
                  <div className="parent">
                    <div className="rounded user-options child" onClick={() => deleteItem()}>
                      Delete
                    </div>
                    <div className="rounded user-options child" onClick={() => editItem()}>
                      Edit
                    </div>
                  </div>
                </div>:
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
                  <div className="parent">
                    <div className="rounded user-options child" onClick={() => deleteItem()}>
                      Delete
                    </div>
                    <div className="rounded user-options child" onClick={() => editItem()}>
                      Edit
                    </div>
                  </div>
                </div>
              }
            </div>:
            <div className="viewed-items spacer">
              <div className="rounded-2x1 transform transition-all single-item">
                <div className="item-property">{currItem.ItemName}</div>
                <br/>
                <div className="description">{currItem.Description}</div>
                <br/>
                <div className="item-property"># Available for Trade: {currItem.Quantity}</div>
              </div>
            </div>
          }
      </div>
    </div>
  )
};



// Exports the file for later user
export default Detail;
