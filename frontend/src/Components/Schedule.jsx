import React, { useState, useRef, useEffect } from 'react';
import firebase from "firebase";
import { Form, Button, Card, Col, Row } from "react-bootstrap"
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import HeaderWithLogout from './HeaderWithLogout';
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

export default function Recurring() {
    const classes = useStyles();

    const [uid, setUid] = useState("");
    const emailSRef = useRef();
    const passwordRef = useRef();
    const emailRRef = useRef();
    const emailCRef = useRef();
    const subjectRef = useRef();
    const bodyRef = useRef();
    const monthRef = useRef();
    const dayRef = useRef();
    const dateRef = useRef();
    const hoursRef = useRef();
    const minutesRef = useRef();
    const secondsRef = useRef();
    const [disabledD, setDisabledD] = useState(false);
    const [disabledDa, setDisabledDa] = useState(false);
    const [disabledM, setDisabledM] = useState(false);
    const [disabledH, setDisabledH] = useState(false);
    const [disabledMi, setDisabledMi] = useState(false);
    const [type, setType] = useState('yearly');

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // console.log(user, typeof user);
                setUid(user.uid);
            // ...
            } else {
                console.log("Not signed in");
            }
        });

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const from = emailSRef.current.value;
        const fromPass = passwordRef.current.value;
        const to = emailRRef.current.value;
        const cc = emailCRef.current.value;
        const subject = subjectRef.current.value;
        const body = bodyRef.current.value;
        const month = monthRef.current.value;
        const weekday = dayRef.current.value;
        const date = dateRef.current.value;
        const hours = hoursRef.current.value;
        const minutes = minutesRef.current.value;
        const seconds = secondsRef.current.value;

        const details = {
            uid,
            from,
            fromPass,
            to,
            cc,
            subject,
            month,
            weekday,
            date,
            hours,
            minutes,
            seconds,
            type,
            body
        }
        console.log(details);
        axios
        .post('http://localhost:8080/events', details)
        .then((res) => {
            console.log("Yes");
        })
        .catch(err => {
            console.log(err);
        });

        e.target.reset();        
    };

    const handleChange = (e) => {
        if(e.target.value === 'recurring')
        {
            setDisabledD(true);
            setDisabledDa(true);
            setDisabledM(true);
            setDisabledH(true);
            setDisabledMi(true);
        }
        if(e.target.value === 'weekly')
        {
            setDisabledD(true);
            setDisabledDa(false);
            setDisabledM(true);
            setDisabledH(false);
            setDisabledMi(false);
        }
        if(e.target.value === 'monthly')
        {
            setDisabledD(false);
            setDisabledDa(true);
            setDisabledM(true);
            setDisabledH(false);
            setDisabledMi(false);        }
        if(e.target.value === 'yearly')
        {
            setDisabledD(false);
            setDisabledDa(false);
            setDisabledM(false);
            setDisabledH(false);
            setDisabledMi(false);
        }
        setType(e.target.value);
    }

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(typeof user);
            } else {
                console.log("Not signed in");
            }
        });

    }, []);
    
    return (
        <div>
            <HeaderWithLogout />
            <div className={classes.root}>
                <div className="container content intro">
                <Card>
                <Card.Body>
                {/* {error && <Alert variant="danger">{error}</Alert>} */}
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} id="emailS">
                            <Form.Label>Sender's Email</Form.Label>
                            <Form.Control type="email" ref={emailSRef} required />
                        </Form.Group>
                        <Form.Group as={Col} id="password">
                            <Form.Label>Sender's Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} id="emailR">
                            <Form.Label>Receiver's Email</Form.Label>
                            <Form.Control type="email" ref={emailRRef} required />
                        </Form.Group>
                        <Form.Group as={Col} id="emailC">
                            <Form.Label>CC</Form.Label>
                            <Form.Control type="email" ref={emailCRef} />
                        </Form.Group>
                    </Form.Row>
                        <Form.Group id="subject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" ref={subjectRef} required />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Type</Form.Label>
                            <Form.Control value={type} onChange={handleChange} as="select" custom>
                                <option value="recurring">Recurring</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Month</Form.Label>
                            <Form.Control disabled={disabledM} ref={monthRef} type="text" placeholder="e.g: 11 for Nov" />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Day</Form.Label>
                            <Form.Control disabled={disabledDa} ref={dayRef} type="text" placeholder="monday/friday/.." />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Date</Form.Label>
                            <Form.Control disabled={disabledD} ref={dateRef} type="text" placeholder="e.g: 24" />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Hours</Form.Label>
                            <Form.Control disabled={disabledH} ref={hoursRef} type="text" placeholder="Acc to 24hrs clock" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Minutes</Form.Label>
                            <Form.Control disabled={disabledMi} ref={minutesRef} type="text" placeholder="Enter minutes" required/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Seconds</Form.Label>
                            <Form.Control ref={secondsRef} type="text" placeholder="Enter seconds" required/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Body</Form.Label>
                        <Form.Control ref={bodyRef} as="textarea" placeholder="Note: Wrap the body with <b>your text</b> bold, <i>your text</i> for italics" rows={3} />
                    </Form.Group>
                    <Button className="w-100" type="submit">Send Mail</Button>
                </Form>
                </Card.Body>
                </Card>
                <p style={{color:"red"}}>Please follow the instructions given on the home page carefully and fill all the information needed here very carefully or the mail will not be sent.</p>
                </div>
            </div>
        </div>
    );
}