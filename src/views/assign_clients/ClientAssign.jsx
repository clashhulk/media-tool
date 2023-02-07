import './clientassign.css';
import 'react-toastify/dist/ReactToastify.css';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { getAssignedBriefs } from '../../adapter/BriefmsAdapter';
import { clientList } from '../../adapter/ClientAdapter';
import { assignUsers, getAssignedUsers, removeAssignedUsers, userofclient } from '../../adapter/UserAdapter';
import allowedRoll from '../../functions/allowedRoll';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const ClientAssign = () => {
  let Suser = JSON.parse(localStorage.getItem("userIn"));
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(
    Suser.client.length > 0 ? Suser.client[0].id : ""
  );
  const [subClients, setSubClients] = useState([]);
  const [subClient, setSubClient] = useState("");
  const [brief, setBrief] = useState("");
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [manager, setManager] = useState([]);
  const [assignedBriefs_, setAssignedBriefs] = useState([]);
  const [assignedUsers_, setAssignedUsers] = useState([]);
  const [userToAssign, setUserToAssign] = useState([]);
  const [userFromAssign, setUserFromAssign] = useState([]);
  const [filterData, setFilterData] = useState(
    Suser.client.length > 0
      ? { clientId: Suser.client[0].id, userType: `External` }
      : { clientId: "", userType: `All` }
  );
  const [open, setOpen] = React.useState(false);

  const [disSubmit, setDisSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const response1 = clientList();
    response1.then(function (result) {
      if (result.status === "Success") {
        setClients(result.data.clients);
      }
    });
    // const user_response = usersList(filterData);
    // user_response.then(function (result) {
    //   if (result.status === "Success") {
    //     console.log(result.data);
    //     setUsers(result.data);
    //     var concatinatedManegers = result.data.map(function (obj) {
    //       return obj.firstname + " " + obj.lastname + " ~~" + obj.id;
    //     });
    //     setManagers(concatinatedManegers);
    //   } else {
    //   }
    // });
  }, []);

  useEffect(() => {
    const user_response = userofclient(client);
    console.log(client);
    user_response.then(function (result) {
      if (result.status === "Success") {
        if (allowedRoll(19) !== false) {
          setAllUsers(result.data.all_user);
          setUsers(result.data.all_user);
          var concatinatedManegers = result.data.client_user.map(function (
            obj
          ) {
            return obj.firstname + " " + obj.lastname + " ~~" + obj.id;
          });
          setManagers(concatinatedManegers);
        } else {
          setAllUsers(result.data);
          setUsers(result.data);
          var concatinatedManegers = result.data.map(function (obj) {
            return obj.firstname + " " + obj.lastname + " ~~" + obj.id;
          });
          setManagers(concatinatedManegers);
        }
      } else {
      }
    });
  }, [client]);
  useEffect(() => {
    let Suser = JSON.parse(localStorage.getItem("userIn"));
    if (Suser.client.length > 0) {
      setClient(Suser.client[0].id);
      selectedClientAdd(Suser.client[0].id, "");
      let selectedClient = clients.filter(function (el) {
        return el.id === Suser.client[0].id;
      });
      // selectedClient[0].subclients !== undefined && setSubClients(selectedClient[0].subclients);
      // setSubClients(selectedClient[0].subclients);
    }
  }, [clients]);

  const selectedClientAdd = (selectedClientId, selectedSubClientId) => {
    const response = getAssignedBriefs(selectedClientId, selectedSubClientId);
    response.then(function (result) {
      if (result.status === "Success") {
        setAssignedBriefs(result.data);
      }
    });
  };
  const assignedUsersByBrief = (
    selectedClientId,
    selectedSubClientId,
    briefId
  ) => {
    let res = getAssignedUsers(selectedClientId, selectedSubClientId, briefId);
    res.then(function (result) {
      if (result.status === "Success") {
        setAssignedUsers(result.data.user);
        var concatinatedManegers = result.data.manager.map(function (obj) {
          return obj.firstname + " " + obj.lastname + " ~~" + obj.id;
        });
        let myfilter = result.data.manager.map((x) => {
          return { id: x.id };
        });
        const filteredUsers = allUsers.filter(
          (elem) => !myfilter.find(({ id }) => elem.id === id)
        );
        setUsers(filteredUsers);
        setManager(concatinatedManegers);
      }
    });
  };
  const handleChangeMultiple1 = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setUserFromAssign([]);
    setUserToAssign(value);
  };

  function handleChangeMultiple2(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setUserToAssign([]);
    setUserFromAssign(value);
  }
  const addBriefsToAssign = () => {
    if (userToAssign[0] === undefined) {
      toast.warn("Select one User from list to add");
      return 0;
    }
    let muiltiTransUser = [];
    userToAssign.forEach((element) => {
      let transUser = element.split("~~");
      var extracFilter = assignedUsers_.filter(function (assignedUsers_) {
        return parseInt(assignedUsers_.id) === parseInt(transUser[0]);
      });

      if (extracFilter[0]) {
        toast.warn(
          "User " +
            extracFilter[0].firstname +
            " " +
            extracFilter[0].lastname +
            " added already"
        );
        return 0;
      }

      setDisSubmit(false);
      muiltiTransUser.push(element.split("~~"));
    });

    muiltiTransUser = muiltiTransUser.map((transUser) => {
      return { id: transUser[0], firstname: transUser[1], lastname: "" };
    });
    setAssignedUsers([...assignedUsers_, ...muiltiTransUser]);
  };
  const removeAssignedBriefs = () => {
    if (userFromAssign[0] === undefined) {
      toast.warn("Select one brief from list to remove");
      return 0;
    }
    let transUser1 = userFromAssign[0].split("~~");

    setUserFromAssign([]);

    if (client !== "" && manager !== "") {
      const response = removeAssignedUsers(
        client,
        subClient,
        brief,
        parseInt(userFromAssign[0].split("~~")[0])
      );
      response.then(function (result) {
        if (result.status === "Success") {
          assignedUsersByBrief(client, subClient, brief);
          toast.success(result.message);
        }
      });
    } else {
      toast.warn("Please Select client and manager");
    }

    setOpen(false);
  };
  const submitAssigned = () => {
    if (client !== "" && manager !== "") {
      const response = assignUsers(
        client,
        subClient,
        brief,
        manager,
        assignedUsers_.map(({ id }) => parseInt(id))
      );

      setLoading(true);
      response.then(function (result) {
        setLoading(false);
        if (result.status === "Success") {
          toast.success("Users assigned to selected brief");
        }
      });
    } else {
      toast.warn("Please Select client and manager");
    }
  };
  console.log(managers);
  return (
    <div className="navView">
      <div className="datatable-container">
        <div className="assign-screens">
          <ToastContainer />

          {allowedRoll(19) !== false && (
            <div className="selectUser">
              <FormControl fullWidth>
                <InputLabel id="state-select">Select client</InputLabel>
                <Select
                  labelId="state-select"
                  value={client}
                  fullWidth
                  label="Select client"
                  onChange={(e) => {
                    setClient(e.target.value);
                    let selectedClient = clients.filter(function (el) {
                      return el.id === e.target.value;
                    });
                    setManager([]);
                    setAssignedBriefs([]);
                    selectedClientAdd(e.target.value, "");
                    setSubClient("");
                    setSubClients(selectedClient[0].subclients);
                  }}>
                  {clients.map((client) => {
                    return (
                      <MenuItem key={client.id} value={client.id}>
                        {client.company_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          )}
          {assignedBriefs_.length !== 0 && (
            <div className="selectUser">
              <FormControl fullWidth>
                <InputLabel id="state-select">Select brief</InputLabel>
                <Select
                  labelId="state-select"
                  value={brief}
                  fullWidth
                  label="Select brief"
                  onChange={(e) => {
                    setBrief(e.target.value);
                    assignedUsersByBrief(client, subClient, e.target.value);
                    setDisSubmit(true);
                  }}>
                  {assignedBriefs_.map((brief) => {
                    return (
                      <MenuItem key={brief.id} value={brief.id}>
                        {brief.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          )}
          {brief.length !== 0 && (
            <div className="selectUser">
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">Manager</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={manager}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    setManager(
                      typeof value === "string" ? value.split(",") : value
                    );
                    let myfilter = event.target.value.map((x) => {
                      let val = parseInt(x.split("~~")[1]);
                      return { id: val };
                    });
                    const filteredUsers = allUsers.filter(
                      (elem) => !myfilter.find(({ id }) => elem.id === id)
                    );
                    setUsers(filteredUsers);
                  }}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Manager" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.3 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value.slice(0, -4)} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}>
                  {managers.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name.slice(0, -4)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          {brief.length !== 0 ? (
            <div className="selectBoxs">
              <div className="notAssignedSelect">
                <InputLabel shrink htmlFor="not-assigned-clients">
                  Users Listing
                </InputLabel>
                <Select
                  fullWidth
                  className="nativeSelect"
                  multiple
                  native
                  value={userToAssign}
                  // @ts-ignore Typings are not considering `native`
                  onChange={handleChangeMultiple1}
                  label="Native"
                  inputProps={{
                    id: "not-assigned-clients",
                  }}>
                  {users.map((user) => (
                    <option
                      key={user.id}
                      value={
                        user.id + "~~" + user.firstname + " " + user.lastname
                      }>
                      {user.firstname + " " + user.lastname}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="actionBlock">
                <div className="custom-button-group-assign">
                  <Button
                    className={`'' ${
                      userToAssign.length === 0
                        ? "assign-butt"
                        : "button-custom assign-butt"
                    }`}
                    disabled={userToAssign.length === 0}
                    endIcon={<ArrowRightIcon />}
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={addBriefsToAssign}>
                    ADD
                  </Button>
                  <Button
                    className={`'' ${
                      userFromAssign.length === 0
                        ? "assign-butt"
                        : "button-custom assign-butt"
                    }`}
                    disabled={userFromAssign.length === 0}
                    startIcon={<ArrowLeftIcon />}
                    color="secondary"
                    variant="contained"
                    onClick={() => setOpen(true)}>
                    REMOVE
                  </Button>
                </div>
              </div>
              <div className="AssignedSelect">
                <InputLabel shrink htmlFor="assigned-clients">
                  Assigned Users
                </InputLabel>
                <Select
                  fullWidth
                  className="nativeSelect"
                  multiple
                  native
                  value={userFromAssign}
                  onChange={handleChangeMultiple2}
                  label="Assigned Briefs"
                  inputProps={{
                    id: "assigned-clients",
                  }}>
                  {assignedUsers_.map((user) => (
                    <option
                      key={user.id}
                      value={user.id + "~~" + user.firstname}>
                      {user.firstname + " " + user.lastname}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          ) : (
            <div>
              {client.length === 0
                ? "A client needs to be selected"
                : "Brief needs to be selected"}
            </div>
          )}
          {brief.length !== 0 && (
            <div className="submitBlock">
              <Button
                className={`'' ${
                  disSubmit ||
                  userToAssign.length === 0 ||
                  assignedUsers_.length === 0 ||
                  manager.length === 0 ||
                  loading
                    ? "assign-butt"
                    : "button-custom"
                }`}
                onClick={submitAssigned}
                endIcon={<CheckCircleIcon />}
                color="secondary"
                disabled={
                  disSubmit ||
                  userToAssign.length === 0 ||
                  assignedUsers_.length === 0 ||
                  loading ||
                  manager.length === 0
                }
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                SUBMIT{" "}
                {loading && (
                  <CircularProgress className="buttonLoading" size={16} />
                )}
              </Button>
            </div>
          )}
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Want to remove User ?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p>
                  User name{" "}
                  <b>{userFromAssign[0] && userFromAssign[0].split("~~")[1]}</b>
                </p>
                The deleted user will be removed from the user list ...
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>CANCEL</Button>
              <Button onClick={removeAssignedBriefs} autoFocus>
                DELETE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {loading && (
          <div className="loading-overlay">
            <CircularProgress className="overlay-loader" />
          </div>
        )}
      </div>
    </div>
  );
};
export default ClientAssign;
