import React from "react";
import {
  Input,
  InputLabel,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Card,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  card: {
    background: "#a2eba2",
    width: "30%",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
  },
  form: {
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  cardTitle: {
    textAlign: "center",
    backgroundColor: "#3d6e3d",
    color: "#a2eba2",
  },
  editButton: {
    float: "inline-end",
  },
  subtitles: {
    marginTop: "15px",
  },
  editButton: {
    float: "inline-end",
  },
  primaryButtons: {
    marginTop: "10px",
    width: "200px",
  },
});
class Profile extends React.Component {
  state = {
    inputs: {
      firstname: true,
      lastname: true,
      username: true,
      email: true,
      newpassword: true,
    },
  };
  handleInputs = (name) => {
    const inputs = { ...this.state.inputs };
    inputs[name] = false;
    this.setState({ inputs: inputs });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Typography className={classes.cardTitle} variant="h4">
          Your Profile
        </Typography>
        <Box className={classes.form} component="form">
          <Button
            className={classes.editButton}
            onClick={() => this.handleInputs("firstname")}
            size="small"
          >
            Edit
          </Button>
          <br></br>

          <InputLabel className={classes.subtitles}>First Name:</InputLabel>
          <Input
            name="firstname"
            placeholder="Enter First Name"
            disabled={this.state.inputs.firstname}
          ></Input>
          <br></br>
          <Button
            className={classes.editButton}
            size="small"
            onClick={() => this.handleInputs("lastname")}
          >
            Edit
          </Button>
          <br></br>

          <InputLabel className={classes.subtitles}>Last Name:</InputLabel>
          <Input
            name="lastname"
            placeholder="Enter Last Name"
            disabled={this.state.inputs.lastname}
          ></Input>
          <br></br>
          <br></br>
          <InputLabel className={classes.subtitles}>Username:</InputLabel>
          <Input
            name="username"
            placeholder="Enter Username"
            disabled={this.state.inputs.username}
          ></Input>
          <br></br>
          <br></br>
          <InputLabel className={classes.subtitles}>Email:</InputLabel>
          <Input
            name="email"
            placeholder="Enter Email"
            disabled={this.state.inputs.email}
          ></Input>
          <br></br>
          <Button
            className={classes.editButton}
            size="small"
            onClick={() => this.handleInputs("newpassword")}
          >
            Edit
          </Button>
          <br></br>
          <InputLabel className={classes.subtitles}>Password:</InputLabel>
          <Input
            name="password"
            placeholder="Enter Password"
            disabled="true"
          ></Input>
          <br></br>
          <Box
            visibility={this.state.inputs.newpassword ? "hidden" : "visible"}
          >
            <Input
              name="newpassword"
              placeholder="Enter New Password"
              disabled={this.state.inputs.newpassword}
            ></Input>
            <br></br>
            <Input
              name="re-enterpassword"
              placeholder="Re-enter New Password"
              disabled={this.state.inputs.newpassword}
            ></Input>
          </Box>
          <br></br>
          <br></br>
          <Button
            className={classes.primaryButtons}
            type="submit"
            value="submit"
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
          <br></br>

          <Button
            className={classes.primaryButtons}
            value="delete account"
            variant="contained"
            color="secondary"
          >
            Delete Account
          </Button>
        </Box>
      </Card>
    );
  }
}
export default withStyles(styles)(Profile);
