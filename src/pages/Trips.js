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
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import miami from "../images/miami.jpg";
import vegas from "../images/vegas.jpg";
import sanfrancisco from "../images/san-francisco.jpg";
import UserSession from "../helper/UserSession";
import jwtDecode from "jwt-decode";
import axios from "axios";
import API_BASE_URL from "../helper/base-url";

const styles = () => ({
  mainContainer: {
    background: "#233",
    height: "100%",
  },
  cardContainer: {
    maxWidth: 345,

    margin: "5rem auto",
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
        alert("User is not Logged In. There are no trips to show.");
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

  render() {
    const { classes } = this.props;
    return (
      <Box component="div" style={{ background: "white", height: "100vh" }}>
        <Navbar />
        <Grid container justify="center" spacing={2}>
          {this.state.trips.map((trip) => {
            return (
              <Grid item xs={12} sm={8} md={3}>
                <Card className={classes.cardContainer}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="something"
                      height="300"
                      image={trip.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {trip.name}
                      </Typography>
                      <Typography gutterBottom variant="h6">
                        Created By:{trip.fk_organizerid}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
          {/* Dummydata1 */}
          {/* 
        <Grid item xs={12} sm={8} md={3}>
          <Card className={classes.cardContainer}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="something"
                height="300"
                image={miami}
              ></CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Fun Trip
                </Typography>
                <Typography gutterBottom variant="h6">
                  Created By:Amandeep
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>*/}
          {/* Dummydata2 */}
          {/*
        <Grid item xs={12} sm={8} md={3}>
          <Card className={classes.cardContainer}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="something"
                height="300"
                image={vegas}
              ></CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  First Trip
                </Typography>
                <Typography gutterBottom variant="h6">
                  Created By:Teena
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>*/}
          {/* Dummydata3 */}
          {/*<Grid item xs={12} sm={8} md={3}>
          <Card className={classes.cardContainer}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="something"
                height="300"
                image={sanfrancisco}
              ></CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  First Trip
                </Typography>
                <Typography gutterBottom variant="h6">
                  Created By:Saj
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
      </Grid>*/}
        </Grid>
      </Box>
    );
  }
}

//export default Trips;
export default withStyles(styles)(Trips);
