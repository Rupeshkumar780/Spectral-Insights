import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { BACKEND_URL } from "../utils";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const navigate = useNavigate();

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page it will not redirect again in login
      toast.success(data.message || "User registered Successfully");
      setProfile(data);
      setIsAuthenticated(true);
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhone("");
      setPhoto("");
      setPhotoPreview("");
      navigate("/"); // navigate to home page
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Please fill required fields");
    }
  };
  return (
    <>
      <div>
        <div className="min-h-screen flex items-center justify-center bg-grey-100">
          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 ">
            <form onSubmit={handleRegister}>
              {/* /LOGO */}
              <div className="font-semibold text-xl items-center text-center">
                Spectral<span className="text-red-500"> Insights</span>
              </div>
              <h1 className="text-xl font-semibold mb-4 "> Register </h1>
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
              {/* NAME */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
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
              {/* PHONE NUMBER */}
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Enter Your Phone Name"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
              {/* EDUCATION */}
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md"
              >
                <option value="">Select Your Education</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor's">Bachelor's Degree</option>
                <option value="Master's">Master's Degree</option>
                <option value="PhD">PhD / Doctorate</option>
                <option value="Other">Other</option>
              </select>
              {/* IMAGE UPLOAD */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-22 h-22 mr-4">
                  <img
                    src={
                      photoPreview ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="icon"
                    className="w-22 h-22 object-cover rounded-full "
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={changePhotoHandler}
                  className="w-full font-light p-2 file:mr-4 file:py-2 file:px-4 file:text-sm file:font-serif file:bg-gray-300 hover:file:bg-gray-400 file:border file:rounded-md border rounded-md"
                />
              </div>
              {/* LOGIN OPTION */}
              <p className="text-center mb-4">
                Already Registered?{" "}
                <Link to={"/login"} className="text-blue-600">
                  Login Now
                </Link>
              </p>
              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
