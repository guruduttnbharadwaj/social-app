import axios from 'axios';

// 1. Point to your local backend

const API = axios.create({ baseURL: 'https://social-app-4ah3.onrender.com/api' });

// 2. Helper to add the token to requests (if logged in)
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// 3. API Functions
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id, userId) => API.put(`/posts/${id}/like`, { userId });
export const commentPost = (id, commentData) => API.post(`/posts/${id}/comment`, commentData);