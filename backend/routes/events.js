var express = require('express');
var router = express.Router();
var {Event} = require('../models/Event')
var {User} = require('../models/User')
var moment = require('moment');
const { log } = require('debug');
var nodemailer = require('nodemailer');
let cron = require('node-cron');

router.get('/', function(req, res, next) {
    //console.log(req.query.uid);
    User.find({'uid': req.query.uid }, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser.length){
                res.send(foundUser[0].events)
            }
            else console.log("No one found");
        }
    });
});

router.get('/sent', function(req, res, next) {
    //console.log(req.query.uid);
    User.find({'uid': req.query.uid }, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser.length){
                res.send(foundUser[0].history)
            }
            else console.log("No one found");
        }
    });
});

router.post('/', function(req,res)
{

    try
    {
        console.log(moment().format('HH:mm'));
        console.log(req.body);
        var {
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
        } = req.body;

        const event = new Event ({
            uid: uid,
            from: from,
            fromPass: fromPass,
            to: to,
            cc: cc,
            subject: subject,
            month: month,
            weekday: weekday,
            date: date,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            type: type,
            body: body,
            flag: false
        });

        User.find({'uid': uid }, function(err, foundUser){
            if(err){
                console.log(err);
            }
            else{
                if(foundUser.length){
                    foundUser[0].events.push(event);
                    foundUser[0].save();
                }
                else console.log("No one found");
            }
        });

        event.save();

        var mailOptions = {
            from: from,
            to: to,
            cc: cc,
            subject: subject,
            html: `<p>${body}</p>`
        };

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: from,
                pass: fromPass
            }
        });

        var cronString = "";
        var mon= month;
        var day= weekday;
        var d = date;
        var h = hours;
        var min = minutes;
        var s = seconds;

        if(mon === "") mon = "*"
        if(day === "") day = "*";
        if(d === "") d = "*";
        if(h === "") h = "*";
        if(min === "") min = "*";
        if(s === "") s = "*";

        cronString = `${s} ${min} ${h} ${d} ${mon} ${day}`;


        console.log(cronString);

        cron.schedule(cronString, () => {
            // Send e-mail
            console.log("Working");
            transporter.sendMail(mailOptions, function(error, info){
                var err = "";
                if (error) {
                    console.log(error);
                    err=error.message;
                } else {
                    err="Email Sent!"
                    const hist = new Event ({
                        uid: uid,
                        from: from,
                        to: to,
                        cc: cc,
                        subject: subject,
                        month: month,
                        weekday: weekday,
                        date: date,
                        hours: hours,
                        minutes: minutes,
                        seconds: seconds,
                        type: type,
                        body: body,
                        flag: true,
                        error: err
                    });

                    User.find({'uid': uid }, function(err, foundUser){
                        if(err){
                            console.log(err);
                        }
                        else{
                            if(foundUser.length){
                                foundUser[0].history.push(hist);
                                foundUser[0].save();
                            }
                            else console.log("No one found");
                        }
                    });

                    console.log('Email sent: ' + info.response);
                }
            });
        });

        return res.sendStatus(200);
    }

    catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
    
})

module.exports = router;