import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
  Button,
  ClickAwayListener,
} from "@material-ui/core";
import SigninAndSignout from "./SigninAndSignout";
// import { TramRounded } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(0),
    position: "absolute",
    top: theme.spacing(5),
    background: "linear-gradient(45deg, #8ed184 30%, #228c12 90%)",
    // minHeight: "80vh",
    // maxHeight: "80vh",
  },
}));

export default function Popup(props) {
  const classes = useStyles();
  const { children, openPopup, setOpenPopup } = props;
  // const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog
      open={openPopup}
      onClose={handleClose}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
