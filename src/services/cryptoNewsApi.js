import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apikey = 'pub_343840b501d5dfd961280ec4887432ecb230'

const createRequest = (url) => ({ url });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: ' https://newsdata.io/api/1/news'}),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory }) => createRequest(`?apikey=${apikey}&q=${newsCategory}&language=en`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;