// Get needed dependencies
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar.js";
import Login from "./Login/Login.js"
import Home from "./Home/Home.js";
import Detail from "./Detail/Detail.js";
import Newitem from "./Newitem/Newitem.js";
import "./App.css";

// Creates context for universally useful variables
export const exchangeContext = React.createContext();



// Implements all app functionality
function App() {

  // Initializes useful variables
  const [srvPort, setSrvPort] = useState(3001);
  const [user, setUser] = useState({});
  const [currItems, setItems] = useState([]);
  const [currItem, setItem] = useState({});

  // On initial app load, will initialize all items
  useEffect(() => {
    // Gets all items from the database
    fetch(`http://localhost:${srvPort}/`)
    .then(res => res.json())
    .then(items => setItems(items))
  }, [])

  // Provides the context to needed routes, and provides users with a navigation bar and website subroutes
  return (
    <exchangeContext.Provider value={ {srvPort, user, setUser, currItems, setItems, currItem, setItem} }>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/newitem" element={<Newitem />} />
      </Routes>
    </exchangeContext.Provider>
  );
}



// Exports the file for later user
export default App;
