import React from "react";
import { Route, Redirect } from "react-router-dom";
import firebase from 'firebase';

export default function PrivateRoute({ component: Component, ...rest }) {

  const [flag, setFlag] = React.useState(true)

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // console.log(user);
        setFlag(true);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("Not signed in");
        setFlag(false);
      }
    });
  }, []);

  return (
    <Route
      {...rest}
      render={props => {
        return flag ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
