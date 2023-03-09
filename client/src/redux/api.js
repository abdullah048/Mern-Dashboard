/**
 * IMPORTS
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Products'],
  endpoints: function (build) {
    return {
      getUser: build.query({
        query: function (id) {
          return `general/user/${id}`;
        },
        providesTags: ['User'],
      }),
      getProducts: build.query({
        query: function () {
          return `client/products`;
        },
        providesTags: ['Products'],
      }),
    };
  },
});

export const { useGetUserQuery, useGetProductsQuery } = api;
