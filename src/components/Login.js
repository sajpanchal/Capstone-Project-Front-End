import React, { Component } from "react";
import axios from "axios";
import API_BASE_URL from "../helper/base-url";
import { Route, withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
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
          username: this.state.username,
          password: this.state.password,
        },
        axiosConfig
      )
      .then((res) => {
        if (res.status === 200) {
          const { message, token } = res.data;
          if (token) {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("username", this.state.username);
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
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login Below!</h1>
        <input
          type="username"
          name="username"
          placeholder="Enter username"
          value={this.state.username}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default withRouter(Login);