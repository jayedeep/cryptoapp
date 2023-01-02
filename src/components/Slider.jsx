
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Avatar from '@mui/material/Avatar';
import icon from '../images/cryptocurrency.png'
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";

const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


export default function Slider({setNewOpen}) {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    setNewOpen(true)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setNewOpen(false)
  };
  const location = useLocation() 

  const [currentPage,setCurrentPage]=React.useState('')

  React.useEffect(() => {
    console.log("Location changed",location.pathname);
    if (location.pathname ==='/'){
      setCurrentPage("Home")
    }
    else if (location.pathname ==="/cryptocurrencies"){
      setCurrentPage("Cryptocurrencies")
    }
    // else if (location.pathname ==="/exchanges"){
    //   setCurrentPage("Exchanges")
    // }
    else if (location.pathname ==="/news"){
      setCurrentPage("News")
    }
    else if (location.pathname.includes("/crypto/")){
      setCurrentPage("Coin Detail")
    }


   else{
    console.log("redirect from here")
   }


  }, [location]);


  return (
    <>
      <CssBaseline />
      <Navbar open={open}  handleDrawerOpen={handleDrawerOpen} currentPage={currentPage}/>
      <Drawer 
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
       open={open} 
       anchor="left">
        <DrawerHeader style={{backgroundColor:"#131b39",color:"white"}}  >
        <Avatar alt="Remy Sharp" src={icon} />
        <Typography variant="h6" noWrap component="div" style={{paddingLeft:"10px"}}>
            Crypto Tracker
          </Typography>
          <IconButton onClick={handleDrawerClose} style={{color:"white"}}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem key={'Home'} disablePadding sx={{ display: 'block',Color:'blue',background: currentPage === 'Home' && "#0000001a" }}>
        <Link to="/" style={{width:'0px',textDecoration:'none'}} > 

              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'#1976d2'
                  }}
                >
                   <HomeIcon />
                </ListItemIcon>
                  <ListItemText primary={'Home'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </Link>

          </ListItem>
          <ListItem key={'Cryptocurrencies'} disablePadding sx={{ display: 'block',Color:'blue',background: currentPage === 'Cryptocurrencies' && "#0000001a"  }}>
          <Link to="/cryptocurrencies" style={{width:'0px',textDecoration:'none'}} > 

            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color:'#1976d2'
                }}
              >
                  <CurrencyBitcoinIcon />
              </ListItemIcon>
              <ListItemText primary={'Cryptocurrencies'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link>

          </ListItem>
          {/* <ListItem key={'Exchanges'} disablePadding sx={{ display: 'block',Color:'blue',background: currentPage === 'Exchanges' && "#0000001a"  }}>
          <Link to="/exchanges" style={{width:'0px',textDecoration:'none'}} > 

            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color:'#1976d2'
                }}
              >
                  <CurrencyExchangeIcon />
              </ListItemIcon>
              <ListItemText primary={'Exchanges'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link>

          </ListItem> */}
          <ListItem key={'News'} disablePadding sx={{ display: 'block',Color:'blue',background: currentPage === 'News' && "#0000001a"  }}>
          <Link to="/news" style={{width:'0px',textDecoration:'none'}} > 

            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color:'#1976d2'
                }}
              >
                  <TipsAndUpdatesIcon />
              </ListItemIcon>
              <ListItemText primary={'News'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      </>
  )
}
