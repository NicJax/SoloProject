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

expensesController.addExpense = async (req, res, next) => {
    const {cost, date, description, purchaser_id, affiliates} = req.body; 
      console.log('adding an expense!');
      console.log(req.body);
      //const selectUserString = `Select * FROM "Users" where first_name = 'Nic'`;
      const values = [cost, date, description, purchaser_id];
      const addExpenseString = `insert into "Expenses" (cost, date, description, purchaser_id) values ($1, $2, $3, $4);`;
      try {      
        const data = await db.query(addExpenseString, values);
        console.log(data);
        const selectData = await db.query('SELECT id FROM "Expenses" ORDER BY ID DESC LIMIT 1');  
        res.locals.expenseId = selectData.rows[0].id;
        res.locals.affiliates = affiliates; 
        return next(); 
      } catch (err) {
        console.log(`An error occurred when adding an expense`)
      }
}

expensesController.getAllJoins = async (req, res, next) => {
    try{
        const data = await db.query('SELECT * FROM "Expense Affiliates"')
        res.locals.joinTable = data.rows
        return next();
    } catch (err) {
        console.log('Error in retreiving data from join table')
    }
}


module.exports = expensesController;