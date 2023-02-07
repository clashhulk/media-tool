import './user.css';
import 'react-toastify/dist/ReactToastify.css';

import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { userEdit } from '../../adapter/UserAdapter';
import { userInputs } from '../../variables/Variables';

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
export default function Useredit() {
  console.log(userInputs.roles);
  var userRoles = Object.entries(userInputs.roles);
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state);
  const [personName, setPersonName] = useState(
    formData.roles.map(({ id }) => id)
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    formData.roles = personName;
    const responce = userEdit(formData, personName);
    responce.then(function (result) {
      console.log(result);
      if (result.status === "Success") {
        // toast.success(JSON.stringify(result.message)) //not optimised
        navigate("dashboard/user", { state: result.message });
      } else {
        toast.error(JSON.stringify(result.message));
      }
    });
  };

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div className="navView">
      {/* <div className="component-titleContainer">
               
                <Link style={{ textDecoration: 'none' }} to={`/dashboard/user/crud`}>
                    <Button
                        startIcon={<PersonAdd />}
                        color="secondary"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ textDecoration: 'none' }}
                    >
                        Create
                    </Button>
                </Link>
            </div> */}
      <div className="userContainer">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="formStyle">
            <h2 className="component-title">Edit User</h2>
            <div className="formItem">
              <TextField
                id="firstname"
                label="Firstname"
                variant="outlined"
                value={formData.firstname}
                onChange={(event) =>
                  setFormData({ ...formData, firstname: event.target.value })
                }
                required
              />
            </div>
            <div className="formItem">
              <TextField
                id="lastname"
                label="Lastname"
                variant="outlined"
                value={formData.lastname}
                onChange={(event) =>
                  setFormData({ ...formData, lastname: event.target.value })
                }
                required
              />
            </div>
            <div className="formItem">
              <TextField
                id="email"
                type="email"
                label="Email"
                variant="outlined"
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                required
              />
            </div>
            <div className="formItem">
              <TextField
                id="password"
                type="password"
                variant="outlined"
                value="undefined"
                // onChange={(event) =>
                //     setFormData({ ...formData, password: event.target.value })
                // }
                disabled
              />
            </div>
            <div className="formItem">
              <TextField
                id="phone"
                type="number"
                label="Phone number"
                variant="outlined"
                value={formData.phone}
                onChange={(event) =>
                  setFormData({ ...formData, phone: event.target.value })
                }
                required
              />
            </div>
            <div className="formItem">
              <FormControl fullWidth>
                <InputLabel>User Type</InputLabel>
                <Select
                  value={formData.user_type}
                  label="User Type"
                  onChange={(event) =>
                    setFormData({ ...formData, user_type: event.target.value })
                  }
                  required>
                  <MenuItem value="Internal">Internal</MenuItem>
                  <MenuItem value="External">External</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="formItem">
              <TextField
                id="address"
                label="User address"
                multiline
                rows={2}
                variant="outlined"
                value={formData.address}
                onChange={(event) =>
                  setFormData({ ...formData, address: event.target.value })
                }
                required
              />
            </div>
            <div className="formItem">
              <FormControl fullWidth>
                <InputLabel>User Status</InputLabel>
                <Select
                  value={formData.status}
                  label="User Status"
                  onChange={(event) =>
                    setFormData({ ...formData, status: event.target.value })
                  }
                  required>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Deactive</MenuItem>
                </Select>
              </FormControl>
            </div>
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
                  {userRoles.map((key) => (
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
          </div>
          <div className="formStyle">
            <div className="formButtons-block">
              <ButtonGroup disableElevation fullWidth variant="contained">
                <Button
                  startIcon={<SaveIcon />}
                  color="primary"
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}>
                  Save
                </Button>
                {/* <Button
                                        endIcon={<DeleteIcon />}
                                        color="secondary"
                                        // type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => {
                                            navigate("dashboard/user");
                                        }}
                                    >
                                        Discard
                                    </Button> */}
              </ButtonGroup>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
