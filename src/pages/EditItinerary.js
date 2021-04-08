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

class EditItinerary extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const token = UserSession.getToken();
    if (!token) {
      this.props.history.push({
        pathname: "/error",
        err: { message: "User session has been expired" },
      });
      return;
    }
  }
  state = {
    itinerary: {
      name: "",
      description: "",
      date: "",
      fk_tripid: "",
    },
    errors: {
      name: "",
      description: "",
      date: "",
      fk_tripid: "",
    },
    dateFields: {
      date: false,
    },
  };
  schema = {
    name: Joi.string().required().min(1).max(30).label("Title"),
    description: Joi.string().required().min(1).max(100),
    date: Joi.string().required(),
    fk_tripid: Joi.string().required().min(1),
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { itinerary, errors } = { ...this.state };
    const token = UserSession.getToken();

    itinerary.fk_tripid = this.props.location.state.trip_id.toString();
    const errMsgs = this.validateSubmission(itinerary, this.schema);
    if (errMsgs) {
      for (let errMsg of errMsgs.details) {
        errors[errMsg.path[0]] = errMsg.message;
      }
      this.setState({ itinerary: itinerary, errors: errors }, () =>
        console.log(this.state.errors)
      );
    } else {
      this.setState({ itinerary: itinerary, errors: errors });
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          token: token,
        },
      };
      axios
        .put(
          `${API_BASE_URL}/itinerary/${this.props.location.state.id}/update-itinerary`,
          itinerary,
          axiosConfig
        )
        .then((res) => {
          if (res.status === 201) {
            console.log(res.data);
            this.props.history.push("/trips");
          } else {
            const error = new Error(res.error);
            throw error;
          }
          this.setState({
            itinerary: {
              name: "",
              description: "",
              date: "",
              fk_tripid: "",
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
    const { itinerary, errors } = { ...this.state };
    const input = { [event.currentTarget.name]: event.currentTarget.value };
    const schema = {
      [event.currentTarget.name]: this.schema[event.currentTarget.name],
    };
    const errMsg = this.validateInput(input, schema);

    errors[event.currentTarget.name] = errMsg;
    this.setState({ errors: errors }, () => {});

    itinerary[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ itinerary: itinerary, errors: errors }, () => {});
  };
  validateInput = (data, schema) => {
    const { error } = Joi.validate(data, schema);
    if (error) return error.details[0].message;
    else return "";
  };

  handleDateInputs = (dateInput, value) => {
    const { dateFields } = { ...this.state };
    dateFields[dateInput] = value;
    this.setState({ dateFields: dateFields }, () => {
      console.log(this.state.dateFields);
    });
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
              Edit Itinerary
            </Typography>
            <InputField
              fullWidth={true}
              label="itinerary Title"
              variant="standard"
              margin="dense"
              size="medium"
              name="name"
              value={this.state.itinerary.name}
              onChange={this.handleChange}
            />
            {this.state.errors.name.length > 0 && (
              <Typography variant="subtitle1" color="secondary">
                {this.state.errors.name}
              </Typography>
            )}

            <InputField
              fullWidth={true}
              label="itinerary Description"
              variant="standard"
              margin="dense"
              size="medium"
              name="description"
              value={this.state.itinerary.description}
              onChange={this.handleChange}
            />
            {this.state.errors.description.length > 0 && (
              <Typography variant="subtitle1" color="secondary">
                {this.state.errors.description}
              </Typography>
            )}

            <InputField
              onFocus={() => this.handleDateInputs("date", true)}
              onBlur={() => this.handleDateInputs("date", false)}
              fullWidth={true}
              type={this.state.dateFields.date ? "date" : "text"}
              label="Date"
              variant="standard"
              margin="dense"
              size="medium"
              name="date"
              value={this.state.itinerary.date}
              onChange={this.handleChange}
            />
            {this.state.errors.date.length > 0 && (
              <Typography variant="subtitle1" color="secondary">
                Start Date is not Selected
              </Typography>
            )}

            <Button
              className={classes.button}
              variant="outlined"
              fullWidth={true}
              type="submit"
              endIcon={<SendIcon />}
            >
              Edit Itinerary
            </Button>
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(EditItinerary));
