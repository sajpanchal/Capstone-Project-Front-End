import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import SigninAndSignout from "./SigninAndSignout";
import Popup from "./Popup";

const useStyles = makeStyles((theme) => ({
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const Auth = () => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpenPopup(true)}
        variant="contained"
        style={{ background: "#8ed184" }}
      >
        Login/Register
      </Button>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <SigninAndSignout />
      </Popup>
    </>
  );
};

export default Auth;
