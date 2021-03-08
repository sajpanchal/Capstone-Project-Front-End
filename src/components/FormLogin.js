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
          <TextField
            label="Username"
            placeholder="Enter name"
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
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
          >
            Login
          </Button>
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
