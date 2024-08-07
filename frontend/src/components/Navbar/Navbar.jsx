import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleLogin = ()=>{
    navigate("/login");
  }

  const handleRegister = ()=>{
    navigate("/register");
  }

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
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
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
                  login
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
