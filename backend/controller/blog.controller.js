import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

// Creating Blog
export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required..." });
    }
    //retrieving blog photo and checking for proper format
    const { blogImage } = req.files;
    const allowedFormats = [
      "image/jpg",
      "image/png",
      "image/webp",
      "image/jpeg",
      "image/JPG",
      "image/PNG",
      "image/JPEG",
    ];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid Photo Format. only jpg and png are allowed.",
      });
    }

    // checking whether all input fields are given or not
    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({ message: "All fields are required..." });
    }
    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    // Cloudinary upload
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath,
      {
        folder: "Blog_photos",
      }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

    // Storing in Database
    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };
    const blog = await Blog.create(blogData);

    res.status(201).json({
      message: "Blog Created Successfully.",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

////-----------------------------------------------/////
// delete blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not Found." });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully." });
};

// function to get the all Blogs in Database
export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find();
  res.status(200).json(allBlogs);
};

// function to get the a Single Blog in Database
export const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not Found." });
  }
  res.status(200).json(blog);
};

// function to fetch all the Blogs of the user in Database
export const myBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json(myBlogs);
};

// function to Update the Blogs of the user in Database
// export const updateBlog = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid Blog id" });
//   }

//   const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
//   if (!updatedBlog) {
//     return res.status(404).json({ message: "Blog not Found" });
//   }
//   res.status(200).json(updatedBlog);
// };

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not Found" });
  }

  let updatedFields = {
    title: req.body.title,
    category: req.body.category,
    about: req.body.about,
  };

  if (req.files && req.files.blogImage) {
    const allowedFormats = [
      "image/jpg",
      "image/png",
      "image/webp",
      "image/jpeg",
      "image/JPG",
      "image/PNG",
      "image/JPEG",
    ];
    const blogImage = req.files.blogImage;

    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({ message: "Invalid Photo Format." });
    }

    // Delete old image from Cloudinary
    if (blog.blogImage?.public_id) {
      await cloudinary.uploader.destroy(blog.blogImage.public_id);
    }

    // Upload new image
    const uploadResult = await cloudinary.uploader.upload(
      blogImage.tempFilePath,
      {
        folder: "Blog_photos",
      }
    );

    updatedFields.blogImage = {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
    };
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });

  res.status(200).json({
    message: "Blog updated successfully",
    blog: updatedBlog,
  });
};
