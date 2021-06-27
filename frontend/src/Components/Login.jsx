import React, { useState } from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import ConfirmationNumberSharpIcon from '@material-ui/icons/ConfirmationNumberSharp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth } from '../firebase';
import GoogleButton from 'react-google-button'
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorsE, setIsErrorE] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        history.push("./home");
      })
      .catch(error => alert(error.message));
  };

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // console.log(user);
        history.push('/home')
        // ...
      } else {
        // User is signed out
        // ...
        console.log("Not signed in");
      }
    });
  }, []);

  const handleGoogleSignIn = (e) => {
    var provider =  new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().useDeviceLanguage();

    firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      history.push('/home');
      // ...
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h4">
              Sign In
            </Typography>
            {/* <Avatar className={classes.avatar}>
              <ConfirmationNumberSharpIcon />
            </Avatar> */}
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                error={errorsE}
                type="email"
                value={email}
                autoComplete="email"
                onBlur={(e) => {
                  if (typeof e.target.value !== "undefined") {
                    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    if (!pattern.test(e.target.value)) {
                      setIsErrorE(true);
                      setIsSubmitting(true);
                    }
                    else{
                      setIsErrorE(false);
                      setIsSubmitting(false)
                    }
                  }
                }}
                onChange={(e)=>{
                  setEmail(e.target.value);
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                value={password}
                name="password"
                label="Password"
                id="password"
                onBlur={(e) => {
                  setPassword(e.target.value);
                  setIsSubmitting(false);
                }}
                onChange={(e)=>{
                  setPassword(e.target.value);
                  setIsSubmitting(false);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled = { isSubmitting }
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In!
              </Button>
            </form>
            <Typography>Don't have an account? <Link to="/register">Create a new account!</Link></Typography>
            <br />
            <br />
            <Typography color="textSecondary">Try signing in with Google</Typography>
            <GoogleButton
              style={{width: "100%", marginTop:"10px"}}
              type="light" // can be light or dark
              onClick={handleGoogleSignIn}
            />
          </div>
        </Container>
    </div>
  );
}