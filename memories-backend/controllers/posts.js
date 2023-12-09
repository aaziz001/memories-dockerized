import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const { page } = req.query;

    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find({
      $or: [
        { private: false },
        { $and: [{ private: true, creator: req.userId }] },
      ],
    })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res
      .status(200)
      .json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { title, tags } = req.query;
  try {
    const postTitle = new RegExp(title, "i");
    const userId = req.userId ? req.userId : "null";
    const posts = await PostMessage.find({
      $and: [
        {
          $or: [
            { private: false },
            { $and: [{ private: true }, { creator: userId }] },
          ],
        },
        {
          $or: [{ title: postTitle }, { tags: { $in: tags.split(",") } }],
        },
      ],
    });
    res.json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, creator, tags, message, selectedFile } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found with that id");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { title, creator, message, tags, selectedFile, _id: id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found with that id");
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post Deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found with that id");
  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
