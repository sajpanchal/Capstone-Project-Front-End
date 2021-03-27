import React, { Component } from "react";
import axios from "axios";
import API_BASE_URL from "../helper/base-url";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { Route, withRouter } from "react-router-dom";
import Joi from "joi-browser";
import { LockOpen } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  form: {
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "100%",
    margin: "auto",
  },
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "", password: "" },
      error: { username: "", password: "" },
    };
  }
  schema = {
    username: Joi.string().required().min(1).max(30),
    password: Joi.string().required().min(5).max(20),
  };
  handleInputChange = (event) => {
    const { user, error } = { ...this.state };
    const input = { [event.currentTarget.name]: event.currentTarget.value };
    const schema = {
      [event.currentTarget.name]: this.schema[event.currentTarget.name],
    };
    const errorMessage = this.validateInput(input, schema);
    error[event.currentTarget.name] = errorMessage;
    user[event.currentTarget.name] = event.currentTarget.value;
    this.setState({
      user: user,
      error: error,
    });
  };
  validateInput = (data, schema) => {
    const { error } = Joi.validate(data, schema);

    if (error) return error.details[0].message;
    else return "";
  };
  onSubmit = (event) => {
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
              sessionStorage.setItem("username", this.state.user.username);
              this.props.history.push("/trips");
            }
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.error(err);
          this.props.history.push("/error");
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
  render() {
    const { classes } = this.props;
    return (
      <Box component="form" onSubmit={this.onSubmit} className={classes.form}>
        <TextField
          type="username"
          name="username"
          fullWidth={true}
          placeholder="Enter username"
          label="Username"
          value={this.state.user.username}
          onChange={this.handleInputChange}
        />
        <br></br>
        {this.state.error.username.length > 0 && (
          <Typography variant="subtitle1" color="secondary">
            {this.state.error.username}
          </Typography>
        )}
        <br></br>
        <TextField
          type="password"
          name="password"
          fullWidth={true}
          placeholder="Enter password"
          label="Password"
          value={this.state.user.password}
          onChange={this.handleInputChange}
        />
        <br></br>
        {this.state.error.password.length > 0 && (
          <Typography variant="subtitle1" color="secondary">
            {this.state.error.password}
          </Typography>
        )}
        <br></br>
        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          color="primary"
          startIcon={<LockOpen></LockOpen>}
        >
          Login
        </Button>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
