import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { mslContext } from "../src/App.js";
// import "./common.css";

//icons
// import { MdNavigateBefore } from "react-icons/md";
// import {
//   BsSearch,
//   BsChevronDown,
//   BsPerson,
//   BsSun,
//   BsMoon,
// } from "react-icons/bs";
// import { RiDashboardFill, RiComputerLine } from "react-icons/ri";
// import { ImInsertTemplate } from "react-icons/im";
// import {
//   AiOutlineHome,
//   AiOutlineFileText,
//   AiOutlineSetting,
//   AiOutlineLogout,
// } from "react-icons/ai";

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(true);
  const { user, setUser, srvPort } = React.useContext(mslContext);

  //Sidebar Nav Links
  const links = [
    { name: "Home", to: "/", icon: <AiOutlineHome /> },
    { name: "Post", to: "/", icon: <AiOutlineFileText /> },
    { name: 'Templates', to: '/', icon: <ImInsertTemplate />},
    {
      name: "Theme",
      icon: <AiOutlineSetting />,
      submenu: true,
      submenuItems: [
        { text: "light", icon: <BsSun /> },
        { text: "dark", icon: <BsMoon /> },
        { text: "system", icon: <RiComputerLine /> },
      ],
    },
  ];
  let userLink = <Link to="Login" className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9`}>
    <span className="text-2xk block float-left">
      <BsPerson />
    </span>
    <span className={`text-base font-medium flex-1`}>
      Login
    </span>
  </Link>;

  if (user.username) {
    userLink = <Link
      onClick={
        () => {
          fetch(`http://localhost:${srvPort}/logout`, {
            method: "POST",
            credentials: "include",
          })
            .then(() => {
              setUser({})
              navigate('/Login')
           });
        }
      }
      className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9`}
    >
    <span className="text-2xk block float-left">
      <BsPerson />
    </span>
    <span className={`text-base font-medium flex-1`}>
      Logout
    </span>
  </Link>;
  } else {
    userLink = <Link to="Login" className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9`}>
    <span className="text-2xk block float-left">
      <BsPerson />
    </span>
    <span className={`text-base font-medium flex-1`}>
      Login
    </span>
  </Link>;
  }

  //Theme Setup
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }

  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;

      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;

      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });



  return (
    <>
      <div>

      </div>
    </>
  );
};
export default NavBar;