import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

function FristStep({ formData, setFormData, validation, setvalidation }) {
  /* validation states */
  const [cmrequired, setcmRequired] = React.useState("required");
  const [cbrequired, setcbRequired] = React.useState("required");
  const [ctrequired, setCtRequired] = React.useState("required");
  const [cerequired, setCeRequired] = React.useState("required");
  const [ccrequired, setCcRequired] = React.useState("required");
  const [emval, setEval] = useState();
  const [poval, setPoval] = useState();
  /* ref */
  const renderCount = useRef(0);
  useEffect(() => {
    let validationFlag = 1;
    setcmRequired("");
    setcbRequired("");
    setCtRequired("");
    setCeRequired("");
    setCcRequired("");
    setEval("");
    setPoval("");
    if (formData.agencyName === "") {
      renderCount.current > 0 && setcmRequired("required");
      validationFlag = 0;
    }

    if (formData.agencyBrandname === "") {
      renderCount.current > 0 && setcbRequired("required");
      validationFlag = 0;
    }
    if (formData.agencyType === "") {
      renderCount.current > 0 && setCtRequired("required");
      validationFlag = 0;
    }
    if (formData.agencyEstimatemode === "") {
      renderCount.current > 0 && setCeRequired("required");
      validationFlag = 0;
    }

    if (formData.agencyCategory === "") {
      renderCount.current > 0 && setCcRequired("required");
      validationFlag = 0;
    }
    if (formData.agencyEmail === "") {
      renderCount.current > 0 && setEval("required");
      validationFlag = 0;
    } else if (
      !formData.agencyEmail.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      renderCount.current > 0 && setEval("Invalid Email Format");
      validationFlag = 0;
    }
    if (formData.agencyPhone === "") {
      renderCount.current > 0 && setPoval("required");
      validationFlag = 0;
    } else if (!formData.agencyPhone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
      renderCount.current > 0 && setPoval("Invalid Phone Number");
      validationFlag = 0;
    }
    if (validationFlag === 1) {
      setvalidation(1);
    } else {
      setvalidation(0);
    }
    renderCount.current = renderCount.current + 1;
  }, [
    formData.agencyName,
    formData.agencyBrandname,
    formData.agencyType,
    formData.agencyEstimatemode,
    formData.agencyCategory,
    formData.agencyEmail,
    formData.agencyPhone,
    formData.status,
    setvalidation,
  ]);

  return (
    <div className="sign-up-container">
      <div className="stepForm">
        <div className="formItem">
          <TextField
            type="text"
            m={2}
            placeholder="Agency Name..."
            label="Agency Name"
            variant="outlined"
            value={formData.agencyName}
            error={cmrequired === "required"}
            onChange={(event) => {
              setFormData({ ...formData, agencyName: event.target.value });
            }}
          />
          <span className="validation-message">{cmrequired}</span>
        </div>

        <div className="formItem">
          <TextField
            type="text"
            placeholder="Agency Brandname..."
            label="Agency Brandname"
            variant="outlined"
            value={formData.agencyBrandname}
            error={cbrequired === "required"}
            onChange={(event) => {
              setFormData({
                ...formData,
                agencyBrandname: event.target.value,
              });
            }}
          />
          <span className="validation-message">{cbrequired}</span>
        </div>
        <div className="formItem">
          <FormControl fullWidth>
            <InputLabel id="agency-type-select">Agency Type</InputLabel>
            <Select
              error={ctrequired === "required"}
              labelId="agency-type-select"
              value={formData.agencyType}
              defaultValue=""
              label="Agency Type"
              onChange={(event) =>
                setFormData({ ...formData, agencyType: event.target.value })
              }>
              <MenuItem value="Retainer">Retainer</MenuItem>
              <MenuItem value="Retainer_Commission">
                Retainer + Commission
              </MenuItem>
              <MenuItem value="Commission">Commission</MenuItem>
              <MenuItem value="Project">Project</MenuItem>
            </Select>
          </FormControl>

          <span className="validation-message">{ctrequired}</span>
        </div>
        <div className="formItem">
          <FormControl fullWidth>
            <InputLabel>Agency Estimate mode</InputLabel>
            <Select
              error={cerequired === "required"}
              value={formData.agencyEstimatemode}
              defaultValue=""
              label="Agency Estimate mode"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  agencyEstimatemode: event.target.value,
                })
              }>
              <MenuItem value="1">Monthly</MenuItem>
              <MenuItem value="3">Quarterly</MenuItem>
              <MenuItem value="12">Yearly</MenuItem>
            </Select>
          </FormControl>

          <span className="validation-message">{cerequired}</span>
        </div>
        <div className="formItem">
          <FormControl fullWidth>
            <InputLabel>Agency Category</InputLabel>
            <Select
              error={ccrequired === "required"}
              value={formData.agencyCategory}
              defaultValue=""
              label="Agency Estimate mode"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  agencyCategory: event.target.value,
                })
              }>
              <MenuItem value="pvtltdagency">Pvt. LTD. Agency</MenuItem>
              <MenuItem value="ltdagency">LTD. Agency</MenuItem>
              <MenuItem value="partnership">Partnership</MenuItem>
              <MenuItem value="proprietorship">Proprietorship</MenuItem>
              <MenuItem value="individual">Individual</MenuItem>
            </Select>
          </FormControl>

          <span className="validation-message">{ccrequired}</span>
        </div>
        <div className="formItem">
          <TextField
            type="email"
            error={emval === "required" || emval === "Invalid Email Format"}
            placeholder="Email Id"
            label="Email Id"
            variant="outlined"
            value={formData.agencyEmail}
            onChange={(event) => {
              setFormData({ ...formData, agencyEmail: event.target.value });
            }}
          />

          <span className="validation-message">{emval}</span>
        </div>
        <div className="formItem">
          <TextField
            type="text"
            error={poval === "required" || poval === "Invalid Phone Number"}
            placeholder="Phone no"
            label="Phone no"
            variant="outlined"
            value={formData.agencyPhone}
            onChange={(event) => {
              setFormData({ ...formData, agencyPhone: event.target.value });
            }}
          />

          <span className="validation-message">{poval}</span>
        </div>
        <div className="formItem">
          <TextField
            type="text"
            placeholder="Client Code"
            label="Client Code"
            variant="outlined"
            value={formData.clientCode}
            onChange={(event) =>
              setFormData({ ...formData, clientCode: event.target.value })
            }
          />
        </div>
        <div className="formItem">
          <TextField
            type="text"
            placeholder="Website Address"
            label="Website Address"
            variant="outlined"
            value={formData.websiteAddress}
            onChange={(event) =>
              setFormData({ ...formData, websiteAddress: event.target.value })
            }
          />
        </div>
        <div className="formItem">
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={formData.status}
              onChange={(event) => {
                setFormData({ ...formData, status: event.target.value });
              }}>
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="2">Disable</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="formItem">
          <TextField
            type="text"
            multiline
            rows={2}
            placeholder="Description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={(event) =>
              setFormData({ ...formData, description: event.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default FristStep;
