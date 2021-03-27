import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Popup from "../components/Popup";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Register from "../components/Register";
// import Auth from "../components/Auth.js";
import SigninAndSignout from "../components/SigninAndSignout";
import HomePageCard from "../components/HomePageCard";
import HomePageCard2 from "../components/HomePageCard2";
class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        {/*<HomePageCard />*/}
        <HomePageCard2></HomePageCard2>

        {/* <Auth /> */}
      </>
    );
  }
}

export default Home;
