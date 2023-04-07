import { exchangeContext } from "../App.js";
import "./Login.css";
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'




function Login() {
  const [inputs,setInputs] = useState({});
  const navigate = useNavigate();
  const { srvPort, user, setUser, currItems, setItems, currItem, setItem } = React.useContext(exchangeContext);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setInputs(values => ({...values, [name]: value }))
  }

  // Get a specific user
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(typeof event.target[0].value)
    // console.log(typeof event.target[1].value)
    // console.log(typeof event.target[2].value)
    // console.log(typeof event.target[3].value)
    await fetch(`http://localhost:${srvPort}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      body: JSON.stringify([{
        "FirstName": event.target[0].value,
        "LastName": event.target[1].value,
        "Username": event.target[2].value,
        "Password": event.target[3].value
      }])
    })
    .then(res => res.json())
    .then(loggedUser => setUser(loggedUser))
    .catch(err => err.errorMessage)
    // setUser({});
    // console.log(user);
    navigate(`/`)
  }


  return (
    <div className=" home-wrapper mt-10 ">
      <div className="trainer-section ">
        <div className="spacer">
          <h1 className="custom-title">Login:</h1>
          <br/><br/>
          <form className="advancedForm" onSubmit={handleSubmit}>

            <label className=" custom-title">
              First Name: <input className="textBox" name="firstName" value={inputs.name} type="text" onChange={handleChange} />
            </label>
            <br/><br/>

            <label className="single-item">
              Last Name: <input className="textBox" name="lastName" value={inputs.name} type="text" onChange={handleChange} />
            </label>
            <br/><br/>

            <label className="single-item">
              Username: <input className="textBox" name="username" value={inputs.name} type="text" onChange={handleChange}/>
            </label>
            <br/><br/>

            <label className="single-item">
              Password: <input className="textBox" name="password" value={inputs.name} type="text" onChange={handleChange}/>
            </label>
            <br/><br/>

            <input className="custom-title" type="submit" />
          </form>
        </div>
      </div>
    </div>
  )
};

export default Login;