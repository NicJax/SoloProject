const { Pool } = require('pg');

const PG_URL = 'postgres://awyppopv:z-sfp5tDE2HgfdmxcGM3FNA4kbMLbxZI@queenie.db.elephantsql.com/awyppopv';

//The schema for the pg database is as follows:
// - Users Table
// - Expenses Table 
// - Expense Affiliates Table
// Expense table has a user as a foreign key 
// Expense Affiliate Table has the expenses and table as the foreign key

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URL
});


// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};