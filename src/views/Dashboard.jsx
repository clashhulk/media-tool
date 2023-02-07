import '../components/leftbar/leftbar.css';
import './dashboard.css';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupsIcon from '@mui/icons-material/Groups';
import KeyIcon from '@mui/icons-material/Key';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';

import logo from '../assets/logo.webp';
import AdminProfile from '../components/dashboard-user/Profile';
import ResetPassword from '../components/dashboard-user/ResetPassword';
import Topbar from '../components/topbar/Topbar';
import ProtectedRoutes from '../functions/ProtectedRoutes';
import allowedRoll from './../functions/allowedRoll';
import About from './About';
import Permissions from './access/Permissions';
import RolesCrud from './access/RolesCrud';
import RolesList from './access/RolesList';
import Agency from './agency/Agency';
import BriefAssign from './assign_briefs/BriefAssign';
import ClientAssign from './assign_clients/ClientAssign';
import BriefSummary from './brief/BriefSummary';
import BriefMasterCrud from './briefMaster/BriefMasterCrud';
import BriefMasterList from './briefMaster/BriefMasterList';
import Brieform from './Brieform/Brieform';
import BriefTable from './Brieform/BriefTable';
import ClientAdd from './client/ClientAdd';
import ClientList from './client/ClientList';
import ClientMasterAdd from './clientMaster/ClientMasterAdd';
import ClientMasterList from './clientMaster/ClientMasterList';
import Feedback from './Feedback';
import Home from './home/Home';
import MediaPlanList from './media/MediaPlanList';
import MediaUpload from './media/MediaUpload';
import ProductCrud from './product/ProductCrud';
import ProductList from './product/ProductList';
import UserCrud from './user/UserCrud';
import UserList from './user/UserList';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const [open, setOpen] = React.useState(
    window.screen.availWidth < "730" ? false : true
  );

  const [openL1, setOpenL1] = React.useState(false);
  const [openL2, setopenL2] = React.useState(false);

  const [openL3, setopenL3] = React.useState(false);
  console.log();
  return (
    <Box sx={{ display: "-webkit-box" }}>
      <CssBaseline />
      <AppBar className="Mui-Header-Custom" position="fixed" open={open}>
        <Toolbar
          className="header-tab"
          style={{
            margin: open && "10px 24px 0 24px",
          }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(!open);
            }}
            edge="start"
            sx={{
              marginRight: 5,
            }}>
            <MenuIcon style={{ color: "#000" }} />
          </IconButton>
          <Topbar />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" style={{ border: "none" }} open={open}>
        <DrawerHeader>
          <div className="topLeft">
            <img src={logo} alt="" className="logo" width="140" height="60" />
          </div>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton> */}
        </DrawerHeader>
        <List style={{ marginTop: "1rem" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link
              to=""
              // style={{ backgroundColor: "#fff!important" }}
              className="nav-links">
              <ListItemButton
                style={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                }}
                className="left-menue-list-button">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Dashboard"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          {allowedRoll(2) !== true && (
            <Divider style={{ margin: "0.5rem 0 1rem 0" }} />
          )}
          {allowedRoll(2) !== true && (
            <ListItem
              disablePadding
              sx={{ display: "block", overflow: "visible" }}>
              <NavLink to="/dashboard/clientmaster" className="nav-links">
                <ListItemButton
                  style={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                  }}
                  className="left-menue-list-button">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}>
                    <GroupsIcon />
                    {/* {!open && <ChevronRightIcon className="onclose-active" />} */}
                  </ListItemIcon>
                  <ListItemText
                    primary={"Client Group"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          )}

          {allowedRoll(2) !== true && (
            <ListItem disablePadding sx={{ display: "block" }}>
              <NavLink to="/dashboard/client" className="nav-links">
                <ListItemButton
                  style={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                  }}
                  className="left-menue-list-button">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}>
                    <PersonOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Clients"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          )}
        </List>
        <Divider style={{ margin: "0.5rem 0 1rem 0" }} />
        <List>
          <ListItemButton
            style={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
            }}
            onClick={() => {
              setOpenL1(!openL1);
            }}
            className="left-menue-list-button">
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1 : "auto",
                justifyContent: "center",
              }}>
              <NextWeekIcon />
            </ListItemIcon>
            <ListItemText
              primary="Brief Mananger"
              sx={{ opacity: open ? 1 : 0 }}
            />
            {open && (openL1 ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openL1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {allowedRoll(2, 1) !== true && (
                <NavLink to="/dashboard/briefmaster" className="nav-links">
                  <ListItemButton
                    style={{ paddingLeft: open ? "30px" : "12px" }}
                    className="left-menue-list-button">
                    <WorkOutlineIcon
                      sx={{ fontSize: 25 }}
                      className="icons-l"
                    />
                    <ListItemText
                      primary="Master List"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              )}
              {allowedRoll(2, 1) !== true && (
                <NavLink to="/dashboard/product" className="nav-links">
                  <ListItemButton
                    style={{ paddingLeft: open ? "30px" : "12px" }}
                    className="left-menue-list-button">
                    <WorkOutlineIcon
                      sx={{ fontSize: 25 }}
                      className="icons-l"
                    />
                    <ListItemText
                      primary="Product line"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              )}
              {allowedRoll(2, 1) !== true && (
                <NavLink to="/dashboard/assign_briefs" className="nav-links">
                  <ListItemButton
                    style={{ paddingLeft: open ? "30px" : "12px" }}
                    className="left-menue-list-button">
                    <WorkHistoryIcon
                      sx={{ fontSize: 25 }}
                      className="icons-l"
                    />
                    <ListItemText
                      primary="Assignment"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              )}
              {allowedRoll(2, 19, 4, 8) !== true && (
                <NavLink to="/dashboard/briefsummary" className="nav-links">
                  <ListItemButton
                    style={{ paddingLeft: open ? "30px" : "12px" }}
                    className="left-menue-list-button">
                    <AssignmentTurnedInIcon
                      sx={{ fontSize: 25 }}
                      className="icons-l"
                    />
                    <ListItemText
                      primary="Summary"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              )}
            </List>
          </Collapse>

          {allowedRoll(1, 2, 19) !== true && (
            <ListItemButton
              style={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
              }}
              onClick={() => {
                setopenL2(!openL2);
              }}
              className="left-menue-list-button">
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                primary="User Manager"
                sx={{ opacity: open ? 1 : 0 }}
              />
              {open && (openL2 ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          )}
          <Collapse in={openL2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {allowedRoll(1, 2, 19) !== true && (
                <NavLink to="/dashboard/user" className="nav-links">
                  <ListItemButton
                    style={{ paddingLeft: open ? "30px" : "12px" }}
                    className="left-menue-list-button">
                    <PersonOutlineIcon
                      sx={{ fontSize: 25 }}
                      className="icons-l"
                    />
                    <ListItemText
                      primary="Users"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              )}

              {allowedRoll(1, 2, 19) !== true && (
                <NavLink to="/dashboard/assign-clients" className="nav-links">
                  <ListItemButton
                    style={{ paddingLeft: open ? "30px" : "12px" }}
                    className="left-menue-list-button">
                    <AssignmentIndIcon
                      sx={{ fontSize: 25 }}
                      className="icons-l"
                    />
                    <ListItemText
                      primary="Assignment"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              )}
            </List>
          </Collapse>

          {allowedRoll(1, 2) !== true && (
            <ListItemButton
              style={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
              }}
              onClick={() => {
                setopenL3(!openL3);
              }}
              className="left-menue-list-button">
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText
                primary="Access Manager"
                sx={{ opacity: open ? 1 : 0 }}
              />
              {open && (openL3 ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          )}
          <Collapse in={openL3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {allowedRoll(1, 2) !== true && (
                <NavLink to="/dashboard/roles" className="nav-links">
                  <ListItemButton
                    style={{ paddingLeft: open ? "30px" : "12px" }}
                    className="left-menue-list-button">
                    <ManageAccountsIcon
                      sx={{ fontSize: 25 }}
                      className="icons-l"
                    />
                    <ListItemText
                      primary="Roles"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              )}

              {allowedRoll(1, 2) !== true && (
                <NavLink to="/dashboard/permissions" className="nav-links">
                  <ListItemButton
                    style={{ paddingLeft: open ? "30px" : "12px" }}
                    className="left-menue-list-button">
                    <KeyIcon sx={{ fontSize: 25 }} className="icons-l" />
                    <ListItemText
                      primary="Permissions"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              )}
            </List>
          </Collapse>
        </List>

        <Divider style={{ margin: "0.5rem 0 1rem 0" }} />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink to="/dashboard/mediaplanlist" className="nav-links">
              <ListItemButton
                style={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                }}
                className="left-menue-list-button">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}>
                  <SaveAltIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Media Plans"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
          {allowedRoll(2, 1) !== true && (
            <ListItem disablePadding sx={{ display: "block" }}>
              <NavLink to="/dashboard/agency" className="nav-links">
                <ListItemButton
                  style={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                  }}
                  className="left-menue-list-button">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}>
                    <ApartmentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Agency Details"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile">
            <Route index element={<AdminProfile />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="clientmaster">
            <Route index element={<ClientMasterList />} />
            <Route path="add" element={<ClientMasterAdd />} />
            <Route path="crud" element={<ClientMasterAdd />} />
            <Route path="*" element={<ClientList />} />
          </Route>
          <Route path="client">
            <Route element={<ProtectedRoutes allowedRoles={[2, 3, 4, 5, 6]} />}>
              <Route index element={<ClientList />} />
            </Route>
            <Route path="add" element={<ClientAdd />} />
            <Route path="crud" element={<ClientAdd />} />
            <Route path="*" element={<ClientList />} />
          </Route>
          <Route path="user">
            <Route index element={<UserList />} />
            <Route path="crud" element={<UserCrud />} />
            <Route path="*" element={<UserList />} />
          </Route>
          <Route path="assign-clients">
            <Route index element={<ClientAssign />} />
          </Route>
          <Route path="assign_briefs">
            <Route index element={<BriefAssign />} />
          </Route>

          <Route path="briefsummary">
            <Route index element={<BriefSummary />} />
          </Route>
          <Route path="briefmaster">
            <Route index element={<BriefMasterList />} />
            <Route path="crud" element={<BriefMasterCrud />} />
          </Route>
          <Route path="product">
            <Route index element={<ProductList />} />
            <Route path="crud" element={<ProductCrud />} />
          </Route>
          <Route path="Brieform/:id" element={<Brieform />} />
          <Route path="BriefTable">
            <Route index element={<BriefTable />} />
          </Route>

          <Route path="BriefAssign">
            <Route index element={<BriefAssign />} />
          </Route>
          <Route path="roles">
            <Route index element={<RolesList />} />
            <Route path="crud" element={<RolesCrud />} />
            <Route path="*" element={<RolesList />} />
          </Route>
          <Route path="permissions">
            <Route index element={<Permissions />} />
            <Route path="*" element={<Permissions />} />
          </Route>
          <Route path="mediaplanlist">
            <Route index element={<MediaPlanList />} />
          </Route>
          <Route path="MediaUpload">
            <Route index element={<MediaUpload />} />
          </Route>
          <Route path="agency">
            <Route index element={<Agency />} />
          </Route>
          <Route path="feedback" element={<Feedback />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Box>
    </Box>
  );
}
