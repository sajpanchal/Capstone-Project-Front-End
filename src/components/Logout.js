import React, { Component } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import API_BASE_URL from "../helper/base-url";
import { Route, withRouter } from "react-router-dom";
import UserSession from "../helper/UserSession";
import jwtDecode from "jwt-decode";
class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    const token = UserSession.getToken();

    if (token) {
      const { exp } = jwtDecode(token);
      console.log(exp, parseInt(Date.now() / 1000));
      if (parseInt(Date.now() / 1000) > exp) {
        console.log(exp, parseInt(Date.now() / 1000));
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
      }
    }
    let { isLoggedIn } = { ...this.state };
    isLoggedIn = UserSession.getUserID() ? true : false;
    this.setState({ isLoggedIn: isLoggedIn });
  }

  handleLogout = () => {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: UserSession.getToken(),
      },
    };
    axios
      .get(
        `${API_BASE_URL}/auth/logout`,

        axiosConfig
      )
      .then((res) => {
        if (res.status === 200) {
          let { isLoggedIn } = { ...this.state };

          sessionStorage.removeItem("token");
          sessionStorage.removeItem("username");
          isLoggedIn = UserSession.getUserID() ? true : false;
          this.setState({ isLoggedIn: isLoggedIn });
          this.props.history.push("/home");
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
      <>
        {this.state.isLoggedIn && (
          <Button
            onClick={this.handleLogout}
            variant="contained"
            style={{ background: "#8ed184" }}
          >
            Logout
          </Button>
        )}
      </>
    );
  }
}
export default withRouter(Logout);
