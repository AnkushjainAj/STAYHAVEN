import cloudinary from "../config/cloudinary.js";
import Post from "../models/Post.js";
import slugify from "slugify";
import Category from "../models/Category.js";
import mongoose from "mongoose";

// ✅ Helper function to extract publicId from Cloudinary URL
function extractPublicId(url) {
  const parts = url.split('/');
  const file = parts[parts.length - 1]; // e.g., 'abcxyz.jpg'
  const publicId = file.split('.')[0];  // remove '.jpg'
  return publicId;
}

// ✅ Create Post
export const createPostController = async (req, res) => {
  try {
    const {
      title,
      hotelLocation,
      description,
      facilities,
      nearArea,
      category,
      guest,
      isAvailable,
      price,
    } = req.body;

    const files = req.files?.images;

    if (
      !title ||
      !description ||
      !facilities ||
      !nearArea ||
      !hotelLocation ||
      !category ||
      !guest ||
      !isAvailable ||
      !price
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!files || files.length !== 3) {
      return res
        .status(400)
        .json({ message: "Please upload exactly 3 images." });
    }

    const imageUrls = await Promise.all(
      files.map((file) =>
        cloudinary.uploader
          .upload(file.tempFilePath)
          .then((result) => result.secure_url)
      )
    );

    const newPost = new Post({
      title,
      hotelLocation,
      description,
      facilities,
      nearArea,
      category,
      guest,
      isAvailable,
      price,
      images: imageUrls,
      slug: slugify(title, { lower: true }),
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Post
export const updatePostController = async (req, res) => {
  try {
    const { pid: id } = req.params;

    const {
      title,
      hotelLocation,
      description,
      facilities,
      nearArea,
      category,
      guest,
      isAvailable,
      price,
    } = req.body;

    let files = req.files?.images;

    if (files && !Array.isArray(files)) {
      files = [files];
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const noUpdates =
      !title &&
      !hotelLocation &&
      !description &&
      typeof facilities === "undefined" &&
      !nearArea &&
      !category &&
      typeof guest === "undefined" &&
      typeof isAvailable === "undefined" &&
      typeof price === "undefined" &&
      !files;

    if (noUpdates) {
      return res.status(400).json({ message: "No fields provided to update." });
    }

    // ✅ Delete old images if new ones uploaded
    let updatedImages = post.images;
    if (files && files.length === 3) {
      await Promise.all(
        post.images.map((url) => {
          const publicId = extractPublicId(url);
          return cloudinary.uploader.destroy(publicId);
        })
      );

      updatedImages = await Promise.all(
        files.map((file) =>
          cloudinary.uploader
            .upload(file.tempFilePath)
            .then((result) => result.secure_url)
        )
      );
    } else if (files && files.length !== 3) {
      return res.status(400).json({ message: "Please upload exactly 3 images." });
    }

    const updateData = {
      ...(title && { title }),
      ...(hotelLocation && { hotelLocation }),
      ...(description && { description }),
      ...(typeof facilities !== "undefined" && { facilities }),
      ...(nearArea && { nearArea }),
      ...(category && { category }),
      ...(typeof guest !== "undefined" && { guest }),
      ...(typeof isAvailable !== "undefined" && { isAvailable }),
      ...(typeof price !== "undefined" && { price }),
      ...(files && { images: updatedImages }),
      ...(title && { slug: slugify(title, { lower: true }) }),
    };

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
      message: "Post updated successfully!",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Post
export const deletePostController = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

// ✅ Get Single Post
export const getPostController = async (req, res) => {
  try {
    const product = await Post.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// ✅ Get All Posts
export const getAllPostController = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).send({
      success: true,
      message: "All Products Fetched",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error,
    });
  }
};

// ✅ Related Posts
export const relatedPostController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await Post.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(2)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting related products",
      error,
    });
  }
};

// ✅ Filter Posts by Price & Guest
export const postFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked?.length) args.guest = { $in: checked };
    if (radio?.length === 2) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Post.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error while filtering products:", error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

// ✅ Get Popular Posts
export const popularPostController = async (req, res) => {
  try {
    const popularPosts = await Post.find({}).sort({ views: -1 }).limit(5);
    res.status(200).send({
      success: true,
      message: "Top 5 popular posts fetched successfully",
      posts: popularPosts,
    });
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    res.status(500).send({
      success: false,
      message: "Error while fetching popular posts",
      error,
    });
  }
};
