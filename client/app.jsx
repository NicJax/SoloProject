import React, { Component, useEffect, useState, useReducer } from 'react';
import { render } from 'react-dom';
// import { render, ReactDOM } from 'react-dom';
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

render(<Board />, document.querySelector('#root'));
