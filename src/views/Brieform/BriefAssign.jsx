import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  usersList,
  clientUserList,
  assignClients,
} from "../../adapter/UserAdapter";
import Grid from "@material-ui/core/Grid";
import "./briefassign.css";

const BriefAssign = () => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [assignedClients_, setAssignedClients] = useState([]);
  const [clientToAssign, setClientToAssign] = useState([]);
  const [clientFromAssign, setClientFromAssign] = useState([]);

  useEffect(() => {
    const response = usersList("");
    response.then(function (result) {
      if (result.status === "Success") {
        setUsers(result.data);
      }
    });
  }, []);
  const handelSelect = (e) => {
    setUser(e.target.value);
    selectedUserAdd(e.target.value);
  };

  const selectedUserAdd = (selectedUserId) => {
    setCurrentUser(selectedUserId);
    if (selectedUserId) {
      const response = clientUserList(selectedUserId);
      response.then(function (result) {
        if (result.status === "Success") {
          setClients(result.data.client_notassigned);
          setAssignedClients(result.data.client_assigned);
        }
      });

      // setTodos([...todos, { id: 11, company_name:selectedUserId, isDone: false }]);
      console.log(assignedClients_);
    }
  };
  const handleChangeMultiple1 = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setClientToAssign(value);
  };

  function handleChangeMultiple2(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setClientFromAssign(value);
  }
  const addClientsToAssign = () => {
    if (clientToAssign[0] === undefined) {
      toast.warn("Select one Brief from list to add");
      return 0;
    }

    let transClient = clientToAssign[0].split("~~");
    var aquaticCreatures = assignedClients_.filter(function (assignedClients_) {
      return assignedClients_.id === transClient[0];
    });
    if (aquaticCreatures[0]) {
      toast.warn(
        "Client " + aquaticCreatures[0].company_name + " added already"
      );
      return 0;
    }
    setAssignedClients([
      ...assignedClients_,
      { id: transClient[0], company_name: transClient[1] },
    ]);
  };
  const removeAssignedClients = () => {
    if (clientFromAssign[0] === undefined) {
      toast.warn("Select one Brief from list to remove");
      return 0;
    }
    let transClient1 = clientFromAssign[0].split("~~");
    let update;
    var removeIndex = assignedClients_
      .map((item) => item.id)
      .indexOf(transClient1[0]);
    assignedClients_.splice(removeIndex, 1);
    update = assignedClients_;
    setAssignedClients(update);
    setClientFromAssign([]);
  };
  const submitAssigned = () => {
    if (currentUser !== "") {
      const response = assignClients(
        currentUser,
        assignedClients_.map(({ id }) => id)
      );
      response.then(function (result) {
        if (result.status === "Success") {
          toast.success("Briefs assigned to selected Clients");
        }
      });
    } else {
      toast.warn("Please Select Brief");
    }
  };
  return (
    <Grid container>
      <div className="navView">
        <ToastContainer />
        <Grid item spacing={3} xs={12} md={8}>
          <div className="selectUser">
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="state-select">Select Client</InputLabel>
              <Select
                labelId="state-select"
                value={user}
                fullWidth
                label="Country Name"
                onChange={handelSelect}>
                {users.map((users) => {
                  return (
                    <MenuItem key={users.id} value={users.id}>
                      {users.firstname + ` ` + users.lastname}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </Grid>

        <Grid item spacing={3} xs={12} md={8}>
          <div className="selectBoxs">
            <div className="notAssignedSelect">
              <InputLabel shrink htmlFor="not-assigned-clients">
                All Briefs
              </InputLabel>
              <Select
                fullWidth
                className="nativeSelect"
                multiple
                native
                value={clientToAssign}
                // @ts-ignore Typings are not considering `native`
                onChange={handleChangeMultiple1}
                label="Native"
                inputProps={{
                  id: "not-assigned-clients",
                }}>
                {clients.map((name) => (
                  <option
                    key={name.id}
                    value={name.id + "~~" + name.company_name}>
                    {name.company_name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="actionBlock">
              <ButtonGroup
                sx={{ pl: 2, mt: 3 }}
                orientation="vertical"
                disableElevation
                fullWidth
                variant="contained">
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 1,
                    color: "white",
                    backgroundColor: "green",
                    borderColor: "green",
                  }}
                  onClick={addClientsToAssign}>
                  ADD
                </Button>
                <Button
                  disabled
                  color="secondary"
                  // type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 0,
                    mb: 2,
                    color: "white",
                    backgroundColor: "red",
                    borderColor: "red",
                  }}
                  onClick={removeAssignedClients}>
                  REMOVE
                </Button>
              </ButtonGroup>
            </div>
            <div className="AssignedSelect">
              <InputLabel sx={{ ml: 4 }} shrink htmlFor="Aassigned-clients">
                Assigned Briefs
              </InputLabel>
              <Select
                sx={{ ml: 4 }}
                fullWidth
                className="nativeSelect"
                multiple
                native
                value={clientFromAssign}
                onChange={handleChangeMultiple2}
                label="Assigned Clients">
                {assignedClients_.map((name) => (
                  <option
                    key={name.id}
                    value={name.id + "~~" + name.company_name}>
                    {name.company_name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Grid>

        <Grid item spacing={3} xs={12} md={9}>
          <div className="submitBlock">
            <Button
              onClick={submitAssigned}
              endIcon={<CheckCircleIcon />}
              color="secondary"
              // style={{ backgroundColor: "rgb(55 215 48)", width: "165px" }}
              disabled={assignedClients_.length === 0}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

export default BriefAssign;
