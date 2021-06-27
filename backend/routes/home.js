const express = require('express');
var {User} = require('../models/User')
var router = express.Router();

async function addUser(req, res){

  try{
    await User.find({ 'uid': req.body.uid }, function(err, result) {
        if (err) throw err;
        if (result.length === 1) {
          return res.send(result);
        } else {
          let { name, email, uid } = req.body;
          const user = new User({name, email, uid});
          console.log(name);
          user.save();
        }
      })
    }

  catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

router.post('/', addUser);

module.exports = router;