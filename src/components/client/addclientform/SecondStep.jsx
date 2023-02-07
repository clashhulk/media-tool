import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';

import { countriesList, stateList } from '../../../adapter/ClientAdapter';

var attemptCou = 0,
  attemptPin = 0,
  attemptSta = 0;

function SecondStep({ formData, setFormData, validation, setvalidation }) {
  const [pinrequired, setpinRequired] = React.useState("required");
  const [statequired, setstateRequired] = React.useState("required");
  const [courequired, setcouRequired] = React.useState("required");
  const [countries, setCountries] = useState([]);
  const [states, setState] = useState([]);

  useEffect(() => {
    const response = countriesList();
    response.then(function (result) {
      if (result.status === "Success") {
        setCountries(result.data);
      } else {
      }
    });
    const responseS = stateList(formData.country);
    responseS.then(function (resultS) {
      if (resultS.status === "Success") {
        setState(resultS.data);
      } else {
        console.warn("States Records Not found");
      }
    });
  }, [formData.country]);

  useEffect(() => {
    let validationFlag = 1;
    setcouRequired("");
    setstateRequired("");
    setpinRequired("");
    if (formData.country === "") {
      attemptCou === 1 && setcouRequired("required");
      validationFlag = 0;
    }
    if (formData.state === "") {
      attemptSta === 1 && setstateRequired("required");
      validationFlag = 0;
    }
    if (formData.pincode === "") {
      attemptPin === 1 && setpinRequired("required");
      validationFlag = 0;
    } else if (!formData.pincode.match(/^[1-9][0-9]{5}$/)) {
      attemptPin === 1 && setpinRequired("Invalid PIN Code");

      validationFlag = 0;
    }
    if (validationFlag === 1) {
      setvalidation(1);
    } else {
      setvalidation(0);
    }
  }, [formData.country, formData.pincode, formData.state, setvalidation]);

  const handleCountries = (event) => {
    setFormData({ ...formData, country: event.target.value });
    const response = stateList(event.target.value);
    response.then(function (result) {
      if (result.status === "Success") {
        setState(result.data);
      } else {
        console.warn("States Records Not found");
      }
    });
  };
  const handlestate = (event) => {
    setFormData({ ...formData, state: event.target.value });
    attemptSta = 1;
  };
  return (
    <div className="personal-info-container">
      <div className="stepForm">
        <div className="formItem">
          <TextField
            type="text"
            multiline
            rows={2}
            placeholder="First Address..."
            label="First Address"
            variant="outlined"
            value={formData.address1}
            onChange={(event) =>
              setFormData({ ...formData, address1: event.target.value })
            }
          />
        </div>
        <div className="formItem">
          <TextField
            type="text"
            multiline
            rows={2}
            placeholder="Second Address..."
            label="Second Address"
            variant="outlined"
            value={formData.address2}
            onChange={(event) =>
              setFormData({ ...formData, address2: event.target.value })
            }
          />
        </div>
        <div className="formItem">
          <FormControl fullWidth>
            <InputLabel id="country-select">Country Name</InputLabel>
            <Select
              error={courequired}
              labelId="country-select"
              value={formData.country}
              defaultValue=""
              label="Country Name"
              onChange={(e) => {
                handleCountries(e);
                attemptCou = 1;
              }}>
              {countries.map((countries) => {
                return (
                  <MenuItem key={countries.id} value={countries.id}>
                    {countries.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <span className="validation-message">{courequired}</span>
        </div>
        <div className="formItem">
          <FormControl fullWidth>
            <InputLabel id="state-select">State </InputLabel>
            <Select
              error={statequired}
              helperText={statequired}
              labelId="state-select"
              value={formData.state}
              label="State Name"
              defaultValue=""
              onChange={handlestate}>
              {states.map((states) => {
                return (
                  <MenuItem key={states.id} value={states.id}>
                    {states.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <span className="validation-message">{statequired}</span>
        </div>
        <div className="formItem">
          <TextField
            type="text"
            placeholder="City..."
            label="City"
            variant="outlined"
            value={formData.city}
            onChange={(event) =>
              setFormData({ ...formData, city: event.target.value })
            }
          />
        </div>
        <div className="formItem">
          <TextField
            error={pinrequired}
            type="text"
            placeholder="Pincode..."
            label="Pincode"
            variant="outlined"
            value={formData.pincode}
            onChange={(event) => {
              setFormData({ ...formData, pincode: event.target.value });
              attemptPin = 1;
            }}
          />

          <span className="validation-message">{pinrequired}</span>
        </div>
      </div>
    </div>
  );
}

export default SecondStep;
