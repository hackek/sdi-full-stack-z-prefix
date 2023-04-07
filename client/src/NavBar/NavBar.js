import { Link,useNavigate } from "react-router-dom";
import "./NavBar.css";
import { exchangeContext } from "../App.js";
import React from "react";

function NavBar() {
  const navigate = useNavigate();
  const { srvPort, user, setUser, currItems, setItems, currItem, setItem } =
    React.useContext(exchangeContext);

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

            <Link className="link p-3" to="/login">
              <i className="ss ss-s00 p-1"/><span className="text">Login</span>
            </Link>
          </div>
        </nav>
    </div>
  )
};

export default NavBar;