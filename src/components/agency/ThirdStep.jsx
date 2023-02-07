import { TextField } from '@mui/material';
import React from 'react';
import { useEffect, useRef } from 'react';

function ThirdStep({ formData, setFormData, validation, setvalidation }) {
  /* validation states */
  const [cinrequired, setCinRequired] = React.useState("required");
  const [tanrequired, setTanRequired] = React.useState("required");
  const [panrequired, setPanRequired] = React.useState("required");
  const [gstrequired, setGstRequired] = React.useState("required");

  /* ref */
  const renderCount = useRef(0);

  useEffect(() => {
    let validationFlag = 1;
    setCinRequired("");
    setTanRequired("");
    setPanRequired("");
    setGstRequired("");
    if (formData.cin === "") {
      renderCount.current > 0 && setCinRequired("required");
      validationFlag = 0;
    } else if (
      !formData.cin.match(
        /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/
      )
    ) {
      renderCount.current > 0 && setCinRequired("Invalid CIN Format");
      validationFlag = 0;
    }
    if (formData.tan === "") {
      renderCount.current > 0 && setTanRequired("required");
      validationFlag = 0;
    } else if (
      !formData.tan.match(
        /(?:(?=(^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$))|(?=(^[a-zA-Z]{4}[0-9]{5}[a-zA-Z]{1}?$)))/gim
      )
    ) {
      renderCount.current > 0 && setTanRequired("Invalid TAN Format");
      validationFlag = 0;
    }
    if (formData.pan === "") {
      renderCount.current > 0 && setPanRequired("required");
      validationFlag = 0;
    } else if (!formData.pan.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
      renderCount.current > 0 && setPanRequired("Invalid PAN Format");
      validationFlag = 0;
    }
    if (formData.gstNumber === "") {
      renderCount.current > 0 && setGstRequired("required");
      validationFlag = 0;
    } else if (
      !formData.gstNumber.match(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
      )
    ) {
      renderCount.current > 0 && setGstRequired("Invalid GST Number");
      validationFlag = 0;
    }
    if (validationFlag === 1) {
      setvalidation(1);
    } else {
      setvalidation(0);
    }

    renderCount.current = renderCount.current + 1;
  }, [
    formData.cin,
    formData.tan,
    formData.pan,
    formData.gstNumber,
    setvalidation,
  ]);
  return (
    <div className="personal-info-container">
      <div className="stepForm">
        <div className="formItem">
          <TextField
            error={
              cinrequired === "required" || cinrequired === "Invalid CIN Format"
            }
            type="text"
            placeholder="CIN..."
            label="CIN"
            variant="outlined"
            value={formData.cin}
            onChange={(event) => {
              setFormData({ ...formData, cin: event.target.value });
            }}
          />
          <span className="validation-message">{cinrequired}</span>
        </div>
        <div className="formItem">
          <TextField
            error={
              tanrequired === "required" || tanrequired === "Invalid TAN Format"
            }
            type="text"
            placeholder="TAN..."
            label="TAN"
            variant="outlined"
            required
            value={formData.tan}
            onChange={(event) => {
              setFormData({ ...formData, tan: event.target.value });
            }}
          />
          <span className="validation-message">{tanrequired}</span>
        </div>
        <div className="formItem">
          <TextField
            error={
              panrequired === "required" || panrequired === "Invalid PAN Format"
            }
            type="text"
            placeholder="PAN..."
            label="PAN"
            variant="outlined"
            value={formData.pan}
            onChange={(event) => {
              setFormData({ ...formData, pan: event.target.value });
            }}
          />
          <span className="validation-message">{panrequired}</span>
        </div>
        <div className="formItem">
          <TextField
            error={
              gstrequired === "required" || gstrequired === "Invalid GST Number"
            }
            id="standard-error-helper-text"
            label="Error"
            variant="outlined"
            placeholder="GST Number..."
            label="GST Number"
            value={formData.gstNumber}
            onChange={(event) => {
              setFormData({ ...formData, gstNumber: event.target.value });
            }}
          />
          <span className="validation-message">{gstrequired}</span>
        </div>
      </div>
    </div>
  );
}

export default ThirdStep;
