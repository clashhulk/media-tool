import 'react-toastify/dist/ReactToastify.css';

import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonGroup, CircularProgress, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { briefMsAdd, briefMsEdit } from '../../adapter/BriefmsAdapter.jsx';

export default function BriefMasterCrud() {
  const state = useLocation().state;
  const [loading, setLoading] = useState(false);
  var navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { cmname: state ? state[0].name : "" } });
  const onSubmit = (data) => {
    if (state) {
      const info = briefMsEdit(state[0].id, data.cmname);
      setLoading(true);
      info.then(function (result) {
        setLoading(false);
        if (result.status === "Success") {
          navigate("/dashboard/briefmaster");
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
    } else {
      const info = briefMsAdd(data.cmname);
      setLoading(true);
      info.then(function (result) {
        setLoading(false);
        if (result.status === "Success") {
          navigate("/dashboard/briefmaster");
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
    }
  };
  return (
    <div className="navView">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formStyle">
          {state ? (
            <h2 className="component-title">Edit Brief Master</h2>
          ) : (
            <h2 className="component-title">Add Brief Master</h2>
          )}
          <div className="formItem">
            <FormControl fullWidth>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Brief Master"
                variant="outlined"
                type="text"
                name="cmname"
                {...register("cmname", {
                  required: {
                    value: true,
                    message: "Any Brief Master Name is required!",
                  },
                  pattern: {
                    value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                    message: "Please enter text character only",
                  },
                })}
                error={Boolean(errors.cmname)}
                helperText={errors.cmname?.message}
              />
            </FormControl>
          </div>
        </div>

        <div className="formStyle">
          <div className="formItem">
            <ButtonGroup disableElevation fullWidth variant="contained">
              <Button
                startIcon={<SaveIcon />}
                disabled={loading}
                className={loading ? "prev" : "button-custom"}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                {state ? "Update" : "Save"}
                {loading && (
                  <CircularProgress className="buttonLoading" size={16} />
                )}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </form>
    </div>
  );
}
