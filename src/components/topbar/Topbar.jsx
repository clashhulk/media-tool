import './topbar.css';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Logout from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import profile from '../../assets/user-profile.png';

export default function Topbar() {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex_topbar">
      {/* <div className="SearchTextField">
				<TextField
					placeholder="Search"
					id="SearchTopText"
					type="search"
					variant="outlined"
					margin="normal"
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<SearchIcon />
							</InputAdornment>
						)
					}}
				/>
			</div> */}

      <div className="notifications">
        <div className="topbarIconContainer">
          <NotificationsNoneIcon />
          <span className="topIconBadge">2</span>
        </div>
        {/* <div className="topbarIconContainer">
          <LanguageIcon />
          <span className="topIconBadge">2</span>
        </div>
        <div className="topbarIconContainer">
          <SettingsIcon />
        </div> */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open1}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <Link
            to="/dashboard/profile"
            style={{ textDecoration: "none", color: "#333" }}>
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
          </Link>
          {/* <MenuItem>
            <Avatar /> My account
          </MenuItem> */}
          <Divider />
          <Link
            to="/dashboard/profile/reset-password"
            style={{ textDecoration: "none", color: "#333" }}>
            <MenuItem>
              <ListItemIcon>
                <AdminPanelSettingsIcon fontSize="small" />
              </ListItemIcon>
              Password Manager
            </MenuItem>
          </Link>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
