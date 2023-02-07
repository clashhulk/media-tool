import { TextField } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';

var attemptCin = 0,
  attemptTan = 0,
  attemptPan = 0,
  attemptGst = 0;
function ThirdStep({ formData, setFormData, validation, setvalidation }) {
  /* validation states */
  const [cinrequired, setCinRequired] = React.useState("required");
  const [tanrequired, setTanRequired] = React.useState("required");
  const [panrequired, setPanRequired] = React.useState("required");
  const [gstrequired, setGstRequired] = React.useState("required");
  /*states */

  useEffect(() => {
    let validationFlag = 1;
    setCinRequired("");
    setTanRequired("");
    setPanRequired("");
    setGstRequired("");
    if (formData.cin === "") {
      attemptCin === 1 && setCinRequired("required");
      validationFlag = 0;
    } else if (
      !formData.cin.match(
        /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/
      )
    ) {
      attemptCin === 1 && setCinRequired("Invalid CIN Format");
      validationFlag = 0;
    }
    if (formData.tan === "") {
      attemptTan === 1 && setTanRequired("required");
      validationFlag = 0;
    } else if (
      !formData.tan.match(
        /(?:(?=(^[a-zA-Z]{5}\d{4}[a-zA-Z]{1}$))|(?=(^[a-zA-Z]{4}[0-9]{5}[a-zA-Z]{1}?$)))/gim
      )
    ) {
      attemptTan === 1 && setTanRequired("Invalid TAN Format");
      validationFlag = 0;
    }
    if (formData.pan === "") {
      attemptPan === 1 && setPanRequired("required");
      validationFlag = 0;
    } else if (!formData.pan.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
      attemptPan === 1 && setPanRequired("Invalid PAN Format");
      validationFlag = 0;
    }
    if (formData.gstNumber === "") {
      attemptGst === 1 && setGstRequired("required");
      validationFlag = 0;
    } else if (
      !formData.gstNumber.match(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
      )
    ) {
      attemptGst === 1 && setGstRequired("Invalid GST Number");
      validationFlag = 0;
    }
    if (validationFlag === 1) {
      setvalidation(1);
    } else {
      setvalidation(0);
    }
  }, [
    formData.cin,
    formData.tan,
    formData.pan,
    formData.gstNumber,
    attemptCin,
    attemptGst,
    attemptPan,
    attemptTan,
    setvalidation,
  ]);
  return (
    <div className="personal-info-container">
      <div className="stepForm">
        <div className="formItem">
          <TextField
            error={cinrequired}
            type="text"
            placeholder="CIN..."
            label="CIN"
            variant="outlined"
            value={formData.cin}
            onChange={(event) => {
              setFormData({ ...formData, cin: event.target.value });

              attemptCin = 1;
            }}
          />
          <span className="validation-message">{cinrequired}</span>
        </div>
        <div className="formItem">
          <TextField
            error={tanrequired}
            type="text"
            placeholder="TAN..."
            label="TAN"
            variant="outlined"
            required
            value={formData.tan}
            onChange={(event) => {
              setFormData({ ...formData, tan: event.target.value });
              attemptTan = 1;
            }}
          />
          <span className="validation-message">{tanrequired}</span>
        </div>
        <div className="formItem">
          <TextField
            error={panrequired}
            type="text"
            placeholder="PAN..."
            label="PAN"
            variant="outlined"
            value={formData.pan}
            onChange={(event) => {
              attemptPan = 1;
              setFormData({ ...formData, pan: event.target.value });
            }}
          />
          <span className="validation-message">{panrequired}</span>
        </div>
        <div className="formItem">
          <TextField
            error={gstrequired}
            id="standard-error-helper-text"
            label="Error"
            variant="outlined"
            placeholder="GST Number..."
            label="GST Number"
            value={formData.gstNumber}
            onChange={(event) => {
              attemptGst = 1;
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
