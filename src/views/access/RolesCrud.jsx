import 'react-toastify/dist/ReactToastify.css';

import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonGroup, CircularProgress, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { roleAdd, roleEdit } from '../../adapter/AccessAdapter.jsx';

const RolesCrud = () => {
  const state = useLocation().state;
  const [loading, setLoading] = useState(false);
  var navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { rname: state ? state[0].name : "" } });
  const onSubmit = (data) => {
    if (state) {
      const info = roleEdit(state[0].id, data.rname);
      setLoading(true);
      info.then(function (result) {
        setLoading(false);
        if (result.status === "Success") {
          navigate("/dashboard/roles");
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
    } else {
      const info = roleAdd(data.rname);
      setLoading(true);
      info.then(function (result) {
        setLoading(false);
        if (result.status === "Success") {
          navigate("/dashboard/roles");
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
            <h2 className="component-title">Edit Role</h2>
          ) : (
            <h2 className="component-title">Add Role</h2>
          )}
          <div className="formItem">
            <FormControl fullWidth>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Role Name"
                variant="outlined"
                type="text"
                name="rname"
                {...register("rname", {
                  required: {
                    value: true,
                    message: "Role name is required!",
                  },
                  pattern: {
                    value: /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                    message: "Please enter text character only",
                  },
                })}
                error={Boolean(errors.rname)}
                helperText={errors.rname?.message}
              />
            </FormControl>
          </div>
        </div>

        <div className="formStyle">
          <div className="formItem">
            <div className="">
              <ButtonGroup disableElevation variant="contained">
                <Button
                  startIcon={<SaveIcon />}
                  disabled={loading}
                  className={loading ? "prev" : "button-custom"}
                  type="submit"
                  variant="contained">
                  {state ? "Update" : "Save"}
                  {loading && (
                    <CircularProgress className="buttonLoading" size={16} />
                  )}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RolesCrud;
