// Get needed dependencies
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { exchangeContext } from "../App.js";
import "./Home.css";



// Implement all functionality of the home page
function Home() {

  // Initializes useful variables
  const { srvPort, user, setUser, currItems, setItems, currItem, setItem } =
    React.useContext(exchangeContext);
  const navigate = useNavigate();
  const [toggleMine, setToggleMine] = useState(false);

  // Updates the inventory when changes are made
  async function updateInventory() {
    // Retrieves all items from the database
    fetch(`http://localhost:${srvPort}/`)
    .then(res => res.json())
    .then(items => setItems(items))
  }

  // If a user is logged in, toggles between seeing all items and just their items
  const adjustView = async (event) => {
    // Stays on the same page but with the updated inventory
    setToggleMine(!toggleMine)
    await updateInventory()
      .then(navigate(`/`))
  }

  // When the home page is visited for the 1st time, load the initial items
  useEffect(() => {
    // Retrieves all items from the database
    fetch(`http://localhost:${srvPort}/`)
    .then(res => res.json())
    .then(items => setItems(items))
  }, [])

  // Allows users to view all items, loading bar appears if waiting to load, and shows additional features if logged in
  return (
    <div className=" home-wrapper mt-10 ">
      <div className="trainer-section ">
        <div className="spacer">
          {Object.keys(currItems).length !== 0 ? (
            <div>
              {user.hasOwnProperty('UserId') ? (
                <div>
                  {toggleMine ? (
                    <div>
                      <div className="total transform transition-all hover:scale-110" onClick={() => adjustView()}>Toggle Viewing All Items or User Items</div>
                      <br/>
                      <div className="total">Total Items: {currItems.length}</div>
                      <br/>
                      <div className="grid spacer">
                        {currItems.filter(anItem => anItem.UserId === user.UserId).map(item => {
                          return (
                            <div key={item.id} className="rounded-2x1 transform hover:scale-110 transition-all single-item"
                              onClick={() => {
                                setItem({
                                  Id: item.id,
                                  UserId: item.UserId,
                                  ItemName: item.ItemName,
                                  Description: item.Description,
                                  Quantity: item.Quantity
                                })
                                navigate(`/detail/${item.id}`);
                              }
                            }>
                              <div className="item-property">{item.ItemName}</div>
                              <br/>
                              {item.Description.length > 100 ?
                                <div className="description">{item.Description.substring(0,100)+" ... "}</div> :
                                <div className="description">{item.Description}</div>
                              }
                              <br/>
                              <div className="item-property"># Available for Trade: {item.Quantity}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) :
                  <div>
                    <div className="total transform transition-all hover:scale-110 btn-highlight" onClick={() => adjustView()}>Toggle Viewing All Items or User Items</div>
                    <br/>
                    <div className="total">Total Items: {currItems.length}</div>
                    <br/>
                    <div className="grid spacer">
                      {currItems.map(item => {
                        return (
                          <div key={item.id} className="rounded-2x1 transform hover:scale-110 transition-all single-item"
                            onClick={() => {
                              setItem({
                                Id: item.id,
                                UserId: item.UserId,
                                ItemName: item.ItemName,
                                Description: item.Description,
                                Quantity: item.Quantity
                              })
                              navigate(`/detail/${item.id}`);
                            }
                          }>
                            <div className="item-property">{item.ItemName}</div>
                            <br/>
                            {item.Description.length > 100 ?
                              <div className="description">{item.Description.substring(0,100)+" ... "}</div> :
                              <div className="description">{item.Description}</div>
                            }
                            <br/>
                            <div className="item-property"># Available for Trade: {item.Quantity}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>}
                </div>
              ) :
              (
                <div>
                  <div className="total">Total Items: {currItems.length}</div>
                  <br/>
                  <div className="grid spacer">
                    {currItems.map(item => {
                      return (
                        <div key={item.id} className="rounded-2x1 transform hover:scale-110 transition-all single-item"
                          onClick={() => {
                            setItem({
                              Id: item.id,
                              UserId: item.UserId,
                              ItemName: item.ItemName,
                              Description: item.Description,
                              Quantity: item.Quantity
                            })
                            navigate(`/detail/${item.id}`);
                          }
                        }>
                          <div className="item-property">{item.ItemName}</div>
                          <br/>
                          {item.Description.length > 100 ?
                            <div className="description">{item.Description.substring(0,100)+" ... "}</div> :
                            <div className="description">{item.Description}</div>
                          }
                          <br/>
                          <div className="item-property"># Available for Trade: {item.Quantity}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="spinner" />
          )}
        </div>
      </div>
    </div>
  )
};



// Exports the file for later user
export default Home;
