const db = require('../../database/kartonModel');
const expAffController = {};
//Controller file for the expense affiliates table (join table) in DB

expAffController.updateJoin = (req, res, next) => {
    for (const affiliate of res.locals.affiliates) {
     let values = [affiliate, res.locals.expenseId];
     let addExpenseString = `insert into "Expense Affiliates" (user_id, expense_id) values ($1, $2);`;
      db.query(addExpenseString, values)
    }
}

module.exports = expAffController;