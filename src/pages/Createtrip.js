import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Grid, Box } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Navbar from "../components/Navbar";
import UserSession from "../helper/UserSession";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  form: {
    top: "50%",
    left: "70%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
  },
  button: {
    marginTop: "1rem",
    color: "#8ed176",
    borderColor: "#8ed176",
  },
}));

const InputField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#8ed176",
    },
    "& label": {
      color: "#8ed176",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#8ed176",
      },
      "&:hover fieldSet": {
        borderColor: "#8ed176",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8ed176",
      },
    },
  },
})(TextField);

const Createtrip = () => {
  const classes = useStyles();
  if (!UserSession.getUserID()) return <Redirect to="/"></Redirect>;
  return (
    <Box component="div" style={{ background: "white", height: "100vh" }}>
      <Navbar />
      <Grid container justify="center">
        <Box width="50%" component="form" className={classes.form}>
          <Typography
            variant="h2"
            style={{
              color: "#8ed176",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Create Trip
          </Typography>
          <InputField
            fullWidth={true}
            label="Trip Title"
            variant="standard"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "white" } }}
          />
          <br />
          <InputField
            fullWidth={true}
            label="Trip Description"
            variant="standard"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "white" } }}
          />
          <br />
          <InputField
            fullWidth={true}
            label="Place to center a Map"
            placeholder="City/Province/Country"
            variant="standard"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "white" } }}
          />
          <br />
          <Button
            className={classes.button}
            variant="outlined"
            fullWidth={true}
            endIcon={<SendIcon />}
          >
            Create Trip
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default Createtrip;
