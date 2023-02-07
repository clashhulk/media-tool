import 'react-toastify/dist/ReactToastify.css';

import ArticleIcon from '@mui/icons-material/Article';
import CallIcon from '@mui/icons-material/Call';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { briefCall, briefHistory } from '../../adapter/BriefmsAdapter.jsx';
import allowedRoll from '../../functions/allowedRoll';
import toBriefCrud from '../../functions/toBriefCrud';

const BurgerMenu = ({
  client_id,
  brief_id,
  name,
  status,
  setLoading,
  updateData,
  month,
  year,
}) => {
  const [popup, setPopup] = React.useState({
    open1: false,
    open2: false,
    open3: false,
    open4: false,
  });
  const [history, setHistory] = React.useState([]);
  const [opend3] = React.useState(false);
  var navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const tatAction = (action, value) => {
    setLoading({ action: true });
    var request;
    action === "call_required" &&
      (request = {
        client_id: client_id,
        brief_id: brief_id,
        call_required: value,
      });
    action === "call_completed" &&
      (request = {
        client_id: client_id,
        brief_id: brief_id,
        call_completed: value,
      });
    action === "media_plan_approved" &&
      (request = {
        client_id: client_id,
        brief_id: brief_id,
        media_plan_approved: value,
      });
    const info = briefCall(request);
    info.then(function (result) {
      setLoading({ action: false });
      if (result.status === "Success") {
        toast.success(result.message);
        updateData();
      } else {
        toast.error(result.message);
      }
    });
  };
  const showHistory = () => {
    setPopup({ ...popup, open4: true });
    // setLoading({ action: true });
    let request = {
      client_id: client_id,
      brief_id: brief_id,
    };
    const info = briefHistory(request);
    info.then(function (result) {
      // setLoading({ action: false });
      if (result.status === "Success") {
        setHistory(result.data);
      } else {
      }
    });
  };
  return (
    <div>
      <MenuIcon
        brief_id={"basic-button"}
        aria-controls={menuOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      />
      <Menu
        brief_id={"basic-menu"}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        {allowedRoll(1, 2, 4) !== true && (
          <div>
            <MenuItem
              disabled={status === "pending"}
              onClick={async () => {
                setLoading({ action: true });
                const responce = toBriefCrud(
                  "view",
                  client_id,
                  brief_id,
                  month,
                  year
                );
                responce.then(function (result) {
                  setLoading({ action: false });
                  console.log(
                    "/dashboard/Brieform/" + brief_id + "?form=" + name,
                    {
                      state: result,
                    }
                  );
                  navigate(
                    "/dashboard/Brieform/" + brief_id + "?form=" + name,
                    {
                      state: result,
                    }
                  );
                });
              }}>
              <ListItemIcon>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              Brief View
            </MenuItem>
            <MenuItem
              disabled={status !== "brief_received"}
              onClick={() => {
                setPopup({ ...popup, open1: true });
              }}>
              <ListItemIcon>
                <CallIcon fontSize="small" />
              </ListItemIcon>
              TAT call options
            </MenuItem>
            <MenuItem
              disabled={status !== "call_discussion"}
              onClick={() => {
                setPopup({ ...popup, open2: true });
              }}>
              <ListItemIcon>
                <CallIcon fontSize="small" />
              </ListItemIcon>
              Call Status
            </MenuItem>
            <MenuItem onClick={() => showHistory()}>
              <ListItemIcon>
                <HistoryIcon fontSize="small" />
              </ListItemIcon>
              Status History
            </MenuItem>
          </div>
        )}

        {allowedRoll(8, 19) !== true && (
          <div>
            <MenuItem
              disabled={status !== "pending"}
              onClick={async () => {
                setLoading({ action: true });
                const responce = toBriefCrud(
                  "submit",
                  client_id,
                  brief_id,
                  month,
                  year
                );
                responce.then(function (result) {
                  setLoading({ action: false });
                  navigate(
                    "/dashboard/Brieform/" + brief_id + "?form=" + name,
                    {
                      state: result,
                    }
                  );
                });
              }}>
              <ListItemIcon>
                <ArticleIcon fontSize="small" />
              </ListItemIcon>
              Brief Submission
            </MenuItem>
            <MenuItem
              disabled={status === "pending"}
              onClick={async () => {
                setLoading({ action: true });
                const responce = toBriefCrud(
                  "view",
                  client_id,
                  brief_id,
                  month,
                  year
                );
                responce.then(function (result) {
                  setLoading({ action: false });

                  console.log(
                    navigate(
                      "/dashboard/Brieform/" + brief_id + "?form=" + name,
                      {
                        state: result,
                      }
                    )
                  );
                  navigate(
                    "/dashboard/Brieform/" + brief_id + "?form=" + name,
                    {
                      state: result,
                    }
                  );
                });
              }}>
              <ListItemIcon>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              Brief View
            </MenuItem>
            <MenuItem
              disabled={
                status !== "brief_received" && status !== "call_discussion"
              }
              onClick={async () => {
                setLoading({ action: true });
                const responce = toBriefCrud(
                  "edit",
                  client_id,
                  brief_id,
                  month,
                  year
                );
                responce.then(function (result) {
                  setLoading({ action: false });
                  navigate(
                    "/dashboard/Brieform/" + brief_id + "?form=" + name,
                    {
                      state: result,
                    }
                  );
                });
              }}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>

            <Divider />
            <MenuItem
              disabled={status !== "media_plan_shared"}
              onClick={() => setPopup({ ...popup, open3: true })}>
              <ListItemIcon>
                <SwitchRightIcon fontSize="small" />
              </ListItemIcon>
              Approve
            </MenuItem>
            <MenuItem onClick={() => showHistory()}>
              <ListItemIcon>
                <HistoryIcon fontSize="small" />
              </ListItemIcon>
              Status History
            </MenuItem>
          </div>
        )}
      </Menu>
      <Dialog
        open={popup.open1}
        onClose={() => setPopup({ ...popup, open1: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle brief_id="alert-dialog-title">
          {"Required Call for Brief Discussion ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText brief_id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              tatAction("call_required", "yes");
              setPopup({ ...popup, open1: false });
            }}>
            YES
          </Button>
          <Button
            onClick={() => {
              tatAction("call_required", "no");
              setPopup({ ...popup, open1: false });
            }}>
            NO
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={popup.open2}
        onClose={() => setPopup({ ...popup, open2: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle brief_id="alert-dialog-title">
          {"Is Call Completed ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText brief_id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              tatAction("call_completed", "yes");
              setPopup({ ...popup, open2: false });
            }}>
            YES
          </Button>
          <Button
            onClick={() => {
              tatAction("call_completed", "no");
              setPopup({ ...popup, open2: false });
            }}>
            NO
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={popup.open3}
        onClose={() => setPopup({ ...popup, open3: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle brief_id="alert-dialog-title">
          {"Approve Media Plan ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText brief_id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              tatAction("media_plan_approved", "yes");
              setPopup({ ...popup, open3: false });
            }}>
            YES
          </Button>
          <Button
            onClick={() => {
              tatAction("media_plan_approved", "no");
              setPopup({ ...popup, open3: false });
            }}>
            NO
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={popup.open4}
        onClose={() => setPopup({ ...popup, open4: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle brief_id="alert-dialog-title">
          {"Brief Status History"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText brief_id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <Table aria-label="simple table">
          {/* <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead> */}
          <TableBody>
            {history.map((history) => {
              return (
                <TableRow
                  key={history.created_at}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}>
                  <TableCell
                    component="th"
                    style={{ textTransform: "capitalize" }}
                    scope="row">
                    {history.brief_status.replaceAll("_", " ")}
                  </TableCell>
                  <TableCell align="right">{history.name}</TableCell>
                  <TableCell align="right">
                    {history.created_at.slice(0, 10)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <DialogActions>
          <Button
            onClick={() => {
              setPopup({ ...popup, open4: false });
            }}>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BurgerMenu;
