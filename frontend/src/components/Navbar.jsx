import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/users/logout",
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <nav className="shadow-lg px-4 py-3.5 bg-white">
        <div className="container  mx-auto  flex justify-between items-center">
          <div className="font-bold text-2xl mr-3">
            Spectral<span className="text-red-500"> Insights</span>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex md:space-x-3 lg:space-x-6 items-center">
            <Link to="/" className="hover:text-blue-500 navbar-underline">HOME</Link>
            <Link to="/blogs" className="hover:text-blue-500 navbar-underline">BLOGS</Link>
            <Link to="/creators" className="hover:text-blue-500 navbar-underline">CREATORS</Link>
            <Link to="/about" className="hover:text-blue-500 navbar-underline">ABOUT</Link>
            <Link to="/contact" className="hover:text-blue-500 navbar-underline">CONTACT</Link>

            {isAuthenticated && profile?.user?.role === "admin" && (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded "
              >
                DASHBOARD
              </Link>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded "
              >
                LOGIN
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded "
              >
                LOGOUT
              </button>
            )}
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden cursor-pointer" onClick={() => setShow(!show)}>
            {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
          </div>
        </div>

        {/* Mobile Navbar */}
        {/* 760 to 880 */}
        {show && (
          <div className="bg-white w-full md:hidden pt-3">
            <hr />
            <ul className="flex flex-col mt-4 items-center space-y-4 text-lg font-medium">
              <Link to="/" onClick={() => setShow(false)} className="hover:text-blue-500 navbar-underline">HOME</Link>
              <Link to="/blogs" onClick={() => setShow(false)} className="hover:text-blue-500 navbar-underline">BLOGS</Link>
              <Link to="/creators" onClick={() => setShow(false)} className="hover:text-blue-500 navbar-underline">CREATORS</Link>
              <Link to="/about" onClick={() => setShow(false)} className="hover:text-blue-500 navbar-underline">ABOUT</Link>
              <Link to="/contact" onClick={() => setShow(false)} className="hover:text-blue-500 navbar-underline">CONTACT</Link>

              {isAuthenticated && profile?.user?.role === "admin" && (
                <Link
                  to="/dashboard"
                  onClick={() => setShow(false)}
                  className="hover:text-blue-500 navbar-underline"
                >
                  DASHBOARD
                </Link>
              )}

              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setShow(false)}
                  className="hover:text-blue-500 navbar-underline"
                >
                  LOGIN
                </Link>
              ) : (
                <button
                  onClick={(e) => {
                    handleLogout(e);
                    setShow(false);
                  }}
                  className="hover:text-blue-500 navbar-underline"
                >
                  LOGOUT
                </button>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
