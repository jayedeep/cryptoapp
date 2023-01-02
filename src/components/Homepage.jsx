import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useGetCryptosQuery } from '../services/cryptoApi';
import millify from 'millify';
import {Link} from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import { useSelector } from 'react-redux';
import AllCurrencies from './AllCurrencies';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

export default function Homepage() {
  var current_currency=useSelector((state)=>state.currency.currency)
  var current_selected_money=AllCurrencies.currencies.filter((x)=>x.uuid===current_currency)

  const { data, isFetching } = useGetCryptosQuery({count:10,current_currency});
  console.log(">>>>>>data",data)
  const GlobalStats= data?.data?.stats

  if(isFetching) return "Loading..."


  return (
    <>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5"  gutterBottom>
            Global Crypto Status
          </Typography>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Item>
                <Typography sx={{ fontSize: 14 }}  gutterBottom>
                Total Cryptocurrencies
                </Typography>
                  <Typography variant="h5" component="div">
                    {GlobalStats.totalCoins}
                  </Typography>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
              <Typography sx={{ fontSize: 14 }}  gutterBottom>
                 Total Exchanges
                </Typography>
                  <Typography variant="h5" component="div">
                  {millify(GlobalStats.totalExchanges)}
                  </Typography>
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item>
              <Typography sx={{ fontSize: 14 }}  gutterBottom>
              Total Market Cap:
                </Typography>
                  <Typography variant="h5" component="div">
                  {`${current_selected_money[0]?.sign}${millify(GlobalStats.totalMarketCap)}`}
                  </Typography>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
              <Typography sx={{ fontSize: 14 }}  gutterBottom>
              Total 24h Volume
                </Typography>
                  <Typography variant="h5" component="div">
                  {`${current_selected_money[0]?.sign}${millify(GlobalStats.total24hVolume)}`}
                  </Typography>
              </Item>
            </Grid>
           
            <Grid item xs={6}>
              <Item>
              <Typography sx={{ fontSize: 14 }}  gutterBottom>
              Total Markets
                </Typography>
                  <Typography variant="h5" component="div">
                  {millify(GlobalStats.totalMarkets)}
                  </Typography>
              </Item>
            </Grid>
            
          </Grid>
      </CardContent>
    </Card>
     <Card sx={{ minWidth: 275 }}>
     <CardContent>
       <div className="home-heading-container">
       <Typography variant="h5" className="home-title"  gutterBottom>
       Top 10 Cryptos In The World
        </Typography>
        <Typography variant="h6" className="show-more"  gutterBottom>
          <Link to="/cryptocurrencies">
            Show more
          </Link>
        </Typography>
       </div>
       <Cryptocurrencies simplified />
     </CardContent>
     </Card>

     <Card sx={{ minWidth: 275 }}>
     <CardContent>
       <div className="home-heading-container">
       <Typography variant="h5" className="home-title"  gutterBottom>
       Latest Crypto News
        </Typography>
        <Typography variant="h6" className="show-more"  gutterBottom>
          <Link to="/news">
            Show more
          </Link>
        </Typography>
       </div>
       <News simplified />
     </CardContent>
     </Card>

     
     </>
  )
}
