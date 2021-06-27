import React from 'react';
import firebase from "firebase";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: "0 7%"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function HeaderWithLogout() {
    const classes = useStyles();
    const history = useHistory();

    const handleLogout = (e) => {
        firebase.auth().signOut().then(() => {
            history.push("/");
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AppBar style={{ background: 'rgb(31, 30, 30)' }} position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <img src={process.env.PUBLIC_URL + '/alogo.jpg'} style={{ width: "3rem" }} />
                            </IconButton>
                            <Typography variant="h5" className={classes.title}>
                                MailChamp
                            </Typography>
                            <Button href="/home" color="inherit">Home</Button>
                            <Button href="/home/scheduled" color="inherit">Scheduled</Button>
                            <Button href="/home/sent" color="inherit">Sent Mails</Button>
                            <Button href="/" color="inherit" onClick={handleLogout}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        </div>
    );
}