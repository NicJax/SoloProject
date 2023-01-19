const express = require('express');
const path = require('path');
const db = require('../../database/kartonModel');

const router = express.Router();

router.get('/s', (req, res) => {
  //gets all users and sends them back
  console.log('getting all users');
  db.query('SELECT * FROM "Users"').then((data) => {
    console.log(data.rows);
    res.status(200).send(data.rows);
  });
});

router.post('/add', (req, res) => {
    //adding a user to the user table in karton DB 
    // posted object should look like: 
    // {
    //     "firstName": "Elton",
    //     "lastName": "Rego",
    // }
    
    console.log('adding a user!');
    console.log(req.body);
    const values = [req.body.firstName, req.body.lastName];
    const addUserString = `insert into "Users" (first_name, last_name) values ($1, $2)`;
    db.query(addUserString, values).then((data) => {
        console.log('success: user added'); 
        console.log(data);
        res.status(200).send(data);
    });
});

module.exports = router;

// database/kartonModel.js\
// /Users/nic/Code/codesmith/SoloProject/database/kartonModel.js
// /Users/nic/Code/codesmith/SoloProject/server/routes/userRouter.js