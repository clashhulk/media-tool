import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

var attemptFn = 0,
  attemptLn = 0,
  attemptEm = 0,
  attemptPn = 0,
  attemptAd = 0,
  attemptSt = 0;

const FourthStep = ({ formData, setFormData, validation, setvalidation }) => {
  const [fnrequired, setFnRequired] = React.useState("required");
  const [lnrequired, setLnRequired] = React.useState("required");
  const [emrequired, setEmRequired] = React.useState("required");
  const [pnrequired, setPnRequired] = React.useState("required");
  const [adrequired, setAdRequired] = React.useState("required");
  const [strequired, setStRequired] = React.useState("required");
  /* validation states */
  useEffect(() => {
    setFnRequired("");
    setLnRequired("");
    setEmRequired("");
    setPnRequired("");
    setAdRequired("");
    setStRequired("");
    let validationFlag = 1;
    if (formData.hFirstName === "") {
      validationFlag = 0;
      attemptFn === 1 && setFnRequired("required");
    } else if (!formData.hFirstName.match(/^[a-zA-Z]+$/)) {
      attemptFn === 1 && setFnRequired("Invalid First Name");
      validationFlag = 0;
    }
    if (formData.hLastName === "") {
      attemptLn === 1 && setLnRequired("required");
      validationFlag = 0;
    } else if (!formData.hLastName.match(/^[a-zA-Z]+$/)) {
      attemptLn === 1 && setLnRequired("Invalid Last Name");
      validationFlag = 0;
    }
    if (formData.hEmail === "") {
      attemptEm === 1 && setEmRequired("required");
      validationFlag = 0;
    } else if (
      !formData.hEmail.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      attemptEm === 1 && setEmRequired("Invalid Email Format");
      validationFlag = 0;
    }
    if (formData.hPhoneNumber === "") {
      attemptPn === 1 && setPnRequired("required");
      validationFlag = 0;
    } else if (!formData.hPhoneNumber.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
      attemptPn === 1 && setPnRequired("Invalid Phone Number Format");
      validationFlag = 0;
    }
    if (formData.hClientAddress === "") {
      attemptAd === 1 && setAdRequired("required");
      validationFlag = 0;
    }
    // else if (!formData.hClientAddress.match(/^[a-zA-Z0-9]{2,40}$/)) {
    //   attemptAd === 1 && setAdRequired("Invalid Address Format");
    //   validationFlag = 0;
    // }
    if (formData.hClientStatus === "") {
      attemptSt === 1 && setStRequired("required");
      validationFlag = 0;
    }

    if (validationFlag === 1) {
      setvalidation(1);
    } else {
      setvalidation(0);
    }
  }, [
    formData.hFirstName,
    formData.hLastName,
    formData.hEmail,
    formData.hPhoneNumber,
    formData.hClientAddress,
    formData.hClientStatus,
    attemptFn,
    attemptLn,
    attemptEm,
    attemptPn,
    attemptAd,
    attemptSt,
    setvalidation,
  ]);

  const [reset, setReset] = React.useState(formData.clientId !== "" ? 0 : 1);
  /* normal states */

  return (
    <div>
      <p>Add Client Head Details</p>
      {formData.clientId !== "" && (
        <div className="stepForm">
          <Button
            form="my-form"
            color="secondary"
            variant="contained"
            className="resetbutton"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            onClick={() => {
              setReset(1);
              setvalidation(0);
              setFormData({
                ...formData,
                hId: "",
                hFirstName: "",
                hLastName: "",
                hEmail: "",
                hPhoneNumber: "",
                hClientAddress: "",
                hClientStatus: 1,
              });
            }}>
            Reset and add new
          </Button>
        </div>
      )}

      <div className="stepForm">
        <div className="formItem">
          <TextField
            id="firstname"
            label="Firstname"
            variant="outlined"
            value={formData.hFirstName}
            error={fnrequired}
            disabled={reset === 0}
            onChange={(event) => {
              setFormData({ ...formData, hFirstName: event.target.value });
              attemptFn = 1;
            }}
          />
          <span className="validation-message">{fnrequired}</span>
        </div>
        <div className="formItem">
          <TextField
            id="lastname"
            label="Lastname"
            variant="outlined"
            value={formData.hLastName}
            error={lnrequired}
            disabled={reset === 0}
            onChange={(event) => {
              setFormData({ ...formData, hLastName: event.target.value });
              attemptLn = 1;
            }}
            required
          />
          <span className="validation-message">{lnrequired}</span>
        </div>

        <div className="formItem">
          <TextField
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            error={emrequired}
            value={formData.hEmail}
            disabled={reset === 0}
            onChange={(event) => {
              setFormData({ ...formData, hEmail: event.target.value });
              attemptEm = 1;
            }}
          />
          <span className="validation-message">{emrequired}</span>
        </div>

        <div className="formItem">
          <TextField
            id="phone"
            label="Phone number"
            variant="outlined"
            error={pnrequired}
            value={formData.hPhoneNumber}
            disabled={reset === 0}
            onChange={(event) => {
              setFormData({ ...formData, hPhoneNumber: event.target.value });
              attemptPn = 1;
            }}
          />
          <span className="validation-message">{pnrequired}</span>
        </div>
        <div className="formItem">
          <TextField
            id="address"
            label="User address"
            multiline
            rows={2}
            variant="outlined"
            value={formData.hClientAddress}
            disabled={reset === 0}
            error={adrequired}
            onChange={(event) => {
              setFormData({ ...formData, hClientAddress: event.target.value });
              attemptAd = 1;
            }}
          />
          <span className="validation-message">{adrequired}</span>
        </div>
        <div className="formItem">
          <FormControl fullWidth>
            <InputLabel>User Status</InputLabel>
            <Select
              value={formData.hClientStatus}
              label="User Status"
              disabled={reset === 0}
              error={strequired}
              onChange={(event) =>
                setFormData({ ...formData, hClientStatus: event.target.value })
              }>
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Deactive</MenuItem>
            </Select>
          </FormControl>
          <span className="validation-message">{strequired}</span>
        </div>
      </div>
    </div>
  );
};

export default FourthStep;
