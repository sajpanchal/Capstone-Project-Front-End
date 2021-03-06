import React from "react";
import {
  Input,
  InputLabel,
  Button,
  Typography,
  Box,
  Card,
  IconButton,
  TextField,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Joi from "joi-browser";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import jwtDecode from "jwt-decode";
import UserSession from "./../helper/UserSession";
import axios from "axios";
import { Redirect } from "react-router";
import API_BASE_URL from "../helper/base-url";
const styles = () => ({
  form: {
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "50%",
    margin: "auto",
  },
  cardTitle: {
    textAlign: "center",
    color: "#8ed176",
    textAlign: "center",
    fontStyle: "italic",
  },
  editButton: {
    textAlign: "right",
    padding: "5px 5px 5px 5px",
  },
  saveButton: {
    marginTop: "1rem",
    color: "#8ed176",
    borderColor: "#8ed176",
  },
  deleteButton: {
    marginTop: "1rem",
    color: "#fc0000",
    borderColor: "#fc0000",
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
class Profile extends React.Component {
  state = {
    data: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
    passwordData: {
      newPassword: "",
      reEnterPassword: "",
    },
    errors: {},
    input: {
      firstname: true,
      lastname: true,
      username: true,
      email: true,
      password: true,
    },
  };
  schema = {
    firstname: Joi.string().required().min(2).max(30),
    lastname: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    username: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(2).max(30),
  };
  passwordSchema = {
    newPassword: Joi.string().required().min(6).max(30),
    reEnterPassword: Joi.string().required().min(6).max(30),
  };
  componentDidMount() {
    /*
    data.firstname = "John";
    data.lastname = "Smith";
    data.username = "jsmith";
    data.email = "jsmith@gmail.com";
    data.password = "123456";
    this.setState({ data: data });*/
    const data = { ...this.state.data };
    const token = UserSession.getToken();
    if (!token) {
      this.props.history.push({
        pathname: "/error",
        err: {
          message: "User Login session has been expired. Please login again.",
        },
      });
      return;
    }
    const { id } = token ? jwtDecode(token) : "";
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: UserSession.getToken(),
      },
    };
    if (!id) return;
    axios
      .get(`${API_BASE_URL}/user/${id}`, axiosConfig)
      .then((res) => {
        if (res.status === 201 || res.status === 202 || res.status === 200) {
          const { username, email, password, firstname, lastName } = res.data;
          data.username = username;
          data.email = email;
          data.password = password;
          data.firstname = firstname;
          data.lastname = lastName;
          this.setState({ data: data });
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
  handleSubmit = (event) => {
    event.preventDefault();

    let { data, input, errors, passwordData } = { ...this.state };
    const { error } = Joi.validate(data, this.schema);
    const passwordError =
      input.password === false
        ? Joi.validate(passwordData, this.passwordSchema)
        : null;
    // if new password is entered

    console.log("input.password :", input.password);
    if (error) {
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      this.setState({ errors: errors });
      console.log("error:", errors);
    } else if (passwordError && passwordError.error) {
      for (let item of passwordError.error.details) {
        errors[item.path[0]] = item.message;
      }
      console.log(passwordError.error);
      this.setState({ errors: errors });
      console.log(errors);
    } else if (errors.newPassword || errors.reEnterPassword) {
      console.log("password error:", passwordError);
      this.setState({ errors: errors });
    } else {
      errors = {};
      data.password =
        input.password === false ? passwordData.reEnterPassword : data.password;
      passwordData["newPassword"] = "";
      passwordData["reEnterPassword"] = "";
      input = {
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        password: true,
      };
      this.setState({
        data: data,
        input: input,
        errors: errors,
        passwordData: passwordData,
      });
      console.log("data:", this.state.data);
      console.log("password:", this.state.passwordData);
      console.log("errors:", this.state.errors);
      console.log("submission sucessful");
    }
  };
  handleChange = (event) => {
    const inputs = { [event.currentTarget.name]: [event.currentTarget.value] };
    console.log(inputs);
    const { data, passwordData, errors, input } = { ...this.state };
    const schemaType =
      event.currentTarget.name === "newPassword" ||
      event.currentTarget.name === "reEnterPassword"
        ? "password"
        : "regular";

    //if the target is password fields
    const schema =
      schemaType === "regular"
        ? {
            [event.currentTarget.name]: this.schema[event.currentTarget.name],
          }
        : {
            [event.currentTarget.name]: this.passwordSchema[
              event.currentTarget.name
            ],
          };

    inputs[event.currentTarget.name] = event.currentTarget.value;
    const { error } = Joi.validate(inputs, schema);

    if (schemaType === "password") {
      passwordData[event.currentTarget.name] = event.currentTarget.value;
      console.log("password changed:", passwordData);
      //this.setState({ passwordData: passwordData, errors: errors });
      this.setState({ passwordData: passwordData });
    } else {
      data[event.currentTarget.name] = event.currentTarget.value;
      // this.setState({ data: data, errors: errors });
      this.setState({ data: data });
    }

    if (error) {
      errors[event.currentTarget.name] = error.details[0].message;
      console.log("handle change:", error.details[0]);
    } else {
      if (passwordData["newPassword"] !== passwordData["reEnterPassword"]) {
        errors["newPassword"] = "password not matching";
        errors["reEnterPassword"] = "password not matching";
        input.password = false;
        this.setState({ input: input });
      } else {
        errors["newPassword"] = null;
        errors["reEnterPassword"] = null;
        errors[event.currentTarget.name] = null;
        this.setState({ passwordData: passwordData, errors: errors });
      }
    }
  };
  handleInputs = (inputField1, inputField2) => {
    const input = { ...this.state.input };
    input[inputField1] = false;
    input[inputField2] = false;

    this.setState({ input: input });
  };
  handleDeleteAccount = () => {
    const token = UserSession.getToken();
    const { id } = jwtDecode(token);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: UserSession.getToken(),
      },
    };
    axios
      .delete(`${API_BASE_URL}/user/${id}`, axiosConfig)
      .then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 202) {
          this.setState({
            data: {
              firstname: "",
              lastname: "",
              username: "",
              email: "",
              password: "",
            },
          });
          alert("Success! The User Account Has been Deleted Successfully!");
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
    const { classes } = this.props;
    if (!UserSession.getUserID()) return <Redirect to="/"></Redirect>;
    return (
      <>
        <Navbar></Navbar>

        <Typography className={classes.cardTitle} variant="h2">
          Your Profile
        </Typography>
        <Box
          className={classes.form}
          component="form"
          onSubmit={this.handleSubmit}
        >
          <Box component="div" className={classes.editButton}>
            {" "}
            <IconButton
              onClick={() => this.handleInputs("firstname", "lastname")}
            >
              {" "}
              <EditIcon></EditIcon>
            </IconButton>
          </Box>

          <InputField
            // inputComponent="input"
            disabled={this.state.input.firstname}
            placeholder="Enter First Name"
            type="firstname"
            name="firstname"
            value={this.state.data.firstname}
            onChange={this.handleChange}
            fullWidth={true}
            label="First Name"
            variant="standard"
            margin="dense"
            size="medium"
          ></InputField>
          {this.state.errors.firstname && (
            <Typography variant="subtitle2" color="error">
              {this.state.errors.firstname}
            </Typography>
          )}
          <br></br>
          <br></br>

          <InputField
            // inputComponent="input"
            disabled={this.state.input.lastname}
            placeholder="Enter Last Name"
            type="lastname"
            name="lastname"
            value={this.state.data.lastname}
            onChange={this.handleChange}
            fullWidth={true}
            label="Last Name"
            variant="standard"
            margin="dense"
            size="medium"
          ></InputField>
          {this.state.errors.lastname && (
            <Typography variant="subtitle2" color="error">
              {this.state.errors.lastname}
            </Typography>
          )}
          <br></br>
          <br></br>

          <InputField
            // inputComponent="input"
            placeholder="Enter Username"
            disabled={true}
            type="text"
            name="username"
            value={this.state.data.username}
            onChange={this.handleChange}
            fullWidth={true}
            label="User Name"
            variant="standard"
            margin="dense"
            size="medium"
          ></InputField>
          {this.state.errors.username && (
            <Typography variant="subtitle2" color="error">
              {this.state.errors.username}
            </Typography>
          )}
          <br></br>
          <br></br>

          <InputField
            // inputComponent="input"
            disabled={true}
            placeholder="Enter email"
            type="email"
            name="email"
            value={this.state.data.email}
            onChange={this.handleChange}
            fullWidth={true}
            label="Email"
            variant="standard"
            margin="dense"
            size="medium"
          ></InputField>
          {this.state.errors.email && (
            <Typography variant="subtitle2" color="error">
              {this.state.errors.email}
            </Typography>
          )}
          <br></br>
          <br></br>

          <InputField
            placeholder="Your password"
            disabled={true}
            type="password"
            name="password"
            value={this.state.data.password}
            onChange={this.handleChange}
            fullWidth={true}
            label="Password"
            variant="standard"
            margin="dense"
            size="medium"
          ></InputField>
          <br></br>
          {!this.state.input.password && (
            <>
              <InputField
                placeholder="Enter new password"
                type="password"
                name="newPassword"
                value={this.state.passwordData.newPassword}
                onChange={this.handleChange}
                fullWidth={true}
                label="New Password"
                variant="standard"
                margin="dense"
                size="medium"
              ></InputField>
              {this.state.errors.newPassword && (
                <Typography variant="subtitle2" color="error">
                  {this.state.errors.newPassword}
                </Typography>
              )}
              <br></br>

              <InputField
                placeholder="Re-enter new password"
                type="password"
                name="reEnterPassword"
                value={this.state.passwordData.reEnterPassword}
                onChange={this.handleChange}
                fullWidth={true}
                label="Re-enter New Password"
                variant="standard"
                margin="dense"
                size="medium"
              ></InputField>
              <br></br>
            </>
          )}
          {this.state.errors.reEnterPassword && (
            <Typography variant="subtitle2" color="error">
              {this.state.errors.reEnterPassword}
            </Typography>
          )}

          <Button
            size="small"
            color="primary"
            onClick={() => this.handleInputs("password")}
          >
            Change Password
          </Button>
          <br></br>
          <br></br>
          <Button
            className={classes.saveButton}
            type="submit"
            value="submit"
            variant="outlined"
            fullWidth={true}
            endIcon={<SaveIcon></SaveIcon>}
          >
            Save Changes
          </Button>
          <br></br>

          <Button
            className={classes.deleteButton}
            value="delete account"
            variant="outlined"
            fullWidth={true}
            color="secondary"
            endIcon={<DeleteForeverIcon></DeleteForeverIcon>}
            onClick={this.handleDeleteAccount}
          >
            Delete Account
          </Button>
        </Box>
      </>
    );
  }
}
export default withStyles(styles)(Profile);
