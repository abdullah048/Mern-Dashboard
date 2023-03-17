import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useGetTransactionsQuery } from '../../redux/api';
import Header from '../../components/Header';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';

function Transactions() {
  const theme = useTheme();
  /**
   * STATES
   */
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [sort, setSort] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search: searchText,
  });

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
      field: 'createAt',
      headerName: 'Create At',
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
      <Header title='TRANSACTIONS' subTitle='Entire list of transactions.' />
      <Box
        height='70vh'
        mt='40px'
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
          columns={columns}
          rows={(data && data.transactions) || []}
          loading={isLoading || !data}
          getRowId={function (row) {
            return row._id;
          }}
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          rowsPerPageOptions={[25, 50, 100]}
          paginationMode='server'
          sortingMode='server'
          onPageChange={function (newPage) {
            return setPage(newPage);
          }}
          onPageSizeChange={function (newPageSize) {
            setPageSize(newPageSize);
          }}
          onSortModelChange={function (newSortModal) {
            setSort(...newSortModal);
          }}
          components={{
            Toolbar: DataGridCustomToolbar,
          }}
          componentsProps={{
            toolbar: { searchQuery, setSearchQuery, setSearchText },
          }}
        />
      </Box>
    </Box>
  );
}

export default Transactions;
