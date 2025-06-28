import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import AI_IMAGE from "../assets/AI.png";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UpdateBlog = () => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const { fetchBlogs } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/single-blog/${id}`,

          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setBlogImage(data?.blogImage?.url);
      } catch (error) {
        console.log(error);
        toast.error("Please fill the required fields");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    if (blogImage instanceof File) {
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog updated successfully");
      await fetchBlogs(); // update blogs globally
      navigateTo("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <section className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              className="w-full p-2 mb-4 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2 font-semibold">BLOG IMAGE</label>
              <img
                src={
                  blogImagePreview
                    ? blogImagePreview
                    : blogImage && typeof blogImage === "object"
                    ? blogImage.url
                    : typeof blogImage === "string"
                    ? blogImage
                    : "/imgPL.webp"
                }
                alt="Blog Main"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <input
                type="file"
                className="w-full file:bg-gray-300 file:border file:p-2 file:rounded file:mx-4 p-2 border rounded-md"
                onChange={changePhotoHandler}
              />
            </div>
            <textarea
              rows="6"
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Something about your blog atleast 200 characters!"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            {/* AI Suggestion Button */}
            <div className="relative group w-full">
              <Link
                to={'/ai-generate'}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-md shadow-lg hover:scale-102 transition-all duration-300"
              >
                <img src={AI_IMAGE} alt="Gemini AI" className="w-6 h-6 rounded-full" />
                <span>Get AI Writing Suggestions</span>
              </Link>
              {/* Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                Kickstart writing with AI Assistance
              </div>
            </div>

            <button
            className="w-full py-3 px-4 mt-6 font-semibold bg-gradient-to-r from-blue-400 to-cyan-700 text-white rounded-md hover:scale-102 transition-all duration-300"
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UpdateBlog;
