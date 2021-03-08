import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
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
    margin: " auto",
  },
  avatarStyle: {
    background: "#8ed184",
  },
  btnStyle: {
    margin: "15px 0",
  },
});

const FormLogin = () => {
  const classes = useStyles();

  return (
    <>
      <Grid>
        <Paper className={classes.root}>
          <Grid align="center">
            <Avatar className={classes.avatarStyle}>
              <AddCircleOutlineIcon />
            </Avatar>
            <h2>SignUp</h2>
            <Typography variant="caption">
              Please fill this form to create account
            </Typography>
          </Grid>
          <form>
            <TextField
              label="Full Name"
              placeholder="Enter name"
              fullWidth
              required
            />
            <TextField
              label="Email"
              placeholder="Enter Email"
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
            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              fullWidth
              required
            />
            {/* <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember Me"
            /> */}
            <Button
              className={classes.btnStyle}
              style={{ background: "#8ed184" }}
              type="submit"
              variant="contained"
              fullWidth
            >
              SignUp
            </Button>
            {/* <Typography>
              <Link href="#">Forgot Password</Link>
            </Typography>
            <Typography>
              New Here ? <Link href="#">Sign Up Now</Link>
            </Typography> */}
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default FormLogin;
