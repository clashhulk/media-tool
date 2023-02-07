import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonGroup } from '@mui/material';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { sendPassword } from '../../adapter/UserAdapter';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="right" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://armworldwide.com/">
        ARM
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const ResetPassword = () => {
  const [crpassword, setCrPassword] = useState("");
  const [password, setPassword] = useState("");
  const render = useRef(0);
  const [psrequired, setPsRequired] = useState("");
  const [valid, setValid] = useState(false);
  const [crrequired, setCrRequired] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [cpsrequired, setCpRequired] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let formValidation = 1;
    setPsRequired("");
    setCpRequired("");
    setCrRequired("");
    if (crpassword === "") {
      render.current > 0 && setCrRequired("password is required");
      formValidation = 0;
    }
    // } else if (
    //   !crpassword.match(
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   )
    // ) {
    //   render.current > 0 && setCrRequired("password is Invalid");
    //   formValidation = 0;
    // }
    if (password === "") {
      render.current > 0 && setPsRequired("password is required");
      formValidation = 0;
    } else if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      render.current > 0 && setPsRequired("password is Invalid");
      formValidation = 0;
    }
    if (cpassword === "") {
      render.current > 0 && setCpRequired("Confirm password is required");
      formValidation = 0;
    } else if (cpassword !== password) {
      render.current > 0 && setCpRequired("Passwords do not match.");
      formValidation = 0;
    }
    if (formValidation === 1) {
      setValid(false);
    } else {
      setValid(true);
    }
    render.current = render.current + 1;
  }, [crpassword, password, cpassword]);

  const getPassword = () => {
    const responce = sendPassword(crpassword, cpassword);
    setLoading(true);
    responce.then(function (result) {
      setLoading(false);
      if (result.status === "Success") {
        toast.success(JSON.stringify(result.message));
        // navigate("/");
      } else {
        toast.error(JSON.stringify(result.message));
      }
    });
  };

  return (
    <div className="navView">
      <h2 className="component-title">Change Password</h2>
      <div className="formStyle">
        <div className="formItem">
          <TextField
            margin="normal"
            fullWidth
            error={
              crrequired === "Current password is required" ||
              crrequired === "Current password is Invalid"
            }
            id="crpassword"
            type="password"
            value={crpassword}
            label="Current Password"
            onChange={(event) => {
              setCrPassword(event.target.value);
            }}
            name="crpassword"
            autoFocus
            size="small"
          />
          <span className="validation-message">{crrequired}</span>
        </div>

        <div className="formItem"></div>
        <div className="formItem">
          <TextField
            margin="normal"
            fullWidth
            error={
              psrequired === "password is required" ||
              psrequired === "password is Invalid"
            }
            id="password"
            type="password"
            value={password}
            label="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            name="password"
            autoFocus
            size="small"
          />
          <span className="validation-message">{psrequired}</span>
        </div>

        <div className="formItem">
          <TextField
            margin="normal"
            fullWidth
            error={
              cpsrequired === "Confirm password is required" ||
              cpsrequired === "Passwords do not match."
            }
            id="Cpassword"
            type="password"
            value={cpassword}
            label="Confirm password"
            onChange={(event) => {
              setCPassword(event.target.value);
            }}
            name="Cpassword"
            size="small"
          />
          <span className="validation-message">{cpsrequired}</span>
        </div>
      </div>
      <div className="formStyle">
        <div className="formItem">
          <div className="formButtons-block">
            <ButtonGroup disableElevation fullWidth variant="contained">
              <Button
                startIcon={<SaveIcon />}
                disabled={valid || loading}
                className={valid || loading ? "prev" : "button-custom"}
                style={{ width: "250px" }}
                color="primary"
                type="submit"
                variant="contained"
                onClick={() => {
                  getPassword();
                }}>
                SUBMIT
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
