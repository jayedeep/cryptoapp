import React,{useEffect, useState} from 'react'

import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

// import { useParams } from 'react-router-dom';
import AllCurrencies from './AllCurrencies';
import { Box } from '@mui/system';

import { Currencyactions } from '../app/CurrencyChanger';
import { useDispatch, useSelector } from 'react-redux';

const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


export default function Navbar({open,handleDrawerOpen,currentPage}) {
  console.log(">>>>>>",currentPage)

  const dispatch=useDispatch()

  const setCurrency=(currency)=>{
    dispatch(Currencyactions.updateCurrency({currency:currency}))
  }

  return (
    <AppBar position="fixed" open={open}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {currentPage}
          </Typography>
            <Box sx={{borderColor:'white',background:'white',padding:'2px',borderRadius:'5px'}}>
            <FormControl size="small">    
              <InputLabel id="demo-simple-select-label2">Select Currency</InputLabel>
              <Select 
              defaultValue="" 
              labelId="demo-simple-select-label3"
              className="select-timeperiod"
              label="Select Currency" 
              onChange={(e) => setCurrency(e.target.value)}
              >
              {AllCurrencies.currencies.map((single_currency) =>
               <MenuItem value={single_currency.uuid}>{single_currency.symbol}
               </MenuItem>)}
              </Select>
              </FormControl>
            </Box>
        </Toolbar>
       
      </AppBar>
  )
}
