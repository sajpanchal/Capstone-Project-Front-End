import React from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Popup from "../components/Popup";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
// import Auth from "../components/Auth.js";
import SigninAndSignout from "../components/SigninAndSignout";
import HomePageCard from "../components/HomePageCard";

const Home = () => {
  return (
    <>
      <Navbar />
      <HomePageCard />
      <Login />
      {/* <Auth /> */}
    </>
  );
};

export default Home;
