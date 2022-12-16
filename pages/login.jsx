import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login() {
  const [credentials, setCredentials] = useState({email: '', password: ''});
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('user');
  }, []);
  
  function handleInputChange(e) {
    const {value, type} = e.target;
    const c = credentials;
    c[type] = value;
    setCredentials(c);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = {name: credentials.email};
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/');
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{
      maxWidth: 400,
      margin: '20vh auto',
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      alignItems: 'center',
    }}>
      <Typography variant='h5'>
        Login
      </Typography>
      <TextField
        required
        fullWidth
        type='email'
        label='Username'
        onChange={handleInputChange}
      />
      <TextField
        required
        fullWidth
        type='password'
        label='Password'
        onChange={handleInputChange}
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
      >
        Sign In
      </Button>
    </Box>
  );
}
