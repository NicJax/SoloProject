import React, { Component, useEffect, useState, useReducer } from 'react';
import { render } from 'react-dom';
import {createRoot} from 'react-dom/client';
// import { render, ReactDOM } from 'react-dom';


//-------------------------------------------
const initialKartonState = {
    users: [{ id: 1, first_name: 'test', last_name: 'user' }], 
}

// function retrieveUsers () {
//     fetch
// }

function kartonReducer(state, action) {
    switch (action.type) {
      case 'updatingUsers':
        console.log('updating the users!')
        return updateUsers(state);
      case 'addingUser':
        console.log('Resetting the game!');
        return startingTTT;
      default:
        throw new Error('Action is not defined');
    }
  }

  function updateUsers(state) {
    console.log('updating users');
  }

  function UserExpenseBody (){
    const [kartonState, updateKarton] = useReducer(kartonReducer, initialKartonState);

    const fetchUserData = () => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
              }, 
            method: 'GET',
            mode: 'cors'
          };
        const url = new URL("http://localhost:3000/user/s")
        return fetch(url, options)
              .then((response) => response.json())
              .then((data) => {
                 console.log(data);
                 return data
            }).catch ((err) => {
                console.log('error in fetching users')
            });
      }
    
    useEffect(() => {
        console.log('updated karton render');
      });

      return (
        <div id='addUserField'>
          <button
            id='test button'
            onClick={() => fetchUserData()}
          >
            {' '}
            Test Button{' '}
          </button>
          {kartonState.users.map((user, i) => (
            <User key={kartonState.users[i].id} id ={kartonState.users[i].id} firstName = {kartonState.users[i].first_name} lastName = {kartonState.users[i].last_name}/>
          ))}
        </div>
      );
  }
  const User = (props) => {
    const { id, firstName, lastName } = props;
    return (
      <div>
        <h4 id = {id}>{firstName} {lastName}</h4>
      </div>
    );
  };

const container = document.querySelector('#root'); 
const root = createRoot(container); 
root.render(<UserExpenseBody /> );

//--------------------------------------------
const startingTTT = {
  boardState: [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ],
  turnState: 0,
  winner: false,
  nameOfWinner: '',
};

function updatingPlayerWithCoords(prevState, x, y) {
  console.log('button clicked');

  function checkForWin(x, y, board) {
    const axes = [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
    ];
    for (const axis of axes) {
      let count = 1;
      const directions = [1, -1];
      for (let direction of directions) {
        if (board[x + axis[0] * direction] !== undefined) {
          let currentPoint =
            board[x + axis[0] * direction][y + axis[1] * direction];
          while (board[x][y] === currentPoint) {
            count += 1;
            direction *= count;
            board[x + axis[0] * direction] === undefined
              ? (currentPoint = undefined)
              : (currentPoint =
                  board[x + axis[0] * direction][y + axis[1] * direction]);
            if (count === 3) return true;
          }
        }
      }
    }
    return false;
  }

  if (!prevState.winner) {
    const newState = JSON.parse(JSON.stringify(prevState));
    if (newState.boardState[x][y] === '-') {
      newState.turnState % 2 === 0
        ? (newState.boardState[x][y] = 'X')
        : (newState.boardState[x][y] = 'O');
      newState.turnState += 1;
      newState.winner = checkForWin(x, y, newState.boardState);
      if (newState.winner) newState.nameOfWinner = newState.boardState[x][y];
    }
    return newState;
  } else {
    return prevState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'updatingGameWithCoords':
      return updatingPlayerWithCoords(state, action.x, action.y);
    case 'resetGame':
      console.log('Resetting the game!');
      return startingTTT;
    default:
      throw new Error('Action is not defined');
  }
}

function Board() {
  const [gameState, updateGame] = useReducer(reducer, startingTTT);

  useEffect(() => {
    console.log('updated render');
    if (gameState.winner) {
      console.log(
        `The winner is ${gameState.nameOfWinner} on turn ${gameState.turnState}`
      );
      alert(
        `The winner is ${gameState.nameOfWinner} on turn ${gameState.turnState}`
      );
    } else {
      gameState.turnState === 9
        ? alert("It's a tie!")
        : console.log('No winner yet...');
    }
  });

  return (
    <div id='board' key='board'>
      <button
        id='resetButton'
        onClick={() => updateGame({ type: 'resetGame' })}
      >
        {' '}
        Reset Board{' '}
      </button>
      {gameState.boardState.map((row, i) => (
        <Row key={`Row ${i}`} row={i} rowState={row} updateGame={updateGame} />
      ))}
    </div>
  );
}

const Row = (props) => {
  const { updateGame, row, rowState } = props;
  return (
    <div>
      {rowState.map((coord, i) => (
        <Button
          row={row}
          col={i}
          updateGame={updateGame}
          buttonState={coord}
          key={`Row${row}Col${i}`}
          id={`Row${row}Col${i}`}
        />
      ))}
    </div>
  );
};

const Button = (props) => {
  const { updateGame, buttonState, col, row } = props;
  return (
    <button
      onClick={() =>
        updateGame({ type: 'updatingGameWithCoords', x: row, y: col })
      }
    >{`${buttonState}`}</button>
  );
};

//render(<Board />, document.querySelector('#root'));
