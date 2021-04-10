import { Typography, Box, Button } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router";
import UserSession from "../helper/UserSession";

export default function (props) {
  if (!props.location.err) return <Redirect to="/"></Redirect>;
  return (
    <Box component="div">
      <Typography variant="h1" color="Primary" style={{ textAlign: "center" }}>
        Error:
      </Typography>
      <Typography
        variant="h4"
        color="secondary"
        style={{ textAlign: "center" }}
      >
        {props.location.err.message}
        <br></br>
        <Button>
          <a href={UserSession.getUserID() ? "/trips" : "/home"}>Go Home</a>
        </Button>
      </Typography>
    </Box>
  );
}
