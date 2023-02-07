import 'react-toastify/dist/ReactToastify.css';

import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonGroup, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { clientList } from '../adapter/ClientAdapter';
import { userAdd, userEdit } from '../adapter/UserAdapter';
import allowedRoll from '../functions/allowedRoll';

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
const Feedback = () => {
  const location = useLocation();
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  const [loading, setLoading] = useState(false);
  var userInputs = location.state
    ? {
        id: location.state.id || "",
        firstName: location.state.firstname || "",
        lastName: location.state.lastname || "",
        email: location.state.email || "",
        phoneNumber: location.state.phone || "",
        userFeedback: location.state.feedback || "",
        userType: location.state.user_type || "",
        clientId: location.state.client_id || "",
        parentId: Suser.user.id,
        feedbackType: location.state.status || "",
      }
    : {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        userFeedback: "",
        userType: "",
        parentId: Suser.user.id,
        feedbackType: "",
      };
  let [roleConvert, setRoleConvert] = useState([]);
  const [clients, setClients] = useState([]);

  const [formValidationState, setFormValidationState] = React.useState(false);
  const [fnrequired, setFnRequired] = React.useState("");
  const [lnrequired, setLnRequired] = React.useState("");
  const [emrequired, setEmRequired] = React.useState("");
  const [pnrequired, setPnRequired] = React.useState("");
  const [adrequired, setAdRequired] = React.useState("");
  const [tprequired, setTpRequired] = React.useState("");
  const [ftrequired, setFtRequired] = React.useState("");

  const [personName, setPersonName] = useState(
    location.state
      ? location.state.roles
        ? location.state.roles.map((role) => role.id)
        : []
      : []
  );
  let userRolesToChange = [];
  const renderCount = useRef(0);

  useEffect(() => {
    const response = clientList();
    response.then(function (result) {
      if (result.status === "Success") {
        setClients(result.data.clients);
      } else {
        console.warn("failed to load client list");
      }
    });

    if (allowedRoll(19, 8) !== true && Suser.client.length > 0) {
      setFormData({
        ...formData,
        userType: "External",
        clientId: Suser.client[0].id,
      });

      setPersonName([8]);
    }
  }, []);
  let navigate = useNavigate();

  const [formData, setFormData] = useState(userInputs);

  useEffect(() => {
    let formValidation = 1;
    setFnRequired("");
    setLnRequired("");
    setEmRequired("");
    setPnRequired("");
    setAdRequired("");
    setTpRequired("");
    setFtRequired("");
    if (formData.firstName === "") {
      formValidation = 0;
      renderCount.current > 0 && setFnRequired("required");
    } else if (!formData.firstName.match(/^[a-zA-Z]+$/)) {
      renderCount.current > 0 && setFnRequired("Invalid");
      formValidation = 0;
    }
    if (formData.lastName === "") {
      renderCount.current > 0 && setLnRequired("required");
      formValidation = 0;
    } else if (!formData.lastName.match(/^[a-zA-Z]+$/)) {
      renderCount.current > 0 && setLnRequired("Invalid Format");
      formValidation = 0;
    }
    if (formData.email === "") {
      renderCount.current > 0 && setEmRequired("required");
      formValidation = 0;
    } else if (
      !formData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      renderCount.current > 0 && setEmRequired("Invalid Format");
      formValidation = 0;
    }
    if (formData.phoneNumber === "") {
      renderCount.current > 0 && setPnRequired("required");
      formValidation = 0;
    } else if (!formData.phoneNumber.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
      renderCount.current > 0 && setPnRequired("Invalid Format");
      formValidation = 0;
    }
    if (formData.userFeedback === "") {
      renderCount.current > 0 && setAdRequired("required");
      formValidation = 0;
    }
    if (formData.userType === "") {
      renderCount.current > 0 && setTpRequired("required");
      formValidation = 0;
    }
    if (formData.feedbackType === "") {
      renderCount.current > 0 && setFtRequired("required");
      formValidation = 0;
    }
    if (formValidation === 1) {
      setFormValidationState(true);
    }
    renderCount.current = renderCount.current + 1;
  }, [
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.phoneNumber,
    formData.userFeedback,
    formData.userType,
    formData.feedbackType,
    formValidationState,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (location.state) {
      const responce = userEdit(formData, personName);
      setLoading(true);
      responce.then(function (result) {
        setLoading(false);
        if (result.status === "Success") {
          // toast.success(JSON.stringify(result.message)) //not optimised
          navigate("dashboard/user");
        } else {
          toast.error(JSON.stringify(result.message));
        }
      });
    } else {
      const responce = userAdd(formData, personName);
      setLoading(true);
      responce.then(function (result) {
        setLoading(false);
        if (result.status === "Success") {
          toast.success(JSON.stringify(result.message)); //not optimised
          navigate("dashboard/user");
          toast.success(result.message, 5000);
        } else {
          toast.error(JSON.stringify(result.message));
        }
      });
    }
  };

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);

    // console.log(value.map((element) => element.split("#")[1]));
    // let val = typeof value === "string" ? value.split(",") : value;
    // console.log(value);
    // setPersonName(val);
  };

  return (
    <div className="navView">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="formStyle">
          <h2 className="component-title">We appreciate your feedback!</h2>

          {/* <div className="formItem">
            <TextField
              id="firstname"
              label="Firstname"
              variant="outlined"
              error={
                fnrequired === "required" || fnrequired === "Invalid Format"
              }
              value={formData.firstName}
              onChange={(event) => {
                setFormData({ ...formData, firstName: event.target.value });
              }}
            />
            <span className="validation-message">{fnrequired}</span>
          </div>
          <div className="formItem">
            <TextField
              id="lastname"
              label="Lastname"
              variant="outlined"
              error={
                lnrequired === "required" || lnrequired === "Invalid Format"
              }
              value={formData.lastName}
              onChange={(event) => {
                setFormData({ ...formData, lastName: event.target.value });
              }}
            />
            <span className="validation-message">{lnrequired}</span>
          </div> */}
          {/* <div className="formItem">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              error={
                emrequired === "required" || emrequired === "Invalid Format"
              }
              value={formData.email}
              onChange={(event) => {
                setFormData({ ...formData, email: event.target.value });
              }}
            />
            <span className="validation-message">{emrequired}</span>
          </div>
          <div className="formItem">
            <TextField
              id="phone"
              label="Phone number"
              variant="outlined"
              error={
                pnrequired === "required" || pnrequired === "Invalid Format"
              }
              value={formData.phoneNumber}
              onChange={(event) => {
                setFormData({ ...formData, phoneNumber: event.target.value });
              }}
            />
            <span className="validation-message">{pnrequired}</span>
          </div>

          {allowedRoll(19, 8) !== false && (
            <div className="formItem">
              <FormControl fullWidth>
                <InputLabel>UserType</InputLabel>
                <Select
                  value={formData.userType}
                  label="User Type"
                  error={tprequired === "required"}
                  onChange={(event) => {
                    setFormData({ ...formData, userType: event.target.value });
                    setPersonName([]);
                  }}>
                  <MenuItem value="Internal">Internal</MenuItem>
                  <MenuItem value="External">External</MenuItem>
                </Select>
              </FormControl>
              <span className="validation-message">{tprequired}</span>
            </div>
          )} */}

          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel>Feedback Type</InputLabel>
              <Select
                value={formData.feedbackType}
                label="Feedback Type"
                error={ftrequired === "required"}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    feedbackType: event.target.value,
                  });
                }}>
                <MenuItem value="1">Comments</MenuItem>
                <MenuItem value="2">Suggestions</MenuItem>

                <MenuItem value="3">Questions</MenuItem>
              </Select>
            </FormControl>
            <span className="validation-message">{ftrequired}</span>
          </div>
          <div className="formItem"></div>
          {/* {(formData.userType === "Internal" ||
            formData.userType === "External") && (
            <div className="formItem">
              <FormControl>
                <InputLabel id="demo-multiple-checkbox-label">
                  Assign Roles
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  fullWidth
                  value={personName}
                  onChange={handleChange1}
                  input={<OutlinedInput label="Assign Roles" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}>
                  {roleConvert.map((key) => (
                    <MenuItem key={key} value={key[1].rollId}>
                      <Checkbox
                        checked={personName.indexOf(key[1].rollId) > -1}
                      />
                      <ListItemText primary={key[1].rollName} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )} */}
          <div className="formItem">
            <TextField
              id="feedback"
              label="User feedback"
              multiline
              rows={5}
              variant="outlined"
              error={adrequired === "required"}
              value={formData.userFeedback}
              onChange={(event) => {
                setFormData({ ...formData, userFeedback: event.target.value });
              }}
            />
            <span className="validation-message">{adrequired}</span>
          </div>
        </div>
        <div className="formStyle">
          <div
            className="formButtons-block"
            style={{
              justifyContent: "flex-start",
            }}>
            <ButtonGroup disableElevation variant="contained">
              <Button
                startIcon={<SaveIcon />}
                disabled={loading}
                className={loading ? "prev" : "button-custom"}
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 2 }}>
                Submit Feedback
                {loading && (
                  <CircularProgress className="buttonLoading" size={16} />
                )}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
