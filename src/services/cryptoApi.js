import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '360c1e21cemsh2d4369ac3febbdap12cf39jsn0c5df2f0e127',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url,headers:cryptoApiHeaders})


export const cryptoApi=createApi({
    reducerPath: 'cryptoApi',
    baseQuery:fetchBaseQuery({
        baseUrl
    }),
    endpoints:(builder)=>({
        getCryptos:builder.query({
            query:({count,current_currency})=>createRequest(`/coins?limit=${count}&&referenceCurrencyUuid=${current_currency}`),
        }),
          // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
          getCryptoDetails: builder.query({
            query: ({coinId,current_currency}) => createRequest(`/coin/${coinId}?referenceCurrencyUuid=${current_currency}`),
          }),
      
          // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
          getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod,current_currency }) => createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}&&referenceCurrencyUuid=${current_currency}`),
          }),
    
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
}=cryptoApi;