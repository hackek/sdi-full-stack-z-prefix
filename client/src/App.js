import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar.js";
import Login from "./Login/Login.js"
import Home from "./Home/Home.js";
import Detail from "./Detail/Detail.js";
import "./App.css";
// import cookieParser from 'cookie-parser';

export const exchangeContext = React.createContext();

function App() {
  const [srvPort, setSrvPort] = useState(3001);
  const [user, setUser] = useState({});
  const [currItems, setItems] = useState([]);
  const [currItem, setItem] = useState({});

  useEffect(() => {
    fetch(`http://localhost:${srvPort}/`)
    .then(res => res.json())
    .then(items => setItems(items))
  }, [])

  return (
    <exchangeContext.Provider value={ {srvPort, user, setUser, currItems, setItems, currItem, setItem} }>
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