import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"; // Corrected this line
import { BACKEND_URL } from "../utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Retrieve the token
      if (token) { // Only attempt to fetch if a token exists
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/my-blogs`, // Changed to my-blogs endpoint
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Add Authorization header
            },
          }
        );
        setBlogs(data);
      } else {
        // If no token, clear blogs and log a warning
        setBlogs([]);
        console.warn("No authentication token found for fetching user-specific blogs.");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // Handle 401 specifically for blogs as well
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("jwt"); // Clear invalid token
        setIsAuthenticated(false); // Set auth state to false
        setProfile(null); // Clear profile
        setBlogs([]); // Clear blogs
        console.log("Authentication failed for blogs. Please log in again.");
      }
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Retrieve the token from localStorage
      if (token) {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/users/my-profile`,
          {
            withCredentials: true, // Keep this if your backend also uses cookies for session management
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // <--- ADD THIS LINE: Send the token in the Authorization header
            },
          }
        );
        setProfile({ user: data.user });
        setIsAuthenticated(true);
      } else {
        // If no token is found, ensure isAuthenticated is false and profile is null
        setIsAuthenticated(false);
        setProfile(null);
        console.warn("No authentication token found. User is not logged in.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // If a 401 occurs, it means the token was invalid or expired.
      // Clear the token and set isAuthenticated to false.
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("jwt"); // Clear invalid token
        setIsAuthenticated(false);
        setProfile(null);
        console.log("Authentication failed. Please log in again.");
        // Optionally, redirect to login page here
      }
    }
  };

  // useEffect calls the above functions
  useEffect(() => {
    fetchBlogs();
    fetchProfile();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        fetchBlogs, // fetchblogs is passed to update the blog list, upon adding, deleting or updating a blog
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        fetchProfile, // Also expose fetchProfile if you need to manually re-fetch after login/logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import { BACKEND_URL } from "../utils";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState();
//   const [profile, setProfile] = useState();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const fetchBlogs = async () => {
//     try {
//       const { data } = await axios.get(
//         `${BACKEND_URL}/api/blogs/all-blogs`,
//         { withCredentials: true }
//       );
//       setBlogs(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       // token should be let type variable because its value will change in every login. (in backend also)
//       const token = localStorage.getItem("jwt");
//       if (token) {
//         const { data } = await axios.get(
//           `${BACKEND_URL}/api/users/my-profile`,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setProfile({ user: data.user });
//         setIsAuthenticated(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // useEffect calls the above functions
//   useEffect(() => {
//     fetchBlogs();
//     fetchProfile();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         blogs,
//         profile,
//         fetchBlogs, // fetchblogs is passed to update the blog list, upon adding, deleting or updating a blog
//         setProfile,
//         isAuthenticated,
//         setIsAuthenticated,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
