import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoMdImages } from "react-icons/io";
import { useAuth } from "../context/AuthProvider";
import { BACKEND_URL } from "../utils";
import AI_IMAGE from "../assets/AI.png";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const { fetchBlogs } = useAuth();
  const navigateTo = useNavigate();

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

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/blogs/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "Blog Created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");

      await fetchBlogs(); // refresh blogs from API
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Please fill the required fields");
    }
  };
  return (
    <div>
      <div className="min-h-screen  py-10">
        <div className="max-w-4xl mx-auto p-6 border  rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-8">Create Blog</h3>
          <form onSubmit={handleCreateBlog} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>

                <option value="History">History</option>
                <option value="Lifestyle">Lifestyle </option>
                <option value="Books & Reviews">Books & Reviews </option>
                <option value="Self-Improvement">Self-Improvement </option>
                <option value="Philosophy & Thought">Philosophy & Thought </option>
                <option value="Productivity Hacks">Productivity Hacks </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Blog Image</label>
              <div className="flex items-center justify-center">
                {blogImagePreview ? (
                  <img
                    src={blogImagePreview}
                    alt="Preview"
                    className="w-full h-auto rounded-md object-cover"
                  />
                ) : (
                  <IoMdImages size={100} className="text-gray-600" />
                )}
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border  file:bg-gray-300 file:border file:p-2 file:rounded file:mx-4 border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">About</label>
              <textarea
                rows="5"
                placeholder="Write something about your blog"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-2  border border-gray-400  rounded-md outline-none"
              />
            </div>

            {/* AI Suggestion Button */}
            <div className="relative group w-full">
              <Link
                to={"/ai-generate"}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-md shadow-lg hover:scale-102 transition-all duration-300"
              >
                <img
                  src={AI_IMAGE}
                  alt="Gemini AI"
                  className="w-6 h-6 rounded-full"
                />
                <span>Get AI Writing Suggestions</span>
              </Link>
              {/* Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                Kickstart writing with AI Assistance
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 font-semibold bg-gradient-to-r from-blue-400 to-cyan-700 text-white rounded-md hover:scale-102 transition-all duration-300"
            >
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
