import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { exchangeContext } from "../App.js";
import "./Home.css";

function Home() {
  const { srvPort, user, setUser, currItems, setItems } =
    React.useContext(exchangeContext);
  const navigate = useNavigate();

  const onClick = (itemId) => {
    navigate(`/detail/${itemId}`)
  }

  return (
    <div className=" home-wrapper mt-10 ">
      <div className="trainer-section ">
        <div className="spacer">

          {Object.keys(currItems).length !== 0 ? (
            <div>
              <div className="total">Total Items: {currItems.length}</div>
              <div className="grid spacer">
                {currItems.map(item => {
                  return (
                    <div key={item.id} className="rounded-2x1 transform hover:scale-150 transition-all single-item" onClick={() => navigate(`/detail/${item.id}`)}>
                      <div className="item-property">{item.ItemName}</div>
                      <br/>
                      {item.Description.length > 100 ?
                        <div className="description">{item.Description.substring(0,100)+" ... "}</div> :
                        <div className="description">{item.Description}</div>}

                      <br/>
                      <div className="item-property"># Available for Trade: {item.Quantity}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            // <div className="loading-text text-center text-5xl text-white font-bold drop-shadow-lg">Loading...</div>
            <div className="spinner" />
          )}
        </div>
      </div>
    </div>
  )
};

export default Home;
