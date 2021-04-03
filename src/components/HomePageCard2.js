import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Box, Button } from "@material-ui/core";
import Login from "../components/Login";
import Register from "./Register";
import {
  AccountCircle,
  Backspace,
  PersonAdd,
  PermIdentity,
} from "@material-ui/icons";

const style = () => ({
  root: {
    maxWidth: 900,
    width: 600,
    top: "50%",
    left: "70%",
    borderRadius: 10,
    position: "absolute",
    transform: "translate(-50%,-50%)",
    backgroundSize: "300%",
    boxShadow: "0 3px 5px 2px rgba(255,105,135,.3)",
    transition: "0.6s",
    backgroundImage: "linear-gradient(45deg, #8ed176 , #228c12,white)",
    "&:hover": {
      backgroundPostion: "right",
    },
  },
  content: {
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  cardTitle: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "black",
    color: "white",
  },
  cardText: {
    fontWeight: "Bold",
  },
});
class HomePageCard2 extends Component {
  state = {
    signupform: false,
  };
  handleSignupVisibility = () => {
    let { signupform } = { ...this.state };
    signupform = !signupform;
    this.setState({ signupform: signupform });
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <Card className={classes.root}>
          {!this.state.signupform && (
            <>
              <Box component="div" className={classes.cardTitle}>
                <AccountCircle fontSize="large"></AccountCircle>
                <Typography variant="h4" className={classes.cardText}>
                  Login
                </Typography>
              </Box>
            </>
          )}
          {this.state.signupform && (
            <Box component="div" className={classes.cardTitle}>
              <AccountCircle fontSize="large"></AccountCircle>
              <Typography variant="h4" className={classes.cardText}>
                Register
              </Typography>
            </Box>
          )}
          <CardContent className={classes.content}>
            {!this.state.signupform && (
              <>
                <Login></Login>
                <Typography>New User? Click below!</Typography>
                <br></br>
                <Button
                  onClick={this.handleSignupVisibility}
                  variant="contained"
                  fullWidth={true}
                  startIcon={<PersonAdd></PersonAdd>}
                >
                  signup
                </Button>
              </>
            )}
            {this.state.signupform && (
              <>
                <Register />
                <br></br>
                <Button
                  onClick={this.handleSignupVisibility}
                  variant="contained"
                  fullWidth={true}
                  color="secondary"
                  startIcon={<Backspace></Backspace>}
                >
                  Back to Login
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </>
    );
  }
}
export default withStyles(style)(HomePageCard2);
