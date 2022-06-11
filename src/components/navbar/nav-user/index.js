import React from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import Images from '../../../assets'

const settings = ['Profile', 'Logout'];

const NavUser = () => {

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, }}>
          <Avatar alt="Jeff Hardy" src={Images.avatar} />
          <Typography textAlign="center" sx={{
            ml: 1,
            display: { xs: 'none', md: 'flex' },
            ...styling.title
          }}>
            {'Jeff'}
          </Typography>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default NavUser;

const styling = {
  title: {
    mr: 2,
    fontFamily: 'monospace',
    fontWeight: 700,
    color: 'white',
    textDecoration: 'none',
  }
}