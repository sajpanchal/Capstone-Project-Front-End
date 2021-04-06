import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "react-material-ui-carousel";
import { withStyles } from "@material-ui/core/styles";
import UserSession from "../helper/UserSession";
import axios from "axios";
import { Add, AddBox, Create, DeleteForever } from "@material-ui/icons";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@material-ui/lab";
import {
  Box,
  Card,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@material-ui/core";
import jwtDecode from "jwt-decode";
import API_BASE_URL from "./../helper/base-url";

const styles = () => ({
  trip: {
    top: "50%",
    left: "70%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    width: "50%",
    height: "60%",
  },
  timeline: {
    width: "50%",
    float: "left",
    textAlign: "center",
    color: "#8ed176",
  },

  itinerary: {
    width: "40%",
    float: "right",
    textAlign: "center",
  },
  paperHeader: {
    color: "white",
    backgroundColor: "black",
    fontWeight: "bold",
  },
  paperContent: {
    backgroundImage: "linear-gradient(45deg, #8ed176 , #228c12,white)",
    padding: "40px 40px 40px 40px",
  },
});
class Trip extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    itineraries: [],
    timeline: [],
  };
  componentDidMount() {
    let { timeline, itineraries } = { ...this.state };
    const token = UserSession.getToken();
    const { id } = jwtDecode(token);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: token,
      },
    };
    axios
      .get(`${API_BASE_URL}/trip/${this.props.match.params.id}`, axiosConfig)
      .then((res) => {
        if (res.status === 202 && res.data.userid === id) {
          timeline.push({
            date: res.data.startdate.substring(0, 10),
            location: res.data.source,
          });
          timeline.push({
            date: res.data.enddate.substring(0, 10),
            location: res.data.destination,
          });

          this.setState({ timeline: timeline }, () => {
            console.log(timeline);
          });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        if (err.message)
          this.props.history.push({
            pathname: "/error",
            err: { message: err.message },
          });
        else
          this.props.history.push({
            pathname: "/error",
            err: { message: "Page Not Found" },
          });
      });
    axios
      .get(
        `${API_BASE_URL}/itinerary/${this.props.match.params.id}/itinerary`,
        axiosConfig
      )
      .then((res) => {
        if (res.status === 202) {
          for (var data in res.data) {
            itineraries.push({
              title: res.data[data].name,
              description: res.data[data].description,
              date: res.data[data].date.substring(0, 10),
              fk_tripid: res.data[data].fk_tripid,
              id: res.data[data].id,
            });
            console.log(data);
          }
          this.setState({ itineraries: itineraries }, () => {
            console.log(itineraries);
          });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        if (err.message)
          this.props.history.push({
            pathname: "/error",
            err: { message: err.message },
          });
        else
          this.props.history.push({
            pathname: "/error",
            err: { message: "Page Not Found" },
          });
      });
  }
  handleAddItinerary = () => {
    this.props.history.push({
      pathname: "/create-itinerary",
      state: { id: this.props.match.params.id },
    });
  };
  handleEditItinerary = (id, trip_id) => {
    this.props.history.push({
      pathname: "/edit-itinerary",
      state: { id: id, trip_id: trip_id },
    });
  };
  handleDeleteItinerary = (itinerary_id) => {
    const token = UserSession.getToken();

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: token,
      },
    };
    axios
      .delete(`${API_BASE_URL}/itinerary/${itinerary_id}`, axiosConfig)
      .then((res) => {
        if (res.status === 202) {
          window.location.reload();
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        if (err.message)
          this.props.history.push({
            pathname: "/error",
            err: { message: err.message },
          });
        else
          this.props.history.push({
            pathname: "/error",
            err: { message: "Page Not Found" },
          });
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <Navbar></Navbar>

        <Box component="div" className={classes.trip}>
          <Box component="div" className={classes.timeline}>
            <Typography align="center" variant="h4">
              Trip Timeline
            </Typography>{" "}
            <Timeline align="left">
              {this.state.timeline.map((item, index) => (
                <TimelineItem>
                  {" "}
                  <TimelineOppositeContent>
                    <Typography color="secondary">{item.date}</Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot></TimelineDot>
                    {index !== this.state.timeline.length - 1 && (
                      <TimelineConnector></TimelineConnector>
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="subtitle1">{item.location}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
          {this.state.itineraries.length > 0 ? (
            <Box component="div" className={classes.itinerary}>
              <Carousel>
                {this.state.itineraries.map((item) => (
                  <Paper>
                    <Typography
                      align="center"
                      variant="h4"
                      className={classes.paperHeader}
                    >
                      Itinerary Details
                    </Typography>

                    <Box component="div" className={classes.paperContent}>
                      <Typography variant="h5" color="inherit">
                        {item.title}
                      </Typography>
                      <br></br>
                      <Typography variant="h6">{item.description}</Typography>
                      <Typography variant="subtitle1">{item.date}</Typography>
                      <br></br>
                      <Button
                        endIcon={<Create></Create>}
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          this.handleEditItinerary(item.id, item.fk_tripid)
                        }
                      >
                        Edit
                      </Button>
                      {"  "}
                      <Button
                        endIcon={<DeleteForever></DeleteForever>}
                        variant="contained"
                        color="secondary"
                        onClick={() => this.handleDeleteItinerary(item.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Carousel>
              <Button
                endIcon={<AddBox></AddBox>}
                variant="contained"
                onClick={this.handleAddItinerary}
              >
                Add New Itinerary
              </Button>
            </Box>
          ) : (
            <Box className={classes.itinerary}>
              <Carousel>
                <Paper>
                  <Typography
                    align="center"
                    variant="h4"
                    className={classes.paperHeader}
                  >
                    Itinerary Details
                  </Typography>
                  <Box component="div" className={classes.paperContent}>
                    <br></br>
                    <Typography variant="h5" color="inherit">
                      No Itinerary Exists
                    </Typography>
                    <br></br>
                    <Typography variant="h6"></Typography>

                    <Typography variant="subtitle1"></Typography>
                  </Box>
                </Paper>
              </Carousel>
              <Button
                endIcon={<AddBox></AddBox>}
                variant="contained"
                onClick={this.handleAddItinerary}
              >
                Add New Itinerary
              </Button>
            </Box>
          )}
        </Box>
      </>
    );
  }
}
export default withStyles(styles)(Trip);
