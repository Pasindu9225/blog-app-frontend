import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, NavLink } from "react-router-dom";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.auth);
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);

  return (
    <div className="fixed top-2 left-0 m-auto max_padd_container w-full">
      <div className="max_container px-4 flexBetween py-3 shadow-lg bg-white ring-1 ring-slate-900/5 mb-24 max-xs:py-2">
        <div className="font-bold text-blue-700 text-xl">
          <Link to={"/"}>BlogVerse</Link>
        </div>
        <Navbar
          containerStyles={`${
            menuOpened
              ? "flexCenter flex-col gap-y-8 justify-center fixed top-24 p-12 bg-white rounded-3xl transition-all duration-500 shadow-md right-0 w-full medium-16"
              : "flex gap-x-6 text-gray-30 xl:gap-x-20 medium-16"
          }`}
        />
        <div className=" flexBetween gap-2 bold-16">
          {!menuOpened ? (
            <CgMenuRight
              onClick={toggleMenu}
              className="cursor-pointer text-2xl hover:text-secondary mr-2"
            />
          ) : (
            <CgClose
              onClick={toggleMenu}
              className="cursor-pointer text-2xl hover:text-secondary mr-2"
            />
          )}
          {isAuthenticated ? (
            <div className=" flexBetween gap-x-2">
              <NavLink to={"/login"} className={"btn_secondary_rounded !py-3"}>
                Log Out
              </NavLink>
            </div>
          ) : (
            <div className=" flexBetween gap-x-1">
              <NavLink
                className={"btn_white_rounded flexCenter gap-x-1 w-28 !py-3"}
                to={"/login"}
              >
                Log In
              </NavLink>
              <NavLink className={"btn_secondary_rounded !py-3"} to={"/signup"}>
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
