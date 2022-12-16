import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { ColorModeContext } from './_app';

import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function fetchMailbox(user, setMailbox) {
  setMailbox(Array.from({length: 50}, (v, i) => Math.random()));
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [mailbox, setMailbox] = useState([]);
  const toggleColorMode = useContext(ColorModeContext);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      router.push('/login');
    } else {
      setUser(user);
      fetchMailbox(user, setMailbox);
    }
  }, []);

  const theme = useTheme();

  if (!user) return '';
  
  return (
    <div>
      <AppBar sx={{
        position: 'static',
        height: '64px',
        justifyContent: 'center',
      }}>
        <Toolbar sx={{
          gap: 1,
        }}>
          <Typography variant='h6' sx={{flexGrow: 1}}>
            Jmail
          </Typography>
          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Tooltip title={`Logout ${user.name}`} sx={{cursor: 'pointer'}}>
            <Avatar onClick={() => router.push('/login')} />
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box sx={{height: 'calc(100vh - 64px)', overflow: 'scroll'}}>
        <Typography sx={{p: 1}}>
          Inbox
        </Typography>
        {mailbox.map((item, index) => (
          <ListItemButton
            disableRipple
            key={index}
          >
            {item}
          </ListItemButton>
        ))}
      </Box>
    </div>
  );
}
