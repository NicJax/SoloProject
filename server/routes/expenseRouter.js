const express = require('express');
const path = require('path');
const db = require('../../database/kartonModel');
const expensesController = require('../Controller/expensesController'); 

const router = express.Router();

router.get('/s', expensesController.getAllExpenses, (req, res) => {
    //gets all expenses and sends them back
      res.status(200).send(res.locals.allExpenses);
  });
  
  router.post('/add', (req, res) => {
      //adding a user to the user table in karton DB 
    res.status(200).send(data);
  });


module.exports = router;