const express = require('express');
const path = require('path');
const db = require('../../database/kartonModel');
const usersController = require('../Controller/usersController');

const router = express.Router();

router.get('/s', usersController.getUsers, (req, res) => {
  //gets all users and sends them back
  console.log('end getting users');
  res.status(200).send(res.locals.allUsers);
});

router.post('/add', usersController.addUser, (req, res) => {
  //adding a user to the user table in karton DB
  console.log('ending adding user');
  res.status(200).send(res.locals.newUser);
});

module.exports = router;

// database/kartonModel.js\
// /Users/nic/Code/codesmith/SoloProject/database/kartonModel.js
// /Users/nic/Code/codesmith/SoloProject/server/routes/userRouter.js
