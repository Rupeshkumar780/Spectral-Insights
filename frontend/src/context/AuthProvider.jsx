import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/blogs/all-blogs`,
        { withCredentials: true }
      );
      console.log("All-Blogs", data);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      // token should be let type variable because its value will change in every login. (in backend also)
      const token = localStorage.getItem("jwt");
      console.log("Fetch profile");
      console.log("token", token);
      if (token) {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/users/my-profile`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProfile({ user: data.user });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect calls the above functions
  useEffect(() => {
    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        fetchBlogs, // fetchblogs is passed to update the blog list, upon adding, deleting or updating a blog
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
