const express = require('express');
const path = require('path');
const db = require('../../database/kartonModel');
const kartonController =  

const router = express.Router();

router.get('/s', (req, res) => {
    //gets all expenses and sends them back
    console.log('getting all expenses');
    db.query('SELECT * FROM "Expenses"').then((data) => {
      console.log(data.rows);
      res.status(200).send(data.rows);
    });
  });
  
  router.post('/add', (req, res) => {
      //adding a user to the user table in karton DB 
      const {cost, date, description, purchaser_id, affiliates} = req.body; 
      console.log('adding an expense!');
      const selectUserString = `Select * FROM "Users" where first_name = 'Nic'`;
      db.query('SELECT * FROM "Users"').then((data) => {
        console.log(data.rows);
      });
      console.log(req.body);
      // affiliates to be an array of users who are involved in an expense
      
      const values = [cost, date, description, purchaser_id];
      const addUserString = `insert into "Expenses" (cost, date, description, purchaser_id) values ($1, $2, $3, $4)`;
      db.query(addUserString, values).then((data) => {
          console.log('success: expense added'); 
          console.log(data);
          res.status(200).send(data);
      });
  });


module.exports = router;