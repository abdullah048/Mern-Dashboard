import { Box, Typography, useTheme } from '@mui/material';

function Header({ title, subTitle }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant='h2'
        color={theme.palette.secondary[100]}
        fontWeight='bold'
        mb='5px'>
        {title}
      </Typography>
      <Typography variant='caption' color={theme.palette.secondary[300]}>
        {subTitle}
      </Typography>
    </Box>
  );
}

export default Header;
