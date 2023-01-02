import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';



export default function Cryptocurrencies({simplified}) {
  var current_currency=useSelector((state)=>state.currency.currency)

  const count = simplified ? 10 : 100;
  const {data:cryptosList,isFetching}=useGetCryptosQuery({count,current_currency})
  const [cryptos,setCryptos]=useState(cryptosList ?.data ?.coins);
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return 'Loading...';

  return (
    <div className='crypto-card-container'>
        {!simplified && (
        <div className="search-crypto">
          <TextField id="outlined-basic" label="Search Cryptocurrency" variant="outlined" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}/>
        </div>
      )}
        <Box sx={{ flexGrow: 1 }}>

        <Grid container spacing={{ xs: 2, md: 3 }} columnSpacing={{  xs: 1, sm: 2, md: 3 }}>
        {cryptos ?.map((currency) => (
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>

            <Card sx={{ minWidth: 250,padding:2,margin:2}} className="card">
              <CardHeader style={{textAlign:'start'}}
                  avatar={
                    <Avatar alt="Remy Sharp" src={currency.iconUrl} />
                  }
                  title={`${currency.rank}. ${currency.name}`}
                />
            <CardContent >
                <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {currency.change}%</p>
            </CardContent>
          </Card>
          </Link>
          )
          )}
          </Grid>
        </Box>
    </div>
  )
}
