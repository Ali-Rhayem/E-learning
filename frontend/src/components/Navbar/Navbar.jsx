import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser, filterEnrolledClasses } from "../../redux/userSlice";
import { filterClasses } from "../../redux/classSlice";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleAllclasses = () => {
    navigate("/all-classes");
  };

  const handleMyclasses = () => {
    navigate("/my-classes");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const currentPath = window.location.pathname;
    if (currentPath === '/my-classes') {
      dispatch(filterEnrolledClasses(query));
    } else if (currentPath === '/all-classes') {
      dispatch(filterClasses(query));
    }
  };

  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl text-neutral" to="/home">
          daisyUI
        </Link>
      </div>
      <div className="flex-none gap-2">
        {token ? (
          <>
            <a
              className="btn btn-ghost text-xl text-neutral"
              onClick={handleMyclasses}
            >
              My Classes
            </a>
            <a
              className="btn btn-ghost text-xl text-neutral"
              onClick={handleAllclasses}
            >
              All Classes
            </a>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="w-28 flex h-12 flex-row items-center justify-around rounded-full bg-neutral text-sm md:h-12 md:w-32 md:text-base">
              <div className="text-base text-white hover:text-gray-200">
                <a
                  onClick={handleLogout}
                  className="text-white hover:text-gray-200 cursor-pointer"
                >
                  Logout
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-28 flex h-12 flex-row items-center justify-around rounded-full bg-neutral text-sm md:h-12 md:w-32 md:text-base">
              <div className="text-base text-white hover:text-gray-200">
                <a
                  className="text-white hover:text-gray-200 cursor-pointer"
                  onClick={handleLogin}
                >
                  Login
                </a>
              </div>
            </div>
            <div className="w-28 flex h-12 flex-row items-center justify-around rounded-full bg-neutral text-sm md:h-12 md:w-32 md:text-base">
              <div className="text-base text-white hover:text-gray-200">
                <a
                  className="text-white hover:text-gray-200 cursor-pointer"
                  onClick={handleRegister}
                >
                  Register
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
