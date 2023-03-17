import { Box, useTheme } from '@mui/material';
import { Fragment } from 'react';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useGetCustomersQuery } from '../../redux/api';

function Customers() {
  const theme = useTheme();
  const { data: customers, isLoading } = useGetCustomersQuery();
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
      flex: 0.5,
      renderCell: function (params) {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.4,
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
      <Header title='CUSTOMERS' subTitle='List of Customers.' />
      {customers || !isLoading ? (
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
            loading={isLoading || !customers}
            getRowId={function (row) {
              return row._id;
            }}
            rows={customers || []}
            columns={columns}
          />
        </Box>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </Box>
  );
}

export default Customers;
