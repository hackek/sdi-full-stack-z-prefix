import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { exchangeContext } from "../App.js";
import "./Home.css";

function Home() {
  const { srvPort, user, setUser, currItems, setItems, currItem, setItem } =
    React.useContext(exchangeContext);
  const navigate = useNavigate();
  const [toggleMine, setToggleMine] = useState(false);

  const onClick = (itemId) => {
    navigate(`/detail/${itemId}`)
  }

  async function updateInventory() {
    fetch(`http://localhost:${srvPort}/`)
    .then(res => res.json())
    .then(items => setItems(items))
  }

  // Get a specific user
  const adjustView = async (event) => {
    console.log(toggleMine)
    setToggleMine(!toggleMine)
    console.log(toggleMine)
    await updateInventory()
      .then(navigate(`/`))
  }

  useEffect(() => {
    fetch(`http://localhost:${srvPort}/`)
    .then(res => res.json())
    .then(items => setItems(items))
  }, [])

  return (
    <div className=" home-wrapper mt-10 ">
      <div className="trainer-section ">
        <div className="spacer">
        {/* toggleMine */}
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

export default Home;
