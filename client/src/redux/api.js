/**
 * IMPORTS
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Products',
    'Customers',
    'Transactions',
    'Geography',
    'Sales',
    'Admins',
    'Performance',
    'Dashboard',
  ],
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
      getCustomers: build.query({
        query: function () {
          return `client/customers`;
        },
        providesTags: ['Customers'],
      }),
      getTransactions: build.query({
        query: function ({ page, pageSize, sort, search }) {
          return {
            url: 'client/transactions',
            method: 'GET',
            params: { page, pageSize, sort, search },
          };
        },
        providesTags: ['Transactions'],
      }),
      getGeographyData: build.query({
        query: () => 'client/geography',
        providesTags: ['Geography'],
      }),
      getSales: build.query({
        query: () => 'sales/sales',
        providesTags: ['Sales'],
      }),
      getAdmins: build.query({
        query: function () {
          return 'management/admins';
        },
        providesTags: ['Admins'],
      }),
      getUserPerformance: build.query({
        query: function (id) {
          return `management/performance/${id}`;
        },
        providesTags: ['Performance'],
      }),
      getDashboardStats: build.query({
        query: function () {
          return `general/dashboard`;
        },
        providesTags: ['Dashboard'],
      }),
    };
  },
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyDataQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardStatsQuery,
} = api;
