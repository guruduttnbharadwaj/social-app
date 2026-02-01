const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links this post to a specific user
    required: true
  },
  username: { type: String, required: true }, // Store username directly to save lookup time
  text: { type: String },
  image: { type: String }, // We will store the Image URL here
  
  // Array of User IDs who liked the post
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  
  // Array of Comment objects
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);