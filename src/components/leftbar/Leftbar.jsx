import './leftbar.css';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupsIcon from '@mui/icons-material/Groups';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '../../assets/BRIMAS logo white.png';
import allowedRoll from '../../functions/allowedRoll';

export default function Leftbar() {
  const navigate = useNavigate();
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  // const logout = () => {
  //   localStorage.clear();
  //   navigate("/");
  // };
  function clientManagement() {
    setOpen1(!open1);
  }
  function userManagement() {
    setOpen2(!open2);
  }
  function brifManagement() {
    setOpen3(!open3);
  }
  function mediaManagement() {
    setOpen4(!open4);
  }
  function BriefForms() {
    setOpen5(!open5);
  }

  return (
    <div className="leftbar" id="leftbar">
      <div className="topLeft">
        <img src={logo} alt="" className="logo" width="140" height="60" />
      </div>
      <div className="leftscroll">
        <div className="leftbarWrapper">
          <div className="leftbarMenu">
            <h3 className="leftbarTitle">Dashboard</h3>
            <List>
              <NavLink to="/dashboard" className="nav-links">
                <ListItemButton>
                  <DashboardIcon fontSize="small" className="icons-l" />
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </NavLink>
              <h3 className="leftbarTitle">Quick Menu</h3>
              {allowedRoll(2) !== true && (
                <ListItemButton onClick={clientManagement}>
                  <SupervisedUserCircleIcon
                    fontSize="small"
                    className="icons-l"
                  />
                  <ListItemText primary="Client Manager" />
                  {open1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              )}
              {allowedRoll(2) !== true && (
                <Collapse in={open1} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <NavLink to="/dashboard/clientmaster" className="nav-links">
                      <ListItemButton sx={{ pl: 4 }}>
                        <GroupsIcon sx={{ fontSize: 15 }} className="icons-l" />
                        <ListItemText primary="Client Group" />
                      </ListItemButton>
                    </NavLink>
                    <NavLink to="/dashboard/client" className="nav-links">
                      <ListItemButton sx={{ pl: 4 }}>
                        <PersonOutlineIcon
                          sx={{ fontSize: 15 }}
                          className="icons-l"
                        />
                        <ListItemText primary="All Clients" />
                      </ListItemButton>
                    </NavLink>
                  </List>
                </Collapse>
              )}

              {/* Brief managament */}
              <ListItemButton onClick={brifManagement}>
                <NextWeekIcon fontSize="small" className="icons-l" />
                <ListItemText primary="Brief Mananger" />
                {open3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {allowedRoll(2) !== true && (
                    <NavLink to="/dashboard/briefmaster" className="nav-links">
                      <ListItemButton sx={{ pl: 4 }}>
                        <WorkHistoryIcon
                          sx={{ fontSize: 15 }}
                          className="icons-l"
                        />
                        <ListItemText primary="Master List" />
                      </ListItemButton>
                    </NavLink>
                  )}
                  {allowedRoll(2) !== true && (
                    <NavLink to="/dashboard/product" className="nav-links">
                      <ListItemButton sx={{ pl: 4 }}>
                        <WorkHistoryIcon
                          sx={{ fontSize: 15 }}
                          className="icons-l"
                        />
                        <ListItemText primary="Product line" />
                      </ListItemButton>
                    </NavLink>
                  )}
                  {allowedRoll(2) !== true && (
                    <NavLink
                      to="/dashboard/assign_briefs"
                      className="nav-links">
                      <ListItemButton sx={{ pl: 4 }}>
                        <WorkHistoryIcon
                          sx={{ fontSize: 15 }}
                          className="icons-l"
                        />
                        <ListItemText primary="Assignment" />
                      </ListItemButton>
                    </NavLink>
                  )}
                  {allowedRoll(2, 19, 4, 8) !== true && (
                    <NavLink to="/dashboard/briefsummary" className="nav-links">
                      <ListItemButton sx={{ pl: 4 }}>
                        <WorkHistoryIcon
                          sx={{ fontSize: 15 }}
                          className="icons-l"
                        />
                        <ListItemText primary="Summary" />
                      </ListItemButton>
                    </NavLink>
                  )}
                </List>
              </Collapse>
              {/* User managemen*/}
              {allowedRoll(1, 2, 19) !== true && (
                <ListItemButton onClick={userManagement}>
                  <AccountBoxIcon fontSize="small" className="icons-l" />
                  <ListItemText primary="User Manager" />
                  {open2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              )}
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {allowedRoll(1, 2, 19) !== true && (
                    <NavLink to="/dashboard/user" className="nav-links">
                      <ListItemButton sx={{ pl: 4 }}>
                        <PersonOutlineIcon
                          sx={{ fontSize: 15 }}
                          className="icons-l"
                        />
                        <ListItemText primary=" All Users" />
                      </ListItemButton>
                    </NavLink>
                  )}
                  {allowedRoll(1, 2, 19) !== true && (
                    <NavLink
                      to="/dashboard/assign-clients"
                      className="nav-links">
                      <ListItemButton sx={{ pl: 4 }}>
                        <PersonOutlineIcon
                          sx={{ fontSize: 15 }}
                          className="icons-l"
                        />
                        <ListItemText primary="Assignment" />
                      </ListItemButton>
                    </NavLink>
                  )}
                </List>
              </Collapse>
              {/* Media Management Menu */}
              <ListItemButton onClick={mediaManagement}>
                <PermMediaIcon fontSize="small" className="icons-l" />
                <ListItemText primary="Media Manager" />
                {open4 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open4} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <NavLink to="/dashboard/mediaplanlist" className="nav-links">
                    <ListItemButton sx={{ pl: 4 }}>
                      <SaveAltIcon className="leftbarIcon" />
                      <ListItemText primary="Media Plans" />
                    </ListItemButton>
                  </NavLink>
                </List>
              </Collapse>
              {/* Brief Forms */}
              {/* <ListItemButton onClick={BriefForms}>
                <ListItemText primary="Brief Forms" />
                {open5 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open5} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <NavLink to="/dashboard/Brieform/1" className="nav-links">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="PLCS_PLTB" />
                    </ListItemButton>
                  </NavLink>
                  <NavLink to="/dashboard/Brieform/2" className="nav-links">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="PLCS_GROWTH" />
                    </ListItemButton>
                  </NavLink>
                  <NavLink to="/dashboard/Brieform/3" className="nav-links">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="HealthInsurance" />
                    </ListItemButton>
                  </NavLink>
                  <NavLink to="/dashboard/Brieform/4" className="nav-links">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="IEMI" />
                    </ListItemButton>
                  </NavLink>
                  <NavLink to="/dashboard/Brieform/5" className="nav-links">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="CC" />
                    </ListItemButton>
                  </NavLink>
                  <NavLink to="/dashboard/Brieform/6" className="nav-links">
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="SME" />
                    </ListItemButton>
                  </NavLink>
                  <NavLink to="/dashboard/Brieform/7" className="nav-links">
                    <ListItemButton sx={{ pl: 4, pb: 4, mb: 4 }}>
                      <ListItemText primary="PERSONAL LOAN" />
                    </ListItemButton>
                  </NavLink>
                </List>
              </Collapse> */}
            </List>

            {/* <ul className="leftbarList">
              <li sx={{ pb: 4 }} className="leftbarListItem" onClick={logout}>
                <LogoutIcon className="leftbarIcon" />
                Logout
              </li>
            </ul> */}
            {/* <ul className="leftbarList">
              <li sx={{ pb: 4 }} className="leftbarListItem">
                <SwitchLeftIcon className="leftbarIcon" />
                Collapse
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}
