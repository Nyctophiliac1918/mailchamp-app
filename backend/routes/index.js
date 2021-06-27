var express = require('express');
var router = express.Router();
let cron = require('node-cron');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello from the backend!");
  cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
  });
});

module.exports = router;
