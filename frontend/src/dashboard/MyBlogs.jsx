import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const { fetchBlogs } = useAuth();

  const fetchMyBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/blogs/my-blogs`,
        { withCredentials: true }
      );
      setMyBlogs(data);
    } catch (error) {
      toast.error(error.response?.message || "Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/blogs/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Blog deleted successfully");
      await fetchBlogs(); // update global blogs
      await fetchMyBlogs(); // refreshes user's own blogs
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto my-12 p-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
                <Link to={`/blog/${element._id}`}>
                  {element?.blogImage && (
                    <img
                      src={element.blogImage.url}
                      alt="blogImg"
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <span className="text-sm text-gray-600">
                      {element.category}
                    </span>
                    <h4 className="text-xl font-semibold my-2">
                      {element.title}
                    </h4>
                  </div>
                </Link>

                <div className="flex justify-between px-4 pb-4">
                  <Link
                    to={`/blog/update/${element._id}`}
                    className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                  >
                    UPDATE
                  </Link>
                  <button
                    onClick={() => handleDelete(element._id)}
                    className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center h-full text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
