import './views.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { sendPassword } from '../adapter/LoginAdapter';
import logo from '../assets/brimas-logo.webp';
import LoginLeftBar from './LoginLeftbar';

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
const theme = createTheme({ palette: { primary: { main: "#e84268" } } });
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const render = useRef(0);
  const [psrequired, setPsRequired] = useState("");
  const [valid, setValid] = useState(false);
  const [cpassword, setCPassword] = useState("");
  const [cpsrequired, setCpRequired] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let formValidation = 1;
    setPsRequired("");
    setCpRequired("");

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
  }, [password, cpassword]);

  var url = new URL(window.location.href);
  var token = url.searchParams.get("token");

  const getPassword = () => {
    const responce = sendPassword(cpassword, token);
    setLoading(true);
    responce.then(function (result) {
      setLoading(false);
      if (result.status === "Success") {
        toast.success(JSON.stringify(result.message));
        navigate("/");
      } else {
        toast.error(JSON.stringify(result.message));
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <div className="flex-container">
        <div className="login-leftImg">
          <LoginLeftBar />
        </div>
        <div className="login-rightform">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}>
              <div className="logoDiv">
                <img src={logo} alt="" className="logoImg" />
              </div>
              <div className="LoginDivText"></div>

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
              <Button
                disabled={valid}
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                  getPassword();
                }}>
                SUBMIT
              </Button>
              <div className="LoginBottom-container">
                <div className="Signup-div"></div>
                <div className="copyMedia">
                  <Copyright sx={{ pt: 8, pb: 4 }} />
                </div>
              </div>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ResetPassword;
