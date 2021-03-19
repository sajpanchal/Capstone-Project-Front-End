import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "react-material-ui-carousel";
import { withStyles } from "@material-ui/core/styles";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@material-ui/lab";
import { Box, Card, Typography, Paper, Button } from "@material-ui/core";

const styles = () => ({
  trip: {
    top: "50%",
    left: "70%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    width: "50%",
    height: "60%",
    // display: "flex",
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
    color: "#8ed176",
  },
  paperContent: {
    backgroundImage: "linear-gradient(45deg, #8ed176 , #228c12,white)",
    padding: "40px 40px 40px 40px",
  },
});
class Trip extends React.Component {
  state = {
    itineraries: [
      {
        title: "Kitchener To-Do List",
        description: "Meet at Joe's Place",
        date: "Mar 17, 2021",
      },
      {
        title: "New York To-Do List",
        description: "Statue of Liberty",
        date: "Mar 18, 2021",
      },
      {
        title: "San Francisco To-Do List",
        description: "Golden Gate Bridge",
        date: "Mar 19, 2021",
      },
    ],
    timeline: [
      { date: "March 17, 2021", location: "Kitchener, ON" },
      { date: "March 18, 2021", location: "New York, NY" },
      { date: "March 19, 2021", location: "San Francisco, CA" },
    ],
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
          <Carousel className={classes.itinerary}>
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
                  <br></br>
                  <Typography variant="h5" color="inherit">
                    {item.title}
                  </Typography>
                  <br></br>
                  <Typography variant="h6">{item.description}</Typography>

                  <Typography variant="subtitle1">{item.date}</Typography>
                </Box>
              </Paper>
            ))}
          </Carousel>
        </Box>
      </>
    );
  }
}
export default withStyles(styles)(Trip);
