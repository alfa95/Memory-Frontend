import React, { useState, forwardRef } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { GoogleLogin } from "react-google-login";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { signup, signin} from '../../actions/auth';

import useStyles from "./styles";
import Icon from "./icon";
import { useDispatch } from "react-redux";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const [showpassword, setShowpassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    status: "",
    message: "",
  });
  const history = useNavigate();

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClose = () => {
    setSnackBar({
      status: "",
      open: false,
      message: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleShowPassword = () => {
    setShowpassword((prev) => !prev);
  };
  const switchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  const googleFailure = () => {
    setSnackBar({
      status: "error",
      open: true,
      message: "Login Error !!! Please Try Again",
    });
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", payload: { result, token } });
      history("/");
      setSnackBar({
        status: "success",
        open: true,
        message: "Login Successful",
      });
    } catch (error) {
      setSnackBar({
        status: "error",
        open: true,
        message: "Login Error !!! Please Try Again",
      });
    }
  };

  return (
    <Container component="main" maxWdith="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showpassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <GoogleLogin
            clientId="167595983528-7a7ffsfhtpgm2l6l3ajam6hgq5idnng4.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                fullWidth
                color="primary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onFailure={googleFailure}
            onSuccess={googleSuccess}
            cookiePolicy="single_host_origin"
          />
          <Snackbar
            open={snackBar.open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snackBar.status}
              sx={{ width: "100%" }}
            >
              {snackBar.message}
            </Alert>
          </Snackbar>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already Have an Account? Sign In"
                  : "Dont Have an Account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
