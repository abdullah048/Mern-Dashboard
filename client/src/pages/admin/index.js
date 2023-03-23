import React, { Fragment } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetAdminsQuery } from '../../redux/api';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';

function Admins() {
  const theme = useTheme();
  const { data:admins, isLoading } = useGetAdminsQuery();
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 1,
      renderCell: function (params) {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.7,
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
    },
  ];
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='ADMINS' subTitle='List of Admins.' />
      {admins || !isLoading ? (
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
            loading={isLoading || !admins}
            getRowId={function (row) {
              return row._id;
            }}
            rows={admins || []}
            columns={columns}
          />
        </Box>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </Box>
  );
}

export default Admins;
