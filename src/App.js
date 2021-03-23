import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Error from "./pages/Error";
import Popup from "./components/Popup";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import Createtrip from "./pages/Createtrip";
import Trip from "./pages/Trip";
function App() {
  return (
    <>
      <CssBaseline />

      <Route exact path="/" component={Home}></Route>
<<<<<<< HEAD
      <Route exact path="/home" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/Trips" component={Trips}></Route>
      <Route exact path="/error" component={Error}></Route>
      <Route exact path="/profile" component={Profile}></Route>
      <Route exact path="/create-trip" component={Createtrip}></Route>
=======
      <Route exact path="/Home" component={Home}></Route>
      <Route exact path="/TripNew" component={TripNew}></Route>
      <Route exact path="/Error" component={Error}></Route>
      <Route exact path="/Profile" component={Profile}></Route>
      <Route exact path="/Createtrip" component={Createtrip}></Route>
      <Route exact path="/Trip" component={Trip}></Route>
>>>>>>> master
    </>
  );
}

export default App;
