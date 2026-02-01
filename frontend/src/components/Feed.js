import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, TextField, Button, Typography, 
  Card, CardHeader, CardContent, CardActions, Avatar, 
  IconButton, List, ListItem, ListItemText, Divider 
} from '@mui/material';
import { Favorite, FavoriteBorder, Comment as CommentIcon, Send } from '@mui/icons-material';
import { fetchPosts, createPost, likePost, commentPost } from '../api';

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ text: '', image: '' });
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data } = await fetchPosts();
      setPosts(data);
    } catch (err) {
      console.error("Error loading posts:", err);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.text && !newPost.image) return alert("Write something!");

    try {
      // FIX 1: Changed user._id to user.id
      await createPost({ ...newPost, userId: user.id, username: user.username });
      setNewPost({ text: '', image: '' });
      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to post");
    }
  };

  const handleLike = async (postId) => {
    try {
      // FIX 2: Changed user._id to user.id
      await likePost(postId, user.id);
      
      setPosts(posts.map(post => {
        if (post._id === postId) {
          // FIX 3: Changed user._id to user.id
          const isLiked = post.likes.includes(user.id);
          return {
            ...post,
            likes: isLiked 
              ? post.likes.filter(id => id !== user.id) // FIX 4
              : [...post.likes, user.id] // FIX 5
          };
        }
        return post;
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (postId) => {
    const text = commentInputs[postId];
    if (!text) return;

    try {
      // FIX 6: Changed user._id to user.id
      await commentPost(postId, { userId: user.id, username: user.username, text });
      setCommentInputs({ ...commentInputs, [postId]: '' });
      loadPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px', paddingBottom: '50px' }}>
      <Paper style={{ padding: '20px', marginBottom: '30px' }} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: '10px' }}>What's on your mind?</Typography>
        <TextField 
          fullWidth placeholder="Write something..." multiline rows={2}
          value={newPost.text}
          onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
        />
        <TextField 
          fullWidth placeholder="Image URL (Optional)" margin="normal" variant="standard"
          value={newPost.image}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
        />
        <Button 
          variant="contained" fullWidth style={{ marginTop: '10px' }} 
          onClick={handlePostSubmit} disabled={!newPost.text && !newPost.image}
        >
          Post
        </Button>
      </Paper>

      {posts.map((post) => (
        <Card key={post._id} style={{ marginBottom: '20px' }} elevation={2}>
          <CardHeader 
            avatar={<Avatar>{post.username[0].toUpperCase()}</Avatar>}
            title={post.username}
            subheader={new Date(post.createdAt).toDateString()}
          />
          <CardContent>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>{post.text}</Typography>
            {post.image && (
              <img src={post.image} alt="Post" style={{ width: '100%', borderRadius: '5px' }} />
            )}
          </CardContent>

          <CardActions disableSpacing>
            {/* FIX 7: Changed user._id to user.id */}
            <IconButton onClick={() => handleLike(post._id)} color={post.likes.includes(user.id) ? "error" : "default"}>
              {post.likes.includes(user.id) ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Typography variant="body2" style={{ marginRight: '15px' }}>{post.likes.length}</Typography>

            <CommentIcon color="action" />
            <Typography variant="body2" style={{ marginLeft: '5px' }}>{post.comments.length}</Typography>
          </CardActions>

          <Divider />
          <CardContent style={{ backgroundColor: '#f9f9f9' }}>
            <List dense>
              {post.comments.map((c, index) => (
                <ListItem key={index}>
                  <ListItemText primary={<strong>{c.username}</strong>} secondary={c.text} />
                </ListItem>
              ))}
            </List>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <TextField 
                size="small" fullWidth placeholder="Write a comment..." 
                value={commentInputs[post._id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post._id]: e.target.value })}
              />
              <IconButton color="primary" onClick={() => handleCommentSubmit(post._id)}>
                <Send />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Feed;