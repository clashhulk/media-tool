import 'react-toastify/dist/ReactToastify.css';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { assignBriefs, briefMsList, getAssignedBriefs, removeAssignedBrief } from '../../adapter/BriefmsAdapter';
import { clientList } from '../../adapter/ClientAdapter';

const BriefAssign = () => {
  const [client, setClient] = useState("");
  const [briefs, setBriefs] = useState([]);
  const [clients, setClients] = useState([]);
  const [subClient, setSubClient] = useState("");
  const [subClients, setSubClients] = useState([]);
  const [assignedBriefs_, setAssignedBriefs] = useState([]);
  const [briefToAssign, setBriefToAssign] = useState([]);
  const [briefFromAssign, setBriefFromAssign] = useState([]);
  const [open, setOpen] = React.useState(false);

  var navigate = useNavigate();

  const [disSubmit, setDisSubmit] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const response1 = clientList();
    response1.then(function (result) {
      if (result.status === "Success") {
        setClients(result.data.clients);
      }
    });
    const bmlresponse = briefMsList();
    bmlresponse.then(function (result) {
      if (result.status === "Success") {
        setBriefs(result.data);
      } else {
      }
    });
  }, []);

  const selectedClientAdd = (selectedClientId, selectedSubClientId) => {
    const response = getAssignedBriefs(selectedClientId, selectedSubClientId);
    console.log(selectedClientId);
    response.then(function (result) {
      if (result.status === "Success") {
        setAssignedBriefs(result.data);
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
    setBriefToAssign(value);

    setBriefFromAssign([]);
  };

  function handleChangeMultiple2(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setBriefFromAssign(value);

    setBriefToAssign([]);
  }
  const addBriefsToAssign = () => {
    if (briefToAssign[0] === undefined) {
      toast.warn("Select one brief from list to add");
      return 0;
    }

    let muiltiTransBrief = [];
    briefToAssign.forEach((element) => {
      let transBrief = element.split("~~");
      var extracFilter = assignedBriefs_.filter(function (assignedBriefs_) {
        return assignedBriefs_.id === parseInt(transBrief[0]);
      });
      if (extracFilter[0]) {
        toast.warn("Brief " + extracFilter[0].name + " added already");
        return 0;
      }

      setDisSubmit(false);
      muiltiTransBrief.push(element.split("~~"));
    });

    muiltiTransBrief = muiltiTransBrief.map((transBrief) => {
      return {
        id: parseInt(transBrief[0]),
        name: transBrief[1],
      };
    });
    setAssignedBriefs([...assignedBriefs_, ...muiltiTransBrief]);
  };
  const removeAssignedBriefs = () => {
    if (briefFromAssign[0] === undefined) {
      toast.warn("Select one brief from list to remove");
      return 0;
    } else {
      let transBrief1 = briefFromAssign[0].split("~~");
      // var removeIndex = assignedBriefs_
      //   .map((item) => item.id)
      //   .indexOf(transBrief1[0]);
      // assignedBriefs_.splice(removeIndex, 1);
      if (client !== "") {
        const response = removeAssignedBrief(client, transBrief1[0]);
        response.then(function (result) {
          if (result.status === "Success") {
            selectedClientAdd(client, subClient);
            toast.success(result.message);
          }
        });
      } else {
        toast.warn("Please Select client");
      }
    }
    setOpen(false);
  };
  const submitAssigned = () => {
    if (client !== "") {
      setLoading(true);
      const response = assignBriefs(
        client,
        subClient,
        assignedBriefs_.map(({ id }) => id)
      );
      response.then(function (result) {
        setLoading(false);
        if (result.status === "Success") {
          navigate("/dashboard/briefsummary");
          // toast.success(result.message);
          toast.success("Briefs assigned to selected client");
        }
      });
    } else {
      toast.warn("Please Select client");
    }
  };
  return (
    <div className="navView">
      <div className="datatable-container">
        <div className="assign-screens">
          <ToastContainer />
          <div className="selectUser">
            <FormControl fullWidth>
              <InputLabel id="state-select">Select client</InputLabel>
              <Select
                labelId="state-select"
                value={client}
                fullWidth
                label="Country Name"
                onChange={(e) => {
                  setClient(e.target.value);
                  let selectedClient = clients.filter(function (el) {
                    return el.id === e.target.value;
                  });
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
          {/* {subClients.length !== 0 && (
					<div className="selectUser">
						<FormControl fullWidth>
							<InputLabel id="state-select">Select subclient</InputLabel>
							<Select
								labelId="state-select"
								value={subClient}
								fullWidth
								label="Country Name"
								onChange={(e) => {
									selectedClientAdd('', e.target.value);
									setSubClient(e.target.value);
								}}
							>
								{subClients.map((subClient) => {
									return (
										<MenuItem key={subClient.id} value={subClient.id}>
											{subClient.company_name}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</div>
				)} */}
          <div className="selectBoxs">
            <div className="notAssignedSelect">
              <InputLabel shrink htmlFor="not-assigned-clients">
                Brief Listing
              </InputLabel>
              <Select
                fullWidth
                className="nativeSelect"
                multiple
                native
                value={briefToAssign}
                // @ts-ignore Typings are not considering `native`
                onChange={handleChangeMultiple1}
                label="Native"
                inputProps={{
                  id: "not-assigned-clients",
                }}>
                {briefs.map((brief) => (
                  <option key={brief.id} value={brief.id + "~~" + brief.name}>
                    {brief.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="actionBlock">
              <div className="custom-button-group-assign">
                <Button
                  className={`'' ${
                    briefToAssign[0] === undefined || client.length === 0
                      ? "assign-butt"
                      : "button-custom assign-butt"
                  }`}
                  style={{ backgroundColor: "#000!important" }}
                  disabled={
                    briefToAssign[0] === undefined || client.length === 0
                  }
                  endIcon={<ArrowRightIcon />}
                  color="primary"
                  type="submit"
                  variant="contained"
                  onClick={addBriefsToAssign}>
                  ADD
                </Button>
                <Button
                  className={`'' ${
                    briefFromAssign[0] === undefined || client.length === 0
                      ? "assign-butt"
                      : "button-custom assign-butt"
                  }`}
                  disabled={
                    briefFromAssign[0] === undefined || client.length === 0
                  }
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
                Assigned Briefs
              </InputLabel>
              <Select
                fullWidth
                className="nativeSelect"
                multiple
                native
                value={briefFromAssign}
                onChange={handleChangeMultiple2}
                label="Assigned Briefs"
                inputProps={{
                  id: "assigned-clients",
                }}>
                {assignedBriefs_.map((brief) => (
                  <option key={brief.id} value={brief.id + "~~" + brief.name}>
                    {brief.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="submitBlock">
            <Button
              className={`'' ${
                disSubmit || loading || client.length === 0
                  ? "assign-butt"
                  : "button-custom"
              }`}
              onClick={submitAssigned}
              endIcon={<CheckCircleIcon />}
              color="secondary"
              disabled={disSubmit || loading || client.length === 0}
              variant="contained">
              SUBMIT{" "}
              {loading && (
                <CircularProgress className="buttonLoading" size={16} />
              )}
            </Button>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Want to remove Brief ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>
                Brief{" "}
                <b>{briefFromAssign[0] && briefFromAssign[0].split("~~")[1]}</b>
              </p>
              The deleted brief will be removed from the brief list.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>CANCEL</Button>
            <Button onClick={removeAssignedBriefs} autoFocus>
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
        {loading && (
          <div className="loading-overlay">
            <CircularProgress className="overlay-loader" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BriefAssign;
