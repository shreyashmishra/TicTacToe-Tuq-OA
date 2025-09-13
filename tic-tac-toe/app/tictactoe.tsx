'use client';
import { useState } from 'react';
import styles from './tictactoe.module.scss';

type Player = 'X' | 'O' | null;

// All win patterns on a 3x3 board (rows, columns, diagonals)
const WIN_LINES: [number, number, number][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
];

function calculateWinner(s: Player[]): Player {
  for (const [a, b, c] of WIN_LINES) {
    if (s[a] && s[a] === s[b] && s[a] === s[c]) {
      return s[a]; // 'X' or 'O'
    }
  }
  return null;
}

function isBoardFull(s: Player[]) {
  return s.every(Boolean);
}

function getStatus(squares: Player[], winner: Player, xIsNext: boolean): string {
  if (winner) return `Winner: ${winner}`;
  if (isBoardFull(squares)) return 'Draw';
  return xIsNext ? 'Next: X' : 'Next: O';
}

export default function TicTacToe() {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  const status = getStatus(squares, winner, xIsNext);
  const draw = !winner && isBoardFull(squares);

  function handleClick(i: number) {
    // ignores clicks on filled squares or after the game is over
    if (squares[i] || winner) {
        return;
    } 

    const next = [...squares];
    next[i] = xIsNext ? 'X' : 'O';

    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Tic Tac Toe</h1>

        {/* Game board */}
        <div className={styles.board}>
          {squares.map((value, i) => {
            const markClass =
              value === 'X' ? styles.squareX :
              value === 'O' ? styles.squareO : '';

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleClick(i)}
                className={`${styles.square} ${markClass}`}
                aria-label={`Square ${i + 1}${value ? `, ${value}` : ''}`}
                disabled={Boolean(squares[i] || winner)}
              >
                {value}
              </button>
            );
          })}
        </div>

        {/* Status/result area */}
        {winner || draw ? (
          <div className={styles.result}>
            <div
              className={`${styles.resultMessage} ${
                winner ? (winner === 'X' ? styles.squareX : styles.squareO) : ''
              }`}
            >
              {winner ? `${winner} won` : 'Draw'}
            </div>
            <button type="button" onClick={reset} className={styles.reset}>
              Reset
            </button>
          </div>
        ) : (
          <div className={styles.status}>
            <span>{status}</span>
          </div>
        )}
      </div>
    </div>
  );
}
