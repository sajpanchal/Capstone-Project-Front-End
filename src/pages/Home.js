import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
// import Popup from "../components/Popup";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Register from "../components/Register";
// import Auth from "../components/Auth.js";
import SigninAndSignout from "../components/SigninAndSignout";
import HomePageCard from "../components/HomePageCard";
import HomePageCard2 from "../components/HomePageCard2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div
          className="leaflet-map-container"
          style={{ "z-index": "0", position: "relative", width: "100%" }}
        >
          <MapContainer
            center={[43.5148, -80.2182]}
            zoom={11}
            scrollWheelZoom={false}
            style={{ height: "91vh", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[43.4416, -80.4955]}>
              <Popup>
                Made by Team CodeJunxion <br /> See you out there!
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <HomePageCard2></HomePageCard2>

        {/* <Auth /> */}
      </>
    );
  }
}

export default Home;
