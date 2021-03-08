import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Box } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Auth from "./Auth";

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    height: 300,
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
  authclass: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    margin: 20,
  },
});

export default function HomePageCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <Box fontStyle="italic" m={1}>
            Italic font Style.
          </Box>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. ... Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text is simply dummy text of the printing and typesetting
          industry. ... Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text
        </Typography>
      </CardContent>

      <CardActions className={classes.authclass}>
        <Auth />
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}
