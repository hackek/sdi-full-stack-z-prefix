import { exchangeContext } from "../App.js";
import "./Detail.css";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Detail() {
  const { srvPort, user, setUser, currItems, setItems } =
    React.useContext(exchangeContext);
  let params = useParams();
  let detailedItem = currItems.find(element => element.Id === params.Id);
  console.log(params);
  console.log(detailedItem);
  const navigate = useNavigate();


  const [currItem, setItem] = useState({
    Id: detailedItem.id,
    UserId: detailedItem.UserId,
    ItemName: detailedItem.ItemName,
    Description: detailedItem.Description,
    Quantity: detailedItem.Quantity
  });

  return (

    <div className=" home-wrapper mt-10 ">
      <div className="trainer-section ">
        <div className="spacer">
        {/* {console.log(currItems)}
        {console.log(currItem)} */}
              <div className="viewed-items spacer">
                    <div className="rounded-2x1 transform transition-all single-item">
                      <div className="item-property">{currItem.ItemName}</div>
                      <br/>
                      <div className="description">{currItem.Description}</div>
                      <br/>
                      <div className="item-property"># Available for Trade: {currItem.Quantity}</div>
                    </div>
              </div>
              {user !== null && user.UserId === currItem.UserId ?
                <div>
                  <div className="rounded single-item flex-spacing" onClick={() => navigate(`/detail/${currItem.Id}`)}>
                    Delete
                  </div>
                  <div className="rounded single-item flex-spacing" onClick={() => navigate(`/detail/${currItem.Id}`)}>
                    Edit
                  </div>
                </div>: <div></div>}
        </div>
      </div>
    </div>
  )
};

export default Detail;