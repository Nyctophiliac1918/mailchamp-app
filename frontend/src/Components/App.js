import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import Home from "./Home";
import Schedule from './Schedule';
import PrivateRoute from './PrivateRoute';
import Scheduled from './Scheduled';
import Sent from './Sent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute exact path="/home/scheduled" component={Scheduled} />
          <PrivateRoute exact path="/home/sent" component={Sent} />
          <PrivateRoute exact path="/home/schedule" component={Schedule} />
          <PrivateRoute exact path="/home" component={Home} />
          {/* <Route path="/tickets/:ticketID" component={EventsTable} /> */}
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          <Route path="/register">
            <Header />
            <Register />
          </Route>
          <Route path="/">
            <Header />
            <Landing />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
