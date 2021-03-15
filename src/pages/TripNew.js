import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Box,Grid,Card,CardActionArea,CardActions,CardContent,CardMedia,Button,Typography} from "@material-ui/core"
import Navbar from "../components/Navbar";
import miami from "../images/miami.jpg"
import vegas from "../images/vegas.jpg";
import sanfrancisco from "../images/san-francisco.jpg";

const useStyles = makeStyles({
  mainContainer: {
    background: "#233",
    height: "100%",
  },
  cardContainer: {
    maxWidth: 345,

    margin: "5rem auto",
  },
});
const TripNew = () => {
  const classes = useStyles();
  return (
    <Box component="div" style={{ background: "white", height: "100vh" }}>
      <Navbar />
      <Grid container justify="center" spacing={2}>
        {/* Dummydata1 */}
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
        </Grid>
        {/* Dummydata2 */}
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
        </Grid>
        {/* Dummydata3 */}
        <Grid item xs={12} sm={8} md={3}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default TripNew;
