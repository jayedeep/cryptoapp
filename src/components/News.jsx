import React, { useState } from 'react'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { maxWidth } from '@mui/system';
import moment from 'moment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useSelector } from 'react-redux';


export default function News({simplified}) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  var current_currency=useSelector((state)=>state.currency.currency)

  const { data } = useGetCryptosQuery({count:100,current_currency});
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 ,current_currency});
  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

  console.log(">>>>>>>data",newsCategory)
  if (!cryptoNews?.value) return "Loading...";

  return (
    <div className='crypto-card-container-news'>
        {!simplified && (
        <div className="search-crypto">
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select a Crypto</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select a Crypto"
              sx={{ width: 250 }}
              onChange={(e) => setNewsCategory(e.target.value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >

            <MenuItem value="Cryptocurency">Cryptocurency</MenuItem>
                {data?.data?.coins?.map((currency) =>
                <MenuItem value={currency.name}>{currency.name}</MenuItem>
                )}

        </Select>
        </FormControl>
         
          {/* <TextField id="outlined-basic" label="Select a Crypto" variant="outlined" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}/> */}
        </div>
      )}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                {cryptoNews.value.map((news, i) => (
                <Card sx={{ minWidth: 300, maxWidth:300,padding:2,margin:2}} className="card">
                    <CardContent >
                        <Typography gutterBottom variant="h7" component="div">
                        <a href={news.url} target="_blank" rel="noreferrer">

                        {news.name}
                        </a>
                        </Typography>
                        
                      </CardContent>
                      <CardMedia
                        component="img"
                        height="140"
                        image={news?.image?.thumbnail?.contentUrl || demoImage}
                        alt="green iguana"
                      />
                        <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                        <div className="provider-container">
                              <div>
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                <Typography gutterBottom component="div" className="provider-name">
                                {news.provider[0]?.name}
                                </Typography>
                              </div>
                              <Typography>
                                {moment(news.datePublished).startOf('ss').fromNow()}
                                </Typography>
                            </div>
                </Card>
              ))}
          </Grid>
      </Box>
          
  </div>
  )
}
