import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import { Edit, DeleteForever } from "@material-ui/icons";
import first from "../images/first.jpg";
import second from "../images/second.jpg";
import third from "../images/third.jpg";
import fourth from "../images/fourth.jpg";
import UserSession from "../helper/UserSession";
import jwtDecode from "jwt-decode";
import axios from "axios";
import API_BASE_URL from "../helper/base-url";
import { Route, withRouter } from "react-router-dom";
const styles = () => ({
  mainContainer: {
    background: "#233",
    height: "100%",
  },
  cardContainer: {
    maxWidth: 345,

    margin: "5rem auto",
  },
  messageBox: {
    marginTop: 50,
    color: "#8ed184",
    textAlign: "center",
  },
});
class Trips extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    trips: [],
  };
  componentDidMount() {
    try {
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
      const { id } = jwtDecode(token);

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          token: token,
        },
      };

      axios
        .get(`${API_BASE_URL}/trip/${id}/trips`, axiosConfig)
        .then((res) => {
          if (res.status === 202) {
            console.log(res.data);
            let trips = [];
            for (var key in res.data) {
              trips[key] = res.data[key];
            }

            this.setState({ trips: trips }, () => {
              console.log(this.state.trips);
            });
          } else {
            const err = new Error(res.error);
            throw err;
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert(err.message);
    }
  }
  handleEditTrip = (trip_id) => {
    try {
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

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          token: token,
        },
      };
      axios
        .get(`${API_BASE_URL}/trip/${trip_id}`, axiosConfig)
        .then((res) => {
          if (res.status === 202) {
            console.log(res.data);
            this.props.history.push({
              pathname: `/edit-trip/${trip_id}`,
              trip: res.data,
            });
          } else if (res.status === 401) {
            this.props.history.push({
              pathname: "/error",
              err: {
                message:
                  "User Login session has been expired. Please login again.",
              },
            });
          } else {
            const err = new Error(res.error);
            throw err;
          }
        })
        .catch((err) => {
          this.props.history.push({
            pathname: "/error",
            err: { message: err.message },
          });
        });
    } catch (err) {
      this.props.history.push({
        pathname: "/error",
        err: { message: err.message },
      });
    }
  };
  handleDeleteTrip = (trip_id) => {
    try {
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

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          token: token,
        },
      };
      axios
        .delete(`${API_BASE_URL}/trip/${trip_id}`, axiosConfig)
        .then((res) => {
          if (res.status === 202) {
            console.log(res.data);
            window.location.reload();
          } else if (res.status === 401) {
            this.props.history.push({
              pathname: "/error",
              err: {
                message:
                  "User Login session has been expired. Please login again.",
              },
            });
          } else {
            const err = new Error(res.error);
            throw err;
          }
        })
        .catch((err) => {
          this.props.history.push({
            pathname: "/error",
            err: { message: err.message },
          });
        });
    } catch (err) {
      this.props.history.push({
        pathname: "/error",
        err: { message: err.message },
      });
    }
  };

  render() {
    const { classes } = this.props;
    let images = [first, second, third, fourth];
    return (
      <Box component="div" style={{ background: "white", height: "100vh" }}>
        <Navbar />
        <Grid container justify="center" spacing={2}>
          {this.state.trips.length > 0 ? (
            this.state.trips.map((trip) => {
              return (
                <Grid item xs={12} sm={8} md={3} id={trip.id}>
                  <Card className={classes.cardContainer}>
                    <CardActionArea href={`/trip/${trip.id}`}>
                      <CardMedia
                        component="img"
                        alt="Image Not Available"
                        height="300"
                        image={images[trip.id % 4]}
                      ></CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h5">
                          {trip.name}
                        </Typography>
                        <Typography gutterBottom variant="h6">
                          {trip.source} to {trip.destination}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          {trip.startDate.substring(0, 10)} to{" "}
                          {trip.endDate.substring(0, 10)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <IconButton onClick={() => this.handleEditTrip(trip.id)}>
                      <Edit fontSize="large"></Edit>
                    </IconButton>{" "}
                    <IconButton
                      style={{ float: "right" }}
                      onClick={() => this.handleDeleteTrip(trip.id)}
                    >
                      <DeleteForever
                        fontSize="large"
                        color="secondary"
                      ></DeleteForever>
                    </IconButton>{" "}
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Box component="div" className={classes.messageBox}>
              <Typography variant="h2">No Trips Available!</Typography>
              <Typography variant="h5" color="secondary">
                Go to Create Trip page to add a new trip.
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    );
  }
}

//export default Trips;
export default withRouter(withStyles(styles)(Trips));
