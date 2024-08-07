import React from "react";
import "./Navbar.css";

const Navbar = () => {
    const handleLogout = ()=>{
        console.log("pressed");
    }
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-neutral">daisyUI</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="w-28 flex h-12 flex-row items-center justify-around rounded-full bg-neutral text-sm md:h-12 md:w-32 md:text-base">
          <div className="text-base text-white hover:text-gray-200">
            <a href="#" onClick={handleLogout} className="text-white hover:text-gray-200">Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
