import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Feed from './components/Feed'; 
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

function App() {
  // Check if user is already logged in (saved in browser)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#eef2f6', minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: '#2196f3' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Social Feed
          </Typography>
          {user && (
            <>
              <Typography variant="subtitle1" style={{ marginRight: '20px' }}>
                Hello, {user.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout} variant="outlined" sx={{ borderColor: 'white' }}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        {!user ? (
          <Auth setUser={setUser} />
        ) : (
          <Feed user={user} />
        )}
      </Container>
    </Box>
  );
}

export default App;