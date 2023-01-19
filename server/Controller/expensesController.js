const db = require('../../database/kartonModel');
const expensesController = {};

expensesController.getAllExpenses = (req,res,next) => {
    console.log('getting all expenses');
    db.query('SELECT * FROM "Expenses"')
    .then((data) => {
      console.log(data.rows);
      res.locals.allExpenses = data.rows;
      return next(); 
    }).catch((err) => {
        console.log('error with getting all expenses');
    });
}

expensesController.addExpense = (req, res, next) => {
    const {cost, date, description, purchaser_id, affiliates} = req.body; 
      console.log('adding an expense!');
      console.log(req.body);
      //const selectUserString = `Select * FROM "Users" where first_name = 'Nic'`;
      const values = [cost, date, description, purchaser_id];
      const addExpenseString = `insert into "Expenses" (cost, date, description, purchaser_id) values ($1, $2, $3, $4);`;
      db.query(addExpenseString, values).then((data) => {
        console.log(data);
        db.query('SELECT id FROM "Expenses" ORDER BY ID DESC LIMIT 1').then((selectData) => {
            res.locals.expenseId = selectData.rows[0].id;
            res.locals.affiliates = affiliates; 
            return next(); 
        });
        }).catch((err) => {
            console.log('error with adding an expense');
        });
}


module.exports = expensesController;