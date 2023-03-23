import React, { Fragment } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetUserPerformanceQuery } from '../../redux/api';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

function UserPerformance() {
  const theme = useTheme();
  const userId = useSelector(function (state) {
    return state.global.userId;
  });
  const { data: users, isLoading } = useGetUserPerformanceQuery(userId);
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      renderCell: function (params) {
        return params.value.length;
      },
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: function (params) {
        return `$${Number(params.value).toFixed(2)}`;
      },
    },
  ];
  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='PERFORMANCE'
        subTitle='Track your affiliate sales performance here.'
      />
      {users || !isLoading ? (
        <Box
          mt='40px'
          height='70vh'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.primary.light,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}>
          <DataGrid
            loading={isLoading || !users}
            getRowId={function (row) {
              return row._id;
            }}
            rows={users && users.sales || []}
            columns={columns}
          />
        </Box>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </Box>
  );
}

export default UserPerformance;
