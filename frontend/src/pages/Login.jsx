import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page it will not redirect again in login
      toast.success(data.message || "User Logged in Successfully", {
        duration: 3000,
      });
      setProfile(data);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigate("/"); // navigate to home page
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message ||
          "Please fill the Required fields Correctly",
        {
          duration: 3000,
        }
      );
    }
  };

  return (
    <>
      <div>
        <div className="min-h-screen flex items-center justify-center bg-grey-100">
          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 ">
            <form onSubmit={handleLogin}>
              {/* /LOGO */}
              <div className="font-semibold text-xl items-center text-center">
                Spectral<span className="text-red-500"> Insights</span>
              </div>
              <h1 className="text-xl font-semibold mb-6 "> Login </h1>
              {/* Select Role */}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {/* E-MAIL */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {/* PASSWORD */}
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {/* REGISTER OPTION */}
              <p className="text-center mb-4">
                New User?{" "}
                <Link to={"/register"} className="text-blue-600">
                  Register Now
                </Link>
              </p>
              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
