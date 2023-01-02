import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import AllCurrencies from './AllCurrencies';


const LineChart = ({ coinHistory, currentPrice, coinName }) => {

  var current_currency=useSelector((state)=>state.currency.currency)
  var current_selected_money=AllCurrencies.currencies.filter((x)=>x.uuid===current_currency)

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `Price In ${current_selected_money[0]?.symbol}`,
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Box className="chart-header">
        <Typography variant="h5" noWrap component="h5" className="chart-title">
            {coinName} Price Chart 
        </Typography>
        <Box className="price-container">
        <Typography variant="h5" noWrap component="h6" className="price-change">
        Change: {coinHistory?.data?.change}%
        </Typography>
        <Typography variant="h5" noWrap component="h6" className="current-price">
        Current {coinName} Price: {current_selected_money[0]?.sign} {currentPrice}
        </Typography>
        
        </Box>
      </Box>
      <Line data={data}/>
    </>
  );
};

export default LineChart;