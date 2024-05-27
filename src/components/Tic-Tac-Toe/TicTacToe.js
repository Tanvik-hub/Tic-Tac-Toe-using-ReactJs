import './TicTacToe.css';
import React, { useRef, useState } from 'react';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

function TicTacToe() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('x'); 
  const titleRef = useRef(null);

  const initialData = ['', '', '', '', '', '', '', '', ''];
  const [data, setData] = useState(initialData);

  const toggle = (e, num) => {
    if (lock || data[num] !== '') {
      return;
    }

    if (currentPlayer === 'x') {
      e.target.innerHTML = `<img src='${cross_icon}' />`;
      data[num] = 'x';
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' />`;
      data[num] = 'o';
    }

    setCount(count + 1);
    setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x'); // Switch player
    checkWin();
  };

  const checkWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (data[a] === data[b] && data[b] === data[c] && data[a] !== '') {
        won(data[a]);
        return;
      }
    }


    if (count === 9 && !lock) { 
        setLock(true);
        titleRef.current.innerHTML = 'Draw!';
      }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === 'x') {
      titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon}>`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon}>`;
    }
  };

  const reset = () => {
    setLock(false);
    setData(initialData.slice()); 
    setCount(0);
    setCurrentPlayer('x');
    titleRef.current.innerHTML = 'Tic Tac Toe in <span>React</span>';
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>
        Tic Tac Toe Game in <span>React</span>
      </h1>
      <div className='board'>
        <div className='row1'>
          <div className='boxes' onClick={(e) => toggle(e, 0)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 1)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className='row2'>
          <div className='boxes' onClick={(e) => toggle(e, 3)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 4)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className='row3'>
          <div className='boxes' onClick={(e) => toggle(e, 6)}></div>

          <div className='boxes' onClick={(e) => toggle(e, 7)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className='reset' onClick={() => reset()}>
        Reset
      </button>
    </div>
  );
}

export default TicTacToe;
