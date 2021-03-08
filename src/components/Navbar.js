import React, { useState } from "react";
import Auth from "./Auth";
import avatar from "../images/first.jpg";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  AppBar,
  Toolbar,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Avatar,
  Typography,
  List,
  Button,
  ListItemIcon,
} from "@material-ui/core";
import {
  Home,
  TripOrigin,
  Menu,
  AddAPhotoRounded,
  Person,
  CardTravel,
} from "@material-ui/icons";

//Css Styles

const useStyles = makeStyles((theme) => ({
  menuSliderroot: {
    background: "linear-gradient(45deg, #8ed184 30%, #228c12 90%)",
    height: "100%",
    width: 250,
  },
  avatar: {
    display: "block",
    width: theme.spacing(20),
    height: theme.spacing(15),
    margin: "0.5rem auto",
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
}));
const menuItems = [
  {
    listIcon: <Home />,
    listText: "Home",
    listPath: "/Home",
  },
  {
    listIcon: <Person />,
    listText: "Profile",
    listPath: "/Profile",
  },
  {
    listIcon: <CardTravel />,
    listText: "Create Trip",
    listPath: "/CreateTrip",
  },
  {
    listIcon: <TripOrigin />,
    listText: "Trips",
    listPath: "/TripNew",
  },
];

const Navbar = () => {
  const classes = useStyles();
  const [menu, setMenu] = useState({ right: false });

  const toggleMenu = (slider, open) => () => {
    setMenu({ ...menu, [slider]: open });
  };
  const sideMenu = (slider) => (
    <Box
      className={classes.menuSliderroot}
      component="div"
      onClick={toggleMenu(slider, false)}
    >
      <Avatar className={classes.avatar} src={avatar} alt="first"></Avatar>
      <Divider />
      <List>
        {menuItems.map((lsItem, key) => (
          <ListItem button key={key} component={Link} to={lsItem.listPath}>
            <ListItemIcon>{lsItem.listIcon}</ListItemIcon>
            <ListItemText primary={lsItem.listText} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Box component="nav">
        <AppBar position="static" style={{ background: "#3d6e3d" }}>
          <Toolbar>
            <IconButton onClick={toggleMenu("left", true)}>
              <Menu style={{ color: "black" }} />
            </IconButton>
            <Typography variant="h4" style={{ color: "black" }}>
              Weekend Getaway On The Go{" "}
            </Typography>
            <Drawer
              anchor="left"
              open={menu.left}
              onClose={toggleMenu("left", false)}
            >
              {sideMenu("left")}
            </Drawer>
            <IconButton>
              <AddAPhotoRounded color="black"></AddAPhotoRounded>
            </IconButton>
            <Typography variant="subtitle" style={{ color: "black" }}>
              Adventure begins here
            </Typography>
            <section className={classes.rightToolbar}>
              <Auth />
            </section>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;