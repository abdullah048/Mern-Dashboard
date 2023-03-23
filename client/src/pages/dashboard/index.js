import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useGetDashboardStatsQuery } from '../../redux/api';
import FlexBetween from '../../styled-components/flex-between';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from '@mui/icons-material';
import StatBox from '../../components/StatBox';
import OverviewChart from '../../components/OverviewChart';
import BreakdownChart from '../../components/BreakdownChart';

function Dashboard() {
  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery('(min-width:1200px)');
  const { data, isLoading } = useGetDashboardStatsQuery();
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
      <FlexBetween>
        <Header title='DASHBOARD' subTitle='Welcome to your dashboard.' />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}>
            <DownloadOutlined
              sx={{
                marginRight: '10px',
              }}
            />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        marginTop='20px'
        display='grid'
        gridTemplateColumns='repeat(12,1fr)'
        gridAutoRows='160px'
        gap='20px'
        sx={{
          '& > div': {
            gridColumn: isNonMediumScreen ? undefined : 'span 12',
          },
        }}>
        <StatBox
          title='Total Customers'
          value={data && data.totalCustomers}
          increase='+14%'
          description='Since last month'
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title='Monthly Sales'
          value={data && data.thisMonthStats.totalSales}
          increase='+5%'
          description='Since last month'
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <Box
          gridColumn='span 8'
          gridRow='span 2'
          backgroundColor={theme.palette.background.alt}
          p='1rem'
          borderRadius='0.55rem'>
          <OverviewChart view='sales' isDashboard={true} />
        </Box>
        <StatBox
          title='Sales Today'
          value={data && data.currentDayStats.totalSales}
          increase='+21%'
          description='Since last month'
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />

        <StatBox
          title='Yearly Sales'
          value={data && data.yearlySalesTotal}
          increase='+43%'
          description='Since last month'
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <Box
          gridColumn='span 8'
          gridRow='span 3'
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
          />
        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 3'
          backgroundColor={theme.palette.background.alt}
          p='1.5rem'
          borderRadius='0.55rem'>
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
            Sales by category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            sx={{
              color: theme.palette.secondary[200],
              padding: '0 0.6rem',
              fontSize: '0.8rem',
            }}>
            Breakdown of real states and information via category for revenue
            made by this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
