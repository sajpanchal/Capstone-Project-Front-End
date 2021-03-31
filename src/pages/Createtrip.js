import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Grid, Box } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Navbar from "../components/Navbar";
import UserSession from "../helper/UserSession";
import { Redirect } from "react-router";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../helper/base-url";
import jwtDecode from "jwt-decode";
import Joi from "joi-browser";
const styles = () => ({
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
});

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

class Createtrip extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    trip: {
      name: "",
      description: "",
      source: "",
      destination: "",
      // startDate: Date.now().toString,
      //  endDate: "2021-03-20",
      fk_organizerid: "",
    },
    errors: {
      name: "",
      description: "",
      source: "",
      destination: "",

      fk_organizerid: "",
    },
  };
  schema = {
    name: Joi.string().required().min(1).max(30).label("Title"),
    description: Joi.string().required().min(1).max(100),
    source: Joi.string().required().min(1).max(30).label("Start Location"),
    destination: Joi.string().required().min(1).max(30).label("End Location"),
    fk_organizerid: Joi.string().required().min(1),
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { trip, errors } = { ...this.state };
    const token = UserSession.getToken();
    const { id } = jwtDecode(token);
    trip.fk_organizerid = id.toString();
    const errMsgs = this.validateSubmission(trip, this.schema);
    if (errMsgs) {
      for (let errMsg of errMsgs.details) {
        errors[errMsg.path[0]] = errMsg.message;
      }
      this.setState({ trip: trip, errors: errors });
    } else {
      this.setState({ trip: trip, errors: errors });
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          token: token,
        },
      };
      axios
        .post(`${API_BASE_URL}/trip/create-trip`, trip, axiosConfig)
        .then((res) => {
          if (res.status === 201) alert(res.data.message);
          else {
            const error = new Error(res.error);
            throw error;
          }
          this.setState({
            trip: {
              name: "",
              description: "",
              source: "",
              destination: "",
              //  startDate: new Date(),
              // endDate: new Date(),
              fk_organizerid: "",
            },
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  validateSubmission = (data, schema) => {
    const { error } = Joi.validate(data, schema, {
      abortEarly: false,
    });
    if (error) return error;
    else return null;
  };
  handleChange = (event) => {
    const { trip, errors } = { ...this.state };
    const input = { [event.currentTarget.name]: event.currentTarget.value };
    const schema = {
      [event.currentTarget.name]: this.schema[event.currentTarget.name],
    };
    const errMsg = this.validateInput(input, schema);

    errors[event.currentTarget.name] = errMsg;
    this.setState({ errors: errors }, () => {});

    trip[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ trip: trip, errors: errors }, () => {});
  };
  validateInput = (data, schema) => {
    const { error } = Joi.validate(data, schema);
    if (error) return error.details[0].message;
    else return "";
  };
  render() {
    const { classes } = this.props;
    if (!UserSession.getUserID()) return <Redirect to="/"></Redirect>;
    return (
      <Box component="div" style={{ background: "white", height: "100vh" }}>
        <Navbar />
        <Grid container justify="center">
          <Box
            width="50%"
            component="form"
            className={classes.form}
            onSubmit={this.handleSubmit}
          >
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
              name="name"
              value={this.state.trip.name}
              onChange={this.handleChange}
            />
            {this.state.errors.name.length > 0 && (
              <Typography variant="subtitle1" color="secondary">
                {this.state.errors.name}
              </Typography>
            )}

            <InputField
              fullWidth={true}
              label="Trip Description"
              variant="standard"
              margin="dense"
              size="medium"
              name="description"
              value={this.state.trip.description}
              onChange={this.handleChange}
            />
            {this.state.errors.description.length > 0 && (
              <Typography variant="subtitle1" color="secondary">
                {this.state.errors.description}
              </Typography>
            )}
            <InputField
              fullWidth={true}
              label="Start Location"
              placeholder="City/Province/Country"
              variant="standard"
              margin="dense"
              size="medium"
              name="source"
              value={this.state.trip.source}
              onChange={this.handleChange}
            />
            {this.state.errors.source.length > 0 && (
              <Typography variant="subtitle1" color="secondary">
                {this.state.errors.source}
              </Typography>
            )}
            <InputField
              fullWidth={true}
              type="date"
              label="Start Date"
              placeholder="DD/MM/YYYY"
              variant="standard"
              margin="dense"
              size="medium"
              name="startDate"
              value="2021-02-02"
            />
            <br />
            <InputField
              fullWidth={true}
              label="End Location"
              placeholder="City/Province/Country"
              variant="standard"
              margin="dense"
              size="medium"
              name="destination"
              value={this.state.trip.destination}
              onChange={this.handleChange}
            />
            {this.state.errors.destination.length > 0 && (
              <Typography variant="subtitle1" color="secondary">
                {this.state.errors.destination}
              </Typography>
            )}
            <InputField
              fullWidth={true}
              type="date"
              label="End Date"
              placeholder="End Date"
              variant="standard"
              margin="dense"
              size="medium"
              value="2021-01-02"
              name="endDate"
            />
            <br />
            <Button
              className={classes.button}
              variant="outlined"
              fullWidth={true}
              type="submit"
              endIcon={<SendIcon />}
            >
              Create Trip
            </Button>
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(Createtrip));
