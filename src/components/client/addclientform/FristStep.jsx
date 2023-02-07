import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { clientList } from '../../../adapter/ClientAdapter';
import { clientMsList } from '../../../adapter/ClientmsAdapter.jsx';
import { clientUserList } from '../../../adapter/UserAdapter';

var attemptPr = 0,
  attemptCg = 0,
  attemptCm = 0,
  attemptCb = 0,
  attemptCt = 0,
  attemptCe = 0,
  attemptCc = 0,
  attemptEmail = 0,
  attemptPo = 0,
  attemptCid = 0;

function FristStep({ formData, setFormData, validation, setvalidation }) {
  /* validation states */
  const [prrequired, setprRequired] = React.useState("required");
  const [cgrequired, setcgRequired] = React.useState("required");
  const [cidrequired, setcidRequired] = React.useState("required");
  const [cmrequired, setcmRequired] = React.useState("required");
  const [cbrequired, setcbRequired] = React.useState("required");
  const [ctrequired, setCtRequired] = React.useState("required");
  const [cerequired, setCeRequired] = React.useState("required");
  const [ccrequired, setCcRequired] = React.useState("required");
  const [emval, setEval] = useState();
  const [poval, setPoval] = useState();
  /*states */
  const [clientMasters, setClientMasters] = useState([]);
  const [mainClients, setmainClients] = useState([]);
  useEffect(() => {
    const info = clientMsList();
    info.then(function (result) {
      if (result.status === "Success") {
        setClientMasters(result.data);
        // console.log(result.data)
      } else {
        console.warn("failed to load Data");
      }
    });
    const response = clientList();
    response.then(function (result) {
      if (result.status === "Success") {
        setmainClients(result.data.clients);
      } else {
        console.warn("failed to load Data");
      }
    });
  }, []);

  useEffect(() => {
    let validationFlag = 1;
    setprRequired("");
    setcgRequired("");
    setcmRequired("");
    setcbRequired("");
    setCtRequired("");
    setCeRequired("");
    setCcRequired("");
    setEval("");
    setPoval("");
    if (formData.parent === "") {
      attemptPr === 1 && setprRequired("required");
      validationFlag = 0;
    }
    if (formData.client_master_id === "") {
      attemptCg === 1 && setcgRequired("required");
      validationFlag = 0;
    }
    if (formData.companyName === "") {
      attemptCm === 1 && setcmRequired("required");
      validationFlag = 0;
    }

    if (formData.companyBrandname === "") {
      attemptCb === 1 && setcbRequired("required");
      validationFlag = 0;
    }

    if (formData.companyType === "") {
      attemptCt === 1 && setCtRequired("required");
      validationFlag = 0;
    }
    if (formData.companyEstimatemode === "") {
      attemptCe === 1 && setCeRequired("required");
      validationFlag = 0;
    }

    if (formData.companyCategory === "") {
      attemptCc === 1 && setCcRequired("required");
      validationFlag = 0;
    }
    if (formData.companyEmail === "") {
      attemptEmail === 1 && setEval("required");
      validationFlag = 0;
    } else if (
      !formData.companyEmail.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      attemptEmail === 1 && setEval("Invalid Email Format");
      validationFlag = 0;
    }
    if (formData.companyPhone === "") {
      attemptPo === 1 && setPoval("required");
      validationFlag = 0;
    } else if (!formData.companyPhone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
      attemptPo === 1 && setPoval("Invalid Phone Number");
      validationFlag = 0;
    }
    if (validationFlag === 1) {
      setvalidation(1);
    } else {
      setvalidation(0);
    }
  }, [
    formData.parent,
    formData.client_master_id,
    formData.companyName,
    formData.companyBrandname,
    formData.companyEmail,
    formData.companyPhone,
    formData.status,
    cidrequired,
    cmrequired,
    cbrequired,
    emval,
    setvalidation,
  ]);

  return (
    <div className="sign-up-container">
      <div className="stepForm">
        <div className="formItem">
          <FormControl fullWidth>
            <InputLabel>Is it parent company?</InputLabel>
            <Select
              label="Is it parent company?"
              value={formData.parent}
              error={prrequired === "required"}
              defaultValue=""
              onChange={(event) => {
                setFormData({
                  ...formData,
                  parent: event.target.value,
                  clientId: "",
                  companyName: "",
                  companyBrandname: "",
                  companyType: "",
                  companyEstimatemode: "",
                  companyCategory: "",
                  companyEmail: "",
                  companyPhone: "",
                  clientCode: "",
                  websiteAddress: "",
                  description: "",
                  status: "1",
                  address1: "",
                  address2: "",
                  country: "",
                  state: "0",
                  city: "",
                  pincode: "",
                  cin: "",
                  tan: "",
                  pan: "",
                  gstNumber: "",
                  hClientStatus: "1",
                  hEmail: "",
                  attemptEmail,
                });
                attemptPr = 1;
              }}>
              <MenuItem value="yes">Yes</MenuItem>
              {/* <MenuItem value="no">No</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        {formData.parent === "yes" && (
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="select-client-group">
                Select client group
              </InputLabel>
              <Select
                labelId="client-client-group"
                value={formData.client_master_id}
                defaultValue=""
                label="select-client-group"
                error={cgrequired === "required"}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    client_master_id: event.target.value,
                  });
                  // attemptCid = 1;
                }}>
                {clientMasters.map((clientMaster) => {
                  return (
                    <MenuItem key={clientMaster.id} value={clientMaster.id}>
                      {clientMaster.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <span className="validation-message">{cgrequired}</span>
          </div>
        )}
        {formData.parent === "no" && (
          <div className="formItem">
            <FormControl fullWidth>
              <InputLabel id="clients">Clients</InputLabel>
              <Select
                labelId="clients"
                value={formData.clientId}
                defaultValue=""
                label="clients"
                // error={attemptCid === 0}
                // helperText={cidrequired}
                onChange={(event) => {
                  let newArray = mainClients.filter(function (el) {
                    return el.id === event.target.value;
                  });
                  let response3 = clientUserList(event.target.value);
                  response3.then(function (result) {
                    if (result.status === "Success") {
                      setFormData({
                        ...formData,
                        clientId: event.target.value,
                        cin: newArray[0].cin,
                        pan: newArray[0].pan,
                        tan: newArray[0].tan,
                        gstNumber: newArray[0].gst_number,
                        hId: result.data.user_assigned[0].id,
                        hFirstName: result.data.user_assigned[0].firstname,
                        hLastName: result.data.user_assigned[0].lastname,
                        hEmail: result.data.user_assigned[0].email,
                        hPhoneNumber: result.data.user_assigned[0].phone,
                        hClientAddress: result.data.user_assigned[0].address,
                        hClientStatus: result.data.user_assigned[0].status,
                      });
                    } else {
                      console.warn("failed to load Data");
                    }
                  });
                  setFormData({
                    ...formData,
                    clientId: event.target.value,
                  });
                  // attemptCid = 1;attemptEmail
                }}>
                {mainClients.map((mainClient) => {
                  return (
                    <MenuItem key={mainClient.id} value={mainClient.id}>
                      {mainClient.company_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        )}

        <div className="formItem">
          <TextField
            type="text"
            m={2}
            placeholder="Company Name..."
            label="Company Name"
            variant="outlined"
            value={formData.companyName}
            error={cmrequired === "required"}
            onChange={(event) => {
              setFormData({ ...formData, companyName: event.target.value });
              attemptCm = 1;
            }}
          />{" "}
          <span className="validation-message">{cmrequired}</span>
        </div>

        <div className="formItem">
          <TextField
            type="text"
            placeholder="Company Brandname..."
            label="Company Brandname"
            variant="outlined"
            value={formData.companyBrandname}
            error={cbrequired === "required"}
            // helperText={}
            onChange={(event) => {
              setFormData({
                ...formData,
                companyBrandname: event.target.value,
              });
              attemptCb = 1;
            }}
          />
          <span className="validation-message">{cbrequired}</span>
        </div>
        <div className="formItem">
          <FormControl fullWidth>
            <InputLabel id="company-type-select">Company Type</InputLabel>
            <Select
              error={ctrequired === "required"}
              labelId="company-type-select"
              value={formData.companyType}
              defaultValue=""
              label="Company Type"
              onChange={(event) =>
                setFormData({ ...formData, companyType: event.target.value })
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
            <InputLabel>Company Estimate mode</InputLabel>
            <Select
              error={cerequired === "required"}
              value={formData.companyEstimatemode}
              defaultValue=""
              label="Company Estimate mode"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  companyEstimatemode: event.target.value,
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
            <InputLabel>Company Category</InputLabel>
            <Select
              error={ccrequired === "required"}
              value={formData.companyCategory}
              defaultValue=""
              label="Company Estimate mode"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  companyCategory: event.target.value,
                })
              }>
              <MenuItem value="pvtltdcompany">Pvt. LTD. Company</MenuItem>
              <MenuItem value="ltdcompany">LTD. Company</MenuItem>
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
            error={emval === "required"}
            placeholder="Email Id"
            label="Email Id"
            variant="outlined"
            value={formData.companyEmail}
            onChange={(event) => {
              setFormData({ ...formData, companyEmail: event.target.value });
              attemptEmail = 1;
            }}
          />

          <span className="validation-message">{emval}</span>
        </div>
        <div className="formItem">
          <TextField
            type="text"
            error={poval === "required"}
            placeholder="Phone no"
            label="Phone no"
            variant="outlined"
            value={formData.companyPhone}
            onChange={(event) => {
              setFormData({ ...formData, companyPhone: event.target.value });
              attemptPo = 1;
            }}
          />

          <span className="validation-message">{poval}</span>
        </div>
        {/* <div className="formItem">
          <TextField
            error={attemptPo === 0}
            helperText="bap"
            type="text"
            placeholder="Phone No"
            label="Phone No"
            variant="outlined"
            value={formData.companyPhone}
            onChange={(event) => {
              setFormData({ ...formData, companyPhone: event.target.value });
              attemptPo = 1;
            }}
          />
        </div> */}
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
