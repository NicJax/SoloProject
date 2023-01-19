const db = require('../../database/kartonModel');

const usersController = {};

usersController.getUsers = (req, res, next) => {
  const sqlString = 'SELECT * FROM "Users"';
  console.log('getting all users');
  db.query(sqlString)
    .then((data) => {
      //console.log('helloooooo');
      console.log(data.rows);
      res.locals.allUsers = data.rows;
      return next();
    })
    .catch((err) => {
      console.log('error with getting all users');
    });
};

usersController.addUser = (req, res, next) => {
  /*adding a user to the user table in karton DB
  posted object should look like:
  {
      "firstName": "firstname",
      "lastName": "lastname",
  }
  */
  console.log('adding a user!');
  console.log(req.body);
  const values = [req.body.firstName, req.body.lastName];
  const addUserString = `insert into "Users" (first_name, last_name) values ($1, $2)`;
  db.query(addUserString, values)
    .then((data) => {
      console.log('success: user added');
      console.log(data);
      res.locals.newUser = data;
      return next();
    })
    .catch((err) => {
      console.log('error with adding a user');
    });
};



module.exports = usersController;

