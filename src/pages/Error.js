import { Typography, Box, Button } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router";

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
          <a href="/home">Go Home</a>
        </Button>
      </Typography>
    </Box>
  );
}
