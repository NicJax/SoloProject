const express = require('express');
const path = require('path');
const db = require('../database/kartonModel');
const userRouter = require('./routes/userRouter.js');
const expenseRouter = require('./routes/expenseRouter.js');

const karton = express();

karton.use(express.json());

// const addUser = `insert into "Users" (first_name, last_name) values ('Rachael', 'Palmer')`;
// db.query(addUser);

// db.query('SELECT * FROM "Users"').then((data) => {
//   console.log(data);
// });

// db.query('SELECT * FROM "Expense Affiliates"').then((data) => {
//   console.log(data);
// });

karton.use('/user', userRouter);
karton.use('/expense', expenseRouter); 

//const userRouter = require('./routes/api.js');

karton.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.resolve(__dirname, '../client/app.jsx'));
  });

karton.use((req, res) => {
    //global error handler
    const err = {
      log: 'Unknown page',
      status: 404,
      message: { err: 'Incorrect route' }, 
    }
    console.error(err)
    res.status(404).end(err)
  });



karton.listen(3000); // listens on port 3000 -> http://localhost:3000/
