import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Box, Chip, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const options = ['Post', 'Group', 'Event', 'Blog'];

const NavCreateButton = () => {

  const navigate = useNavigate();
  const [anchorElCreate, setAnchorElCreate] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElCreate(event.currentTarget);
  };

  const handleCloseUserMenu = (option) => {

    if (option && option === 'Post') {
      navigate('/create-post');
    }

    setAnchorElCreate(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Create">
        <Chip
          icon={<AddIcon />}
          label="Create"
          sx={{ backgroundColor: 'white', ':hover': { backgroundColor: 'white' }, mx: 3 }}
          onClick={handleOpenUserMenu}
        />
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElCreate}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElCreate)}
        onClose={() => handleCloseUserMenu()}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleCloseUserMenu(option)}>
            <Typography textAlign="center">{option}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default NavCreateButton;