import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Detail = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlogs(data);
      } catch (error) {
        console.log(error);
        toast.error("Login to preview the Page.");
      }
    };

    fetchBlogs();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated && (
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-tl from-gray-400 to-gray-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center ">
            <h2 className="text-xl font-bold mb-4 text-red-600">Access Denied</h2>
            <p className="text-gray-700 mb-4">You must be logged in to view this blog post.</p>
            <Link
              to={"/login"}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Go to Login
            </Link>
          </div>
        </div>
      )}

      {blogs && (
        <section className="container mx-auto p-4">
          <div className="text-blue-500 uppercase text-s font-bold mb-4">
            {blogs?.category}
          </div>
          <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
          <div className="flex items-center mb-6">
            <img
              src={blogs?.adminPhoto}
              alt="author_avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <p className="text-lg font-semibold">{blogs?.adminName}</p>
          </div>

          <div className="flex flex-col md:flex-row">
            {blogs?.blogImage && (
              <img
                src={blogs?.blogImage?.url}
                alt="mainblogsImg"
                className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
              />
            )}
            <div className="md:w-1/2 w-full md:pl-6">
              <p className="text-lg mb-6">{blogs?.about}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Detail;
