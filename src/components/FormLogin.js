import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
const useStyles = makeStyles({
  root: {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "auto",
  },
  avatarStyle: {
    background: "#8ed184",
  },
  btnStyle: {
    margin: "8px 0",
  },
});

const FormLogin = ({ handleChange }) => {
  const classes = useStyles();

  return (
    <>
      <Grid>
        <Paper className={classes.root}>
          <Grid align="center">
            <Avatar className={classes.avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Login</h2>
          </Grid>
          <form className="login-form">
            <div className="login-text">SIGN IN</div>

            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value=""
              onChange=""
            />
            <br />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value=""
              onChange=""
            />

            <br />
            <br />
            <button className="form-btn">LOGIN</button>
          </form>
          {/* <TextField
            type="text"
            label="Username"
            placeholder="Enter Username"
            fullWidth
            required
            value={loginForm.username}
            onChange={setLoginForm}
          />
          <TextField
            type="password"
            label="Password"
            placeholder="Enter Password"
            fullWidth
            required
            value={loginForm.password}
            onChange={setLoginForm}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember Me"
          />
          <Button
            className={classes.btnStyle}
            style={{ background: "#8ed184" }}
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button> */}
          <Typography>
            <Link href="#">Forgot Password</Link>
          </Typography>
          <Typography>
            New Here ?{" "}
            <Link
              href="#"
              onClick={() => {
                handleChange("event", 1);
              }}
            >
              Sign Up Now
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default FormLogin;
