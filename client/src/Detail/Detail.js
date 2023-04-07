import { exchangeContext } from "../App.js";
import "./Detail.css";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Detail() {
  const { srvPort, user, setUser, currItems, setItems, currItem, setItem } =
    React.useContext(exchangeContext);
  let params = useParams();
  let detailedItem = currItems.find(element => element.Id === params.Id);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [inputs,setInputs] = useState({
    "itemName": currItem.ItemName,
    "description": currItem.Description,
    "quantity": currItem.Quantity
  });


  // Get a specific user
  const deleteItem = async (event) => {
    console.log(params.id)
    await fetch(`http://localhost:${srvPort}/detail/${params.id}`, {
      method: "DELETE"
    })
    .then(
      currItems.filter(parseItems => parseItems.id !== params.id)
    )
    .then(items => {
      setItems(items)
    })
    .then(setItem({}))
    .then(navigate(`/`))
    .catch(err => err.errorMessage)
  }

  // Get a specific user
  const editItem = async (event) => {
    console.log(isEditing)
    setIsEditing(!isEditing)
    console.log(isEditing)
    navigate(`/detail/${params.id}`)
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setInputs(values => ({...values, [name]: value }))
  }

  // Get a specific user
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target)
    console.log([{
      "UserId": currItem.UserId,
      "ItemName": event.target[0].value,
      "Description": event.target[1].value,
      "Quantity": event.target[2].value
    }])
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
    console.log("Submission Successful");
  }


  //
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

export default Detail;