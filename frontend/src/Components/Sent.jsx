import React from 'react';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HeaderWithLogout from './HeaderWithLogout';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
    table: {
    minWidth: 650
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "black",
        backgroundColor:"#f1f1f1",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const Winner = () => {
    const classes = useStyles();

    const [data, setData] = React.useState([])

    React.useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                axios.get('http://localhost:8080/events/sent', {
                    params: {
                        uid: user.uid
                    }
                })
                .then(function (response) {
                    setData(response.data);
                }).catch(err => {
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
            <br />
            <div className={classes.root}>
            <div className="container content intro">
            <h2>Sent Mails</h2>
            <br />
            {
                (data.length === 0) ? <h4>There are no sent mails as of now</h4>
                : <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr. No.</TableCell>
                                <TableCell align="right">Sent at</TableCell>
                                <TableCell align="right">From</TableCell>
                                <TableCell align="right">To</TableCell>
                                <TableCell align="right">cc</TableCell>
                                <TableCell align="right">Month</TableCell>
                                <TableCell align="right">Day</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Hours</TableCell>
                                <TableCell align="right">Minutes</TableCell>
                                <TableCell align="right">Seconds</TableCell>
                                <TableCell align="right">Subject</TableCell>
                                <TableCell align="right">Body</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Error/Success</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((ticket,index) => (
                            <TableRow key={ticket._id}>
                                <TableCell component="th" scope="row">
                                    {index+1}
                                </TableCell>
                                <TableCell align="right">{ticket.createdAt}</TableCell>
                                <TableCell align="right">{ticket.from}</TableCell>
                                <TableCell align="right">{ticket.to}</TableCell>
                                <TableCell align="right">{ticket.cc}</TableCell>
                                <TableCell align="right">{ticket.month}</TableCell>
                                <TableCell align="right">{ticket.day}</TableCell>
                                <TableCell align="right">{ticket.date}</TableCell>
                                <TableCell align="right">{ticket.hours}</TableCell>
                                <TableCell align="right">{ticket.minutes}</TableCell>
                                <TableCell align="right">{ticket.seconds}</TableCell>
                                <TableCell align="right">{ticket.subject}</TableCell>
                                <TableCell align="right">{ticket.body}</TableCell>
                                <TableCell align="right">{ticket.type}</TableCell>
                                <TableCell align="right">{ticket.error}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <br />
            </div>
            </div>
        </div>
    );
}

export default Winner;