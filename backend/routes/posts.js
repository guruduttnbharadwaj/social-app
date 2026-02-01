const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// 1. GET ALL POSTS (The Feed)
router.get('/', async (req, res) => {
  try {
    // Get posts, sort by newest first (-1)
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. CREATE A POST
router.post('/', async (req, res) => {
  try {
    const { userId, username, text, image } = req.body;
    
    // Validation: Must have at least text OR image
    if (!text && !image) {
      return res.status(400).json({ message: "Post must have text or image" });
    }

    const newPost = new Post({
      userId,
      username,
      text,
      image,
      likes: [],
      comments: []
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. LIKE / UNLIKE A POST
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { userId } = req.body; // The user who is liking

    if (!post.likes.includes(userId)) {
      // If not liked yet, Like it
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ message: "Post liked" });
    } else {
      // If already liked, Unlike it
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. COMMENT ON A POST
router.post('/:id/comment', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { userId, username, text } = req.body;

    const comment = { userId, username, text, createdAt: new Date() };
    
    await post.updateOne({ $push: { comments: comment } });
    res.status(200).json({ message: "Comment added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;