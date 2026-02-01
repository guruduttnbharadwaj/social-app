import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import { login, register } from '../api';

const Auth = ({ setUser }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await register(formData);
        alert("Account created! Please login.");
        setIsSignup(false);
      } else {
        const { data } = await login(formData);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Login'}</Typography>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <TextField name="username" label="Username" fullWidth margin="normal" onChange={handleChange} />
          )}
          <TextField name="email" label="Email" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} />
          
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
        </form>
        <Button onClick={() => setIsSignup(!isSignup)} style={{ marginTop: '10px' }}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Auth;