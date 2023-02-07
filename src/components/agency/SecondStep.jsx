import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useEffect, useRef, useState } from 'react';

import { countriesList, stateList } from '../../adapter/ClientAdapter';

function SecondStep({ formData, setFormData, validation, setvalidation }) {
  const [pinrequired, setpinRequired] = React.useState("required");
  const [statequired, setstateRequired] = React.useState("required");
  const [courequired, setcouRequired] = React.useState("required");
  const [countries, setCountries] = useState([]);
  const [states, setState] = useState([]);

  /* ref */
  const renderCount = useRef(0);
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
      renderCount.current > 0 && setcouRequired("required");
      validationFlag = 0;
    }
    if (formData.state === "") {
      renderCount.current > 0 && setstateRequired("required");
      validationFlag = 0;
    }
    if (formData.pincode === "") {
      renderCount.current > 0 && setpinRequired("required");
      validationFlag = 0;
    } else if (!formData.pincode.match(/^[1-9][0-9]{5}$/)) {
      renderCount.current > 0 && setpinRequired("Invalid PIN Code");
      validationFlag = 0;
    }
    if (validationFlag === 1) {
      setvalidation(1);
    } else {
      setvalidation(0);
    }

    renderCount.current = renderCount.current + 1;
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
              error={courequired === "required"}
              labelId="country-select"
              value={formData.country}
              defaultValue=""
              label="Country Name"
              onChange={(e) => {
                handleCountries(e);
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
              error={statequired === "required"}
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
            error={pinrequired === "required"}
            type="text"
            placeholder="Pincode..."
            label="Pincode"
            variant="outlined"
            value={formData.pincode}
            onChange={(event) => {
              setFormData({ ...formData, pincode: event.target.value });
            }}
          />

          <span className="validation-message">{pinrequired}</span>
        </div>
      </div>
    </div>
  );
}

export default SecondStep;
