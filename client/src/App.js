import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar.js";
import Login from "./Login/Login.js"
import Home from "./Home/Home.js";
import Detail from "./Detail/Detail.js";
import "./App.css";

export const exchangeContext = React.createContext();

function App() {
  const [srvPort] = useState(3001);
  const [user, setUser] = useState({});
  const [currItems, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:${srvPort}/`)
    .then(res => res.json())
    .then(items => setItems(items))
  }, [])

  return (
    <exchangeContext.Provider value={ {srvPort, user, setUser, currItems, setItems} }>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </exchangeContext.Provider>
  );
}

export default App;