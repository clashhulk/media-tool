import './views.css';
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
import { toast, ToastContainer } from 'react-toastify';

import { emailVerification } from '../adapter/LoginAdapter';
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
const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const render = useRef(0);
  const [emrequired, setEmRequired] = useState("");
  const [buttonText, setButtonText] = useState("SUBMIT");
  const [valid, setValid] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let formValidation = 1;
    setEmRequired("");

    if (email === "") {
      render.current > 0 && setEmRequired("Email is required");
      formValidation = 0;
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      render.current > 0 && setEmRequired("Email is Invalid");
      formValidation = 0;
    }
    if (formValidation === 1) {
      setValid(false);
    } else {
      setValid(true);
    }
    render.current = render.current + 1;
  }, [email]);
  const sendMail = () => {
    const responce = emailVerification(email);
    setLoading(true);
    responce.then(function (result) {
      setLoading(false);
      if (result.status === "Success") {
        toast.success("Link sent to your inbox");
        setButtonText("RESEND LINK");
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
              <div className="LoginDivText">
                <p className="LoginText">Enter your registered email address</p>
              </div>
              <TextField
                margin="normal"
                fullWidth
                error={
                  emrequired === "Email is required" ||
                  emrequired === "Email is Invalid"
                }
                id="email"
                type="email"
                value={email}
                label="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                name="email"
                autoComplete="email"
                autoFocus
                size="small"
              />
              <span className="validation-message">{emrequired}</span>
              <Button
                disabled={valid || loading}
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                  sendMail();
                  // navigate("/ResetPassword");
                  // setInterval(console.log("sd"), 1000);
                }}>
                {buttonText}
              </Button>
              {/* 00:{timer} */}
              <div className="LoginBottom-container">
                <div className="Signup-div">
                  <p>A new password link will be sent to your email address.</p>
                  {/* https://mail.google.com/mail */}
                </div>
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

export default EmailVerification;
