import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';


import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import AllCurrencies from './AllCurrencies';


export default function CryptoDetails() {
  var current_currency=useSelector((state)=>state.currency.currency)

  var current_selected_money=AllCurrencies.currencies.filter((x)=>x.uuid===current_currency)

  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery({coinId,current_currency});
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod,current_currency });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return 'Loading...';

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: `Price to ${current_selected_money[0]?.symbol}`, value: `${current_selected_money[0]?.sign} ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <AttachMoneyIcon /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <StarIcon /> },
    { title: '24h Volume', value: `${current_selected_money[0]?.sign} ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ElectricBoltIcon /> },
    { title: 'Market Cap', value: `${current_selected_money[0]?.sign} ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <AttachMoneyIcon /> },
    { title: 'All-time-high(daily avg.)', value: `${current_selected_money[0]?.sign} ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <EmojiEventsIcon /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <ListAltIcon /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <CurrencyExchangeIcon /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckBoxIcon /> : <RemoveDoneIcon />, icon: <RunningWithErrorsIcon /> },
    { title: 'Total Supply', value: `${current_selected_money[0]?.sign} ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <RunningWithErrorsIcon /> },
    { title: 'Circulating Supply', value: `${current_selected_money[0]?.sign} ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <RunningWithErrorsIcon /> },
  ];

  return (
    <Box sx={{ flexGrow: 1 }} className="coin-detail-container">
        <Box className="coin-heading-container">
            <Typography variant="h4" noWrap component="div" className="coin-name">
            {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
            </Typography>
            <p>{cryptoDetails.name} live price in {current_selected_money[0]?.name} ({current_selected_money[0]?.symbol}). View value statistics, market cap and supply.</p>
        </Box>

       <Box sx={{marginTop:2}}>
          <FormControl fullWidth>

          <InputLabel id="demo-simple-select-label2">Select Timeperiod</InputLabel>
          <Select 
          defaultValue="7d" 
          labelId="demo-simple-select-label2"
          className="select-timeperiod"
          label="Select Timeperiod" 
          onChange={(e) => setTimeperiod(e.target.value)}
          >
            {time.map((date) => <MenuItem value={date}>{date}</MenuItem>)}
          </Select>
          </FormControl>
          <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />

        </Box>
        <Box className="stats-container">
          <Box className="coin-value-statistics">
            <Box className="coin-value-statistics-heading">
                <Typography variant='h4' noWrap component="h4" className="coin-details-heading" >
                {cryptoDetails.name} Value Statistics
                <p>An overview showing the statistics of {cryptoDetails.name}.</p>
                </Typography>
            </Box>
              {stats.map(({ icon, title, value }) => (
              <Box className="coin-stats">
                <Box className="coin-stats-name">
                  <Typography>
                    {icon}
                    </Typography>
                  <Typography>
                    {title}
                    </Typography>
                </Box>
                <Typography className="stats">{value}</Typography>
              </Box>
            ))}
          </Box>
          <Box className="other-stats-info">
            <Box className="coin-value-statistics-heading">
                <Typography variant='h4' noWrap component="h4" className="coin-details-heading" >
               Other Stats Info
                <p>An overview showing the statistics of {cryptoDetails.name}.</p>
                </Typography>
            </Box>
              {genericStats.map(({ icon, title, value }) => (
              <Box className="coin-stats">
                <Box className="coin-stats-name">
                  <Typography>
                    {icon}
                    </Typography>
                  <Typography>
                    {title}
                    </Typography>
                </Box>
                <Typography className="stats">{value}</Typography>
              </Box>
            ))}
          </Box>

        </Box>
        <Box className="coin-desc-link">
          <Box className="coin-desc">
                <Typography variant="h5"  component="h5"  className="coin-details-heading">
                What is {cryptoDetails.name}?
                {HTMLReactParser(cryptoDetails.description)}
                </Typography>
          </Box>
            <Box className="coin-links">
                  <Typography variant="h5"  component="h5"  className="coin-details-heading">
                  {cryptoDetails.name} Links
                  </Typography>
                  {cryptoDetails.links?.map((link) => (
                    <Box className="coin-link" key={link.name}>
                      <Typography variant="h6"  component="h6" className="link-name">
                        {link.type}
                      </Typography>
                      <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                    </Box>
                  ))}
          </Box>
        </Box>
       
      </Box>
    )
}
