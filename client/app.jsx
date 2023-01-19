import React, { Component, useEffect, useState, useReducer } from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
// import { render, ReactDOM } from 'react-dom';

//-------------------------------------------
const initialKartonState = {
  users: [{ id: 1, first_name: 'test', last_name: 'user' }],
  expenses: [],
  reMount: true,
};

// function retrieveUsers () {
//     fetch
// }

function kartonReducer(state, action) {
  switch (action.type) {
    case 'updatingUsers':
      console.log('updating the users!');
      const newState = { ...state, reMount: false, users: action.payload };
      console.log('this is the new state', newState);
      return newState;
    case 'updateExpenses':
      console.log('updating the expenses');
      console.log( action.payload);
      console.log(('expense payload is'));
      return { ...state, reMount: false, expenses: action.payload };
    default:
      throw new Error('Action is not defined');
  }
}

function UserExpenseBody() {
  const [kartonState, updateKarton] = useReducer(
    kartonReducer,
    initialKartonState
  );

  const fetchUserData = () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
    };
    const url = new URL('http://localhost:3000/user/s');
    return fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'okay');
        return updateKarton({ type: 'updatingUsers', payload: data });
      })
      .catch((err) => {
        console.log('error in fetching users');
      });
  };

  const fetchExpenseData = () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
    };
    const url = new URL('http://localhost:3000/expense/s');
    return fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'okay');
        return updateKarton({ type: 'updateExpenses', payload: data });
      })
      .catch((err) => {
        console.log('error in fetching expenses');
      });
  };

  useEffect(() => {
    console.log('updated karton render');
    if (kartonState.reMount) {
        fetchExpenseData();
        fetchUserData();
        console.log(kartonState);
    }
  });
  console.log(kartonState);
  return (
    <div id='addUserField'>

      <form action='http://localhost:3000/user/add' method='POST'>
        <div>
          <label for='say'>First Name:</label>
          <input name='first_name' id='say' value='' />
        </div>
        <div>
          <label for='to'>Last Name:</label>
          <input name='last_name' id='to' value='' />
        </div>
        <div>
          <button>Add a user</button>
        </div>
      </form>

      {kartonState.users.map((user, i) => (
        <User
          key={kartonState.users[i].id}
          id={kartonState.users[i].id}
          firstName={kartonState.users[i].first_name}
          lastName={kartonState.users[i].last_name}
        />
      ))}

        <div id = 'addExpensesField'>
            <h2 style={{color: "red"}}>Expenses</h2>
        </div>

        {kartonState.expenses.map((expense, i) => (
        <Expense
          key={kartonState.expenses[i].id}
          id={kartonState.expenses[i].id}
          date={kartonState.expenses[i].date}
          cost={kartonState.expenses[i].cost}
          purchaser_id ={kartonState.expenses[i].purchaser_id}
          description = {kartonState.expenses[i].description}
        />
      ))}


    </div>
  );
}
const User = (props) => {
  const { id, firstName, lastName } = props;
  return (
    <div>
      <h4 id={id}>
        {firstName} {lastName}
      </h4>
    </div>
  );
};

const Expense = (props) => {
    const { id, date, cost, description, purchaser_id } = props;
    return (
      <div>
        <h4 id={id}>
          {description} {purchaser_id} {cost} {date}
        </h4>
      </div>
    );
  };

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<UserExpenseBody />);


