import React from 'react';
import firebase from "firebase";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import HeaderWithLogout from './HeaderWithLogout';
import { useHistory, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isEmptyObject } from 'jquery';

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

export default function Home() {
    const classes = useStyles();

    const [data, setData] = React.useState({})

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user, typeof user);
                setData(user);
                const name = user.name;
                const email = user.email;
                const uid = user.uid;
                const details = {
                    name,
                    email,
                    uid
                }
                axios.post('http://localhost:8080/home', details)
                .then((res) => {
                    console.log("Done")
                })
                .catch(err => {
                    console.log(err);
                });
            // ...
            } else {
                console.log("Not signed in");
            }
        });

    }, []);
    
    return (
        <div>
            <HeaderWithLogout />
            <div className={classes.root}>
            {
                isEmptyObject(data) ? <p style={{textAlign:"center"}}>Loading...</p>
                : <div className={classes.root}>
                    <div>
                    <div className="container content intro">
                        <div className="row">
                            <div className="col-sm-12 talk">
                                <h2>Hello {data.email}</h2>
                                <br />
                                <h6 className="bold-four">
                                    Start scheduling emails right away.
                                </h6>
                                <br />
                                <div className="container">
                                    <div className="row" style={{margin: "0 20%"}}>
                                        <div className="col-sm-3"><h6><Link to="/home/schedule" className="btn btn-dark start start-two">Recurring</Link></h6></div>
                                        <div className="col-sm-3"><h6><Link to="/home/schedule" className="btn btn-primary start start-two">Weekly</Link></h6></div>
                                        <div className="col-sm-3"><h6><Link to="/home/schedule" className="btn btn-danger start start-two">Monthly</Link></h6></div>
                                        <div className="col-sm-3"><h6><Link to="/home/schedule" className="btn btn-success start start-two">Yearly</Link></h6></div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div className="container content">
                        <div className="row">
                            <div className="col-sm-12 talk">
                                <h4>Important points:</h4>
                                <ul>
                                    <li>But before you start scheduling, open this link <a href="https://myaccount.google.com/lesssecureapps">link</a> using the account from which you want to send your emails to Allow less secure apps: ON (for Gmail accounts).</li>
                                    <li>Please use correct password for sender's email id, you can frst check the password and then use it here.</li>
                                    <li>Recurring at 30 seconds will send email at 30th second of every minute further.</li>
                                    <li>You should use number for the month. for eg: 11 for november.</li>
                                    <li>You could use 0-7 for week days or their names where 0 and 7 stand for sundays</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}