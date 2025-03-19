import { useState } from 'react';
import './tic-tac.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turnO, setTurnO] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const handleClick = (index) => {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = turnO ? "O" : "X";
    setBoard(newBoard);
    setTurnO(!turnO);

    checkWinner(newBoard);
  };

  const checkWinner = (newBoard) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] !== "" &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        setWinningLine(pattern); // Set the winning line
        return;
      }
    }

    // Check for draw (no winner and board is full)
    if (!newBoard.includes("") && !winner) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setTurnO(true);
    setWinner(null);
    setWinningLine([]); // Reset the winning line
  };

  return (
    <div className="app">
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      {winner && (
        <div className="msg-container">
          <p id="msg">{winner === "Draw" ? "It's a draw!" : `Congratulations, Winner is ${winner}`}</p>
          <button id="new-btn" onClick={resetGame}>New Game</button>
        </div>
      )}
      <main>
        <div className="container">
          <div className="game">
            {board.map((value, index) => (
              <button
                key={index}
                className={`box ${winningLine.includes(index) ? "highlight" : ""}`}
                onClick={() => handleClick(index)}
                disabled={value !== "" || winner}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <button id="rst-button" onClick={resetGame}>Reset Game</button>
      </main>
    </div>
  );
};

export default TicTacToe;
