const db = require('../../database/kartonModel');
const expAffController = {};
//Controller file for the expense affiliates table (join table) in DB

expAffController.updateJoin = async (req, res, next) => {
    try {
        for (const affiliate of res.locals.affiliates) {
            const values = [affiliate, res.locals.expenseId];
            const addExpenseString = `insert into "Expense Affiliates" (user_id, expense_id) values ($1, $2);`;
            const data = await db.query(addExpenseString, values);
           }
           return next();
    } catch (err) {
        console.log('error in updating the join table');
    }
    
}

module.exports = expAffController;