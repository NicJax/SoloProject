const express = require('express');
const path = require('path');
const db = require('../database/kartonModel');
const userRouter = require('./routes/userRouter');

const karton = express();

// const addUser = `insert into "Users" (first_name, last_name) values ('Rachael', 'Palmer')`;
// db.query(addUser);

db.query('SELECT * FROM "Users"').then((data) => {
  console.log(data);
});

db.query('SELECT * FROM "Expense Affiliates"').then((data) => {
  console.log(data);
});



//const userRouter = require('./routes/api.js');

karton.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

karton.listen(3000); // listens on port 3000 -> http://localhost:3000/
