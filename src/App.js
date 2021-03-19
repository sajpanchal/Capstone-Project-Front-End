import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import TripNew from "./pages/TripNew";
import Error from "./pages/Error";
import Popup from "./components/Popup";
import Profile from "./pages/Profile";
import Createtrip from "./pages/Createtrip";
import Trip from "./pages/Trip";
function App() {
  return (
    <>
      <CssBaseline />
      {/* <Home />
      <TripNew />
      <Error /> */}

      <Route exact path="/" component={Home}></Route>
      <Route exact path="/Home" component={Home}></Route>
      <Route exact path="/TripNew" component={TripNew}></Route>
      <Route exact path="/Error" component={Error}></Route>
      <Route exact path="/Profile" component={Profile}></Route>
      <Route exact path="/Createtrip" component={Createtrip}></Route>
      <Route exact path="/Trip" component={Trip}></Route>
    </>
  );
}

export default App;
