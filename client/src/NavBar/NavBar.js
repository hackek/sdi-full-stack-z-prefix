// Get needed dependencies
import { Link,useNavigate } from "react-router-dom";
import React from "react";
import { exchangeContext } from "../App.js";
import "./NavBar.css";



// Implements all functionality of the navigation bar
function NavBar() {

  // Initializes all useful variables
  const { srvPort, user, setUser, currItems, setItems, currItem, setItem } =
    React.useContext(exchangeContext);
  const navigate = useNavigate();

  // Provides links to the home and login pages, and if a user is logged in, then also provides a link to make new items
  return (
    <div className="nav-wrapper relative flex w-full flex-wrap items-center justify-center shadow-lg center">
      <div className="brand-ribbon py-1 center">
        <Link className="link p-3 text-5xl center" to="/">
          <i className="brand-logo ss ss-parl3 p-3 center">
            <span className="center">The Pokemon Exchange</span>
          </i>
        </Link>
      </div>
      <nav className="nav-bar relative w-full flex items-center justify-around shadow-lg px-2">
          <div className="links relative inline-flex items-center">

            <Link className="link p-3 nav-item" to="/login">
              <i className="ss ss-s00 p-1"/><span className="text">Login</span>
            </Link>
            { user.hasOwnProperty('UserId') ?
              <Link className="link p-3 nav-item" to="/newitem">
                <i className="ss ss-s00 p-1"/><span className="text">Create New Item</span>
              </Link> :
              <div></div>
            }

          </div>
        </nav>
    </div>
  )
};



// Exports the file for later user
export default NavBar;
