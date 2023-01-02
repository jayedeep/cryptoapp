import logo from './logo.svg';
import './App.css';
import Exchanges from './components/Exchanges';
import Homepage from './components/Homepage';
import News from './components/News';
import CryptoDetails from './components/CryptoDetails';
import Cryptocurrencies from './components/Cryptocurrencies';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes ,Route,Link } from 'react-router-dom';
import React, { useState } from 'react';
import Slider from './components/Slider';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';


const drawerWidth = 240;

function App() {

  const [newopen,setNewOpen]=useState(false)

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
 
  return (
    
    <Box sx={{ display: 'flex' }}>
    <Slider setNewOpen={setNewOpen}/>
    <Main open={newopen} >
      <Box className='main' component="main" >
        <div className="routes">
          <Routes>
            <Route exact path="/" element={<Homepage />}/>
            
            {/* <Route exact path="/exchanges" element={ <Exchanges />}/> */}
            
            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />}/>
          
            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              
            <Route exact path="/news"  element={<News />}/>
              
            
          </Routes>
        </div>
      </Box>
      </Main>
    
    </Box>
   
  );
}

export default App;
