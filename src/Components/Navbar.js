import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight, BsFillPenFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [toggle, settoggle] = useState(false);

  const toggleMenu = () => {
    settoggle(!toggle);
  };

  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Clear token state
    setToken(null);
  };

  return (
    <div className="bg-gray-900 sticky z-10 w-full top-0 left-0 text-white">
      <div className="relative md:flex justify-between py-4 items-center px-4">
        <div>
          <span className="text-lg font-extrabold ">Bloggo</span>
        </div>

        <ul className="md:flex items-center space-x-6 hidden">
          <Link to="/">Home</Link>
          <Link className="space-x-1" to='/write'>
            <button className="bg-gray-700 text-white rounded-md py-2 px-4 flex flex-row items-center">
              Write
              <BsFillPenFill />
            </button>
          </Link>
          <Link to="/login" onClick={handleLogout}>Logout</Link>
        </ul>

        <GiHamburgerMenu
          className="absolute cursor-pointer block md:hidden right-8 top-6 scale-110"
          onClick={toggleMenu}
        />
      </div>
      <hr className="border-black" />
    </div>
  );
};

export default Navbar;
