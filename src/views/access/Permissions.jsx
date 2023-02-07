import './access.css';
import 'react-toastify/dist/ReactToastify.css';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { modulesWithPermissions, userPermissions, userRoles } from '../../adapter/AccessAdapter.jsx';

const Permissions = () => {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([
    { module_name: "User", permissions: [1, 2, 3, 5] },
    { module_name: "User Brief Aassignment", permissions: [1, 2, 3] },
    { module_name: "Brief Master", permissions: [1, 2, 3] },
    { module_name: "Brief Assignment", permissions: [1, 2, 3] },
    { module_name: "Brief Data", permissions: [1, 2, 3] },
    { module_name: "Mediaplan", permissions: [1, 2, 3] },
    { module_name: "client", permissions: [1, 2, 3] },
    { module_name: "Client Group", permissions: [1, 2, 3] },
  ]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  var navigate = useNavigate();

  // useEffect(() => {
  //   console.log("in use Effect =>", modules);
  // }, [modules]);
  useEffect(() => {
    setLoading(true);
    const info = userRoles();
    info.then(function (result) {
      setLoading(false);
      if (result.status === "Success") {
        setRoles(result.data);
      } else {
        toast.error(result.message);
      }
    });

    const from_access_adapter = userPermissions();
    from_access_adapter.then(function (result) {
      setLoading(false);
      if (result.status === "Success") {
        setRoles(result.data);
      } else {
        toast.error(result.message);
      }
    });
  }, []);
  const getPermissions = () => {
    // setLoading(true);
    const info = modulesWithPermissions();
    info.then(function (result) {
      // setLoading(false);
      if (result.status === "Success") {
        console.log(result);
      } else {
        toast.error(result.message);
      }
    });
  };
  // const updateModulePermissions = (rowIndex, permissionIndex, value) => {

  // };
  return (
    <div className="navView">
      <ToastContainer />
      <FormControl style={{ width: "50%" }}>
        <InputLabel id="state-select">Select role</InputLabel>
        <Select
          labelId="state-select"
          value={role}
          label="Select role"
          onChange={(e) => {
            setRole(e.target.value);
          }}>
          {roles.map((role) => {
            return (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div className="accordions-container">
        <Accordion
          className="accordion-style"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {modules[0].module_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      // updateModulePermissions(0, 10, 0);

                      let temp = modules[0].permissions;
                      temp[0] !== 10 ? (temp[0] = 10) : (temp[0] = 0);
                      let update = modules.map((item, index) => {
                        if (index === 0) {
                          return { ...item, permissions: temp };
                        }
                        return item;
                      });
                      console.log(modules);
                      setModules(update);
                    }}
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="add"
              />
              {modules[0].permissions[0]}
              <FormControlLabel
                control={
                  <Checkbox
                    value={modules[0].permissions[1]}
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="add"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={modules[0].permissions[2]}
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="edit"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={modules[0].permissions[3]}
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="delete"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accordion-style"
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {modules[1].module_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {" "}
            <div className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="view"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="add"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="edit"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="delete"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accordion-style"
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {modules[2].module_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="view"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="add"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="edit"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="delete"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accordion-style"
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {modules[3].module_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="view"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="add"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="edit"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="delete"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accordion-style"
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {modules[4].module_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="view"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="add"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="edit"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="delete"
              />
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="accordion-style"
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {modules[5].module_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="view"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="add"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="edit"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="delete"
              />
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="accordion-style"
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7bh-content"
            id="panel7bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {modules[6].module_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="view"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="add"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="edit"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="delete"
              />
            </div>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion
          className="accordion-style"
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8bh-content"
            id="panel8bh-header">
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {modules[7].module_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="view"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="add"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="edit"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<CheckCircleIcon sx={{ color: "#4caf50" }} />}
                    icon={<CheckCircleOutlineIcon />}
                  />
                }
                label="delete"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <ButtonGroup disableElevation variant="contained">
          <Button
            startIcon={<SaveIcon />}
            disabled={loading}
            className={loading ? "prev" : "button-custom"}
            type="submit"
            variant="contained">
            Save
            {loading && (
              <CircularProgress className="buttonLoading" size={16} />
            )}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Permissions;
