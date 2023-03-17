/**
 * IMPORTS
 */

import React, { useState } from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material';
import FlexBetween from '../../styled-components/flex-between';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { setMode } from '../../redux';

/**
 * Navbar component
 * @returns component for navbar for the application.
 */
function Navbar({ isSidebarOpen, setIsSidebarOpen, user }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  // USE-STATES
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = function (event) {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = function (event) {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Side */}
        <FlexBetween>
          <IconButton
            onClick={function () {
              setIsSidebarOpen(!isSidebarOpen);
            }}>
            <MenuIcon />
          </IconButton>

          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius='9px'
            gap='3rem'
            p='0.1rem 0.7rem'>
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap='1.5rem'>
          <IconButton
            onClick={function () {
              dispatch(
                setMode(theme.palette.mode == 'dark' ? 'light' : 'dark')
              );
            }}>
            {theme.palette.mode == 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                gap: '1rem',
              }}>
              <Box
                component='img'
                alt='profile'
                src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60'
                height='40px'
                width='40px'
                borderRadius='50%'
                sx={{
                  objectFit: 'cover',
                }}
              />
              <Box textAlign='left'>
                <Typography
                  fontWeight='bold'
                  fontSize='0.85rem'
                  color={theme.palette.secondary[100]}>
                  {user.name}
                </Typography>
                <Typography
                  fontSize='0.75rem'
                  color={theme.palette.secondary[200]}>
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  width: '25px',
                  height: '25px',
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}>
              <MenuItem onClick={handleClose}>Log out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
