import * as React from 'react';
//import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
//import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
//import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import TabIcon from '@mui/icons-material/Tab';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';

import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {clearAuth} from '../../reducers/slices/Auth'

const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function MenuAppBar() {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <Box sx={{ flexGrow: 1 }}>
       <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        className='dxtdx'
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className='enableBlur' style={{color:'white'}}>
          <DrawerHeader >
          <IconButton onClick={handleDrawerClose} style={{color:'#ffffee'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          
            <ListItem  disablePadding>
              <ListItemButton onClick={()=>navigate('/')}>
                <ListItemIcon>
                  <HomeIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={'HOME'} />
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton onClick={()=>navigate('/tasks')}>
                <ListItemIcon>
                  <ListIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={'TASKS'} />
              </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
              <ListItemButton onClick={()=>navigate('/feeling-lucky')}>
                <ListItemIcon>
                  <ModeStandbyIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={'LUCKY SPIN'} />
              </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
              <ListItemButton onClick={()=>navigate('/create-tasks')}>
                <ListItemIcon>
                  <ArrowUpwardIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={'BOOST'} />
              </ListItemButton>
          </ListItem>
    
          <ListItem  disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard')}>
                <ListItemIcon>
                  <TabIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={'DASHBOARD'} />
              </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        
        <List>
          {/* <ListItem  disablePadding>
              <ListItemButton onClick={()=>window.open('https://wa.me/message/VEQ45B6UTXT3E1', '_blank')}>
                <ListItemIcon>
                  <WhatsAppIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={'WHATSAPP'} />
              </ListItemButton>
          </ListItem> */}
          
          <ListItem  disablePadding>
              <ListItemButton onClick={()=>window.open('https://twitter.com/earningig_ng', '_blank')}>
                <ListItemIcon>
                  <TwitterIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={'TWITTER'} />
              </ListItemButton>
          </ListItem>
        
          <ListItem  disablePadding>
              <ListItemButton onClick={()=>window.open('https://t.me/officialearninggigs', '_blank')}>
                <ListItemIcon>
                  <TelegramIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={'TELEGRAM'} />
              </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
              <ListItemButton onClick={()=>window.open('https://wa.me/2349014928393', '_blank')}>
                <ListItemIcon>
                  <SupportAgentOutlinedIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={'SUPPORT'} />
              </ListItemButton>
          </ListItem>
          
        </List>
        </div>
      </Drawer>
      <AppBar position="fixed" style={{background:'#ffffff00', color:'black'}}  >
        <div style={{background:'#ffffff00', color:'white'}} className='enableBlur'>
          <Toolbar className='disableBlur'>
            <IconButton onClick={handleDrawerOpen}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Earngigs
            </Typography>
            
              <div>
              {  auth.auth && <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle className='disableBlur'/>
                </IconButton>}
              {
                auth.auth ? ( <Menu className='disableBlur'
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}><Link to='/dashboard' style={{textDecoration:'none',}}>Profile</Link></MenuItem>
                  
                  <MenuItem onClick={()=>{
                    dispatch(clearAuth()) 
                  handleClose()}}>Logout</MenuItem>
                </Menu>) : (
                    <Link className='disableBlur' to='/login' style={{textDecoration:'none', color:'white'}}>Login</Link>
                )
              }
              </div>
            
          </Toolbar>
        </div>
      </AppBar>
    </Box>
  );
}
