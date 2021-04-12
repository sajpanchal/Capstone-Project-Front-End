import React, { Component } from "react";
import axios from "axios";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import API_BASE_URL from "../helper/base-url";
import { Route, withRouter } from "react-router-dom";
import Joi, { validate } from "joi-browser";
import { PersonAdd } from "@material-ui/icons";
class Register extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    user: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    error: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };
  schema = {
    username: Joi.string().required().min(1).max(30),
    firstName: Joi.string().required().min(1).max(30),
    lastName: Joi.string().required().min(1).max(30),
    email: Joi.string().required().email({ minDomainAtoms: 2 }).min(6).max(60),
    password: Joi.string().required().min(5).max(20),
    confirmPassword: Joi.string().required().min(5).max(20),
  };
  handleChange = (event) => {
    const schema = {
      [event.currentTarget.name]: this.schema[event.currentTarget.name],
    };
    const inputValue = {
      [event.currentTarget.name]: event.currentTarget.value,
    };
    let { user, error } = { ...this.state };
    const errorMessage = this.validateInput(inputValue, schema);

    error[event.currentTarget.name] = errorMessage;
    user[event.currentTarget.name] = event.currentTarget.value;
    if (errorMessage.length === 0 && user.password && user.confirmPassword) {
      error = this.matchPassword();
    }
    this.setState({ user: user, error: error });
  };
  validateInput = (data, schema) => {
    const { error } = Joi.validate(data, schema);

    if (error) return error.details[0].message;
    else return "";
  };
  matchPassword = () => {
    const { error, user } = { ...this.state };
    if (user.password === user.confirmPassword) {
      error.password = "";
      error.confirmPassword = "";
      return error;
    } else {
      error.password = "Passwords are not matching.";
      error.confirmPassword = "passwords are not matching.";
      return error;
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { user, error } = { ...this.state };

    const errorMessages = this.validateSubmission(user, this.schema);
    if (errorMessages) {
      for (let err of errorMessages.details) {
        error[err.path[0]] = err.message;
        console.log(error);
      }
      this.setState({ error: error });
    } else {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      };
      axios
        .post(
          `${API_BASE_URL}/auth/signup`,
          {
            username: this.state.user.username,
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            email: this.state.user.email,
            password: this.state.user.password,
          },
          axiosConfig
        )
        .then((res) => {
          if (res.status == 200) {
            axios
              .post(
                `${API_BASE_URL}/auth/login`,
                {
                  username: this.state.user.username,
                  password: this.state.user.password,
                },
                axiosConfig
              )
              .then((res) => {
                if (res.status === 200) {
                  const { message, token } = res.data;
                  if (token) {
                    sessionStorage.setItem("token", token);
                    sessionStorage.setItem(
                      "username",
                      this.state.user.username
                    );
                    this.props.history.push("/trips");
                    window.location.reload();
                  }
                } else {
                  const error = new Error(res.error);
                  throw error;
                }
              })
              .catch((err) => {
                console.error(err);
                this.props.history.push({
                  pathname: "/error",
                  err: { message: err.message },
                });
              });
          } else {
          }
        })
        .catch((err) => {
          console.error(err);
          this.props.history.push({
            pathname: "/error",
            err: { message: err.message },
          });
        });
      console.log(this.state.user);
    }
  };
  validateSubmission = (data, schema) => {
    const { error } = Joi.validate(data, schema, {
      abortEarly: false,
    });

    if (error) return error;
    else return null;
  };
  render() {
    return (
      <>
        <Box component="form" onSubmit={this.handleSubmit}>
          <TextField
            name="username"
            type="text"
            fullWidth={true}
            value={this.state.user.username}
            onChange={this.handleChange}
            placeholder="Enter username"
            label="Username"
          ></TextField>
          <br></br>
          {this.state.error.username.length > 0 && (
            <Typography variant="subtitle1" color="secondary">
              {this.state.error.username}
            </Typography>
          )}
          <br></br>
          <TextField
            name="firstName"
            type="text"
            fullWidth={true}
            value={this.state.user.firstName}
            onChange={this.handleChange}
            placeholder="Enter First Name"
            label="First Name"
          ></TextField>
          <br></br>
          {this.state.error.firstName.length > 0 && (
            <Typography variant="subtitle1" color="secondary">
              {this.state.error.firstName}
            </Typography>
          )}
          <br></br>
          <TextField
            name="lastName"
            type="text"
            fullWidth={true}
            value={this.state.user.lastName}
            onChange={this.handleChange}
            placeholder="Enter Last Name"
            label="Last Name"
          ></TextField>
          <br></br>
          {this.state.error.lastName.length > 0 && (
            <Typography variant="subtitle1" color="secondary">
              {this.state.error.lastName}
            </Typography>
          )}
          <br></br>
          <TextField
            name="email"
            type="email"
            fullWidth={true}
            value={this.state.user.email}
            onChange={this.handleChange}
            placeholder="Enter Email"
            label="Email"
          ></TextField>
          <br></br>
          {this.state.error.email.length > 0 && (
            <Typography variant="subtitle1" color="secondary">
              {this.state.error.email}
            </Typography>
          )}
          <br></br>
          <TextField
            name="password"
            type="password"
            fullWidth={true}
            value={this.state.user.password}
            onChange={this.handleChange}
            placeholder="Enter Password"
            label="Password"
          ></TextField>
          <br></br>
          {this.state.error.password.length > 0 && (
            <Typography variant="subtitle1" color="secondary">
              {this.state.error.password}
            </Typography>
          )}
          <br></br>
          <TextField
            name="confirmPassword"
            type="password"
            fullWidth={true}
            value={this.state.user.confirmPassword}
            onChange={this.handleChange}
            placeholder="Confirm Password"
            label="Confirm Password"
          ></TextField>
          <br></br>
          {this.state.error.confirmPassword.length > 0 && (
            <Typography variant="subtitle1" color="secondary">
              {this.state.error.confirmPassword}
            </Typography>
          )}
          <br></br>
          <Button
            type="submit"
            variant="contained"
            fullWidth={true}
            startIcon={<PersonAdd></PersonAdd>}
          >
            Register
          </Button>
        </Box>
      </>
    );
  }
}
export default withRouter(Register);
