import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import Header from '../../components/Header';
import { useGetProductsQuery } from '../../redux/api';

function Products() {
  const { data: products, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery('(min-width:1000px)');
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='PRODUCTS' subTitle='See your list of products.' />
      {products || !isLoading ? (
        <Box
          mt='20px'
          justifyContent='space-between'
          display='grid'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          rowGap='20px'
          columnGap='1.33%'
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}>
          {products.map(function (product) {
            return <Product key={product._id} product={product} />;
          })}
        </Box>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </Box>
  );
}

export default Products;

// Product Component

function Product({ product }) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}>
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
            color: theme.palette.secondary[700],
          }}
          gutterBottom>
          {product.category}
        </Typography>
        <Typography variant='h5' component='div'>
          {product.name}
        </Typography>
        <Typography sx={{ mb: '1.5rem', color: theme.palette.secondary[400] }}>
          ${product.price}
        </Typography>
        <Rating value={product.rating} readOnly />
        <Typography variant='body2'>{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='primary'
          size='small'
          onClick={function () {
            setIsExpanded(!isExpanded);
          }}>
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout='auto'
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}>
        <CardContent>
          <Typography>ID: {product._id}</Typography>
          <Typography>Supply Left: {product.supply}</Typography>
          <Typography>
            Yearly sales this year: {product.stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly units sold this year: {product.stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
