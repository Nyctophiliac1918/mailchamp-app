import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color:"black"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 20,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: "lightBlue",
    },
}));

export default function Landing() {
    const classes = useStyles();

    return (
        <div className="intro float">
            <div className={classes.root}>
                <div>
                <div className="container content">
                    <div className="row">
                        <div className="col-sm-12 talk">
                            <h1>MailChamp</h1>
                            <h3>Free scheduled and recurring emails</h3>
                            <br />
                            <h6 className="bold-four">
                                MailChamp is a free service that allows Gmail users to schedule future and recurring emails.
                            </h6>
                            <br />
                            <div className="container">
                                <div className="row" style={{margin: "0 20%"}}>
                                    <div className="col-sm-4"><h6><Link to="/home" className="btn btn-dark start start-two">Get Started</Link></h6></div>
                                    <div className="col-sm-4"><h6><Link to="/login" className="btn btn-primary start start-two">Login</Link></h6></div>
                                    <div className="col-sm-4"><h6><Link to="/register" className="btn btn-danger start start-two">Register</Link></h6></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}