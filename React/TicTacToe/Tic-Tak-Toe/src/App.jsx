import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentText, setCurrentText] = useState("X");
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [hasWon, setHasWon] = useState(false);

  // function FakeTextOn(index) {
  //   console.log(`Mouse over box at index ${index}`);
  // }

  // function FakeTextOut(index) {
  //   console.log(`Mouse left box at index ${index}`);
  // }

  const clicked = (index) => {
    console.log(hasWon);
    if (board[index] == null && hasWon == false) {
      console.log("INside");
      const newBoard = [...board];
      newBoard[index] = currentText;
      setBoard(newBoard);
    }
  };

  useEffect(() => {
    checkWinner();
    changeText();
  }, [board]);

  const changeText = () => {
    setCurrentText((prevText) => (prevText === "X" ? "O" : "X"));
  };

  function checkWinner() {
    if (
      (board[0] == "X" && board[1] == "X" && board[2] == "X") ||
      (board[0] == "O" && board[1] == "O" && board[2] == "O")
    ) {
      console.log(`${currentText} Has Won !`);
      setHasWon(true);
    } else if (
      (board[3] == "X" && board[4] == "X" && board[5] == "X") ||
      (board[3] == "O" && board[4] == "O" && board[5] == "O")
    ) {
      console.log(`${currentText} Has Won !`);
      setHasWon(true);
    } else if (
      (board[6] == "X" && board[7] == "X" && board[8] == "X") ||
      (board[6] == "O" && board[7] == "O" && board[8] == "O")
    ) {
      console.log(`${currentText} Has Won !`);
      setHasWon(true);
    } else if (
      (board[0] == "X" && board[3] == "X" && board[6] == "X") ||
      (board[0] == "O" && board[3] == "O" && board[6] == "O")
    ) {
      console.log(`${currentText} Has Won !`);
      setHasWon(true);
    } else if (
      (board[1] == "X" && board[4] == "X" && board[7] == "X") ||
      (board[1] == "O" && board[4] == "O" && board[7] == "O")
    ) {
      console.log(`${currentText} Has Won !`);
      setHasWon(true);
    } else if (
      (board[2] == "X" && board[5] == "X" && board[8] == "X") ||
      (board[2] == "O" && board[5] == "O" && board[8] == "O")
    ) {
      console.log(`${currentText} Has Won !`);
      setHasWon(true);
    } else if (
      (board[0] == "X" && board[4] == "X" && board[8] == "X") ||
      (board[0] == "O" && board[4] == "O" && board[8] == "O")
    ) {
      console.log(`${currentText} Has Won !`);
      setHasWon(true);
    } else if (
      (board[2] == "X" && board[4] == "X" && board[6] == "X") ||
      (board[2] == "O" && board[4] == "O" && board[6] == "O")
    ) {
      console.log(`${currentText} Has Won !`);
      setHasWon(true);
    }
  }

  const renderBox = (index) => {
    const boxColour = getBoxColour(index);
    return (
      <div
        key={index}
        className={`box pl-6 pt-3 h-20 w-20 ${boxColour}`}
        onClick={() => clicked(index)}
      >
        {board[index]}
      </div>
    );
  };

  const getBoxColour = (index) => {
    const colours = [
      "bg-blue-500",
      "bg-green-400",
      "bg-red-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];

    return colours[index];
  };

  return (
    <>
      <div className="container h-screen w-full flex flex-col">
        <h1 className="fixed text-6xl text-center text-white pt-5 whitespace-nowrap transfrom -translate-x-1/2">
          Tic Tac Toe
        </h1>

        <div className="fixed grid grid-cols-3 grid-rows-3 bg-white w-max mt-40 self-center text-white text-5xl">
          {initialBoard.map((_, index) => renderBox(index))}
        </div>
      </div>
    </>
  );
}

export default App;
// onMouseOver={() => FakeTextOn(index)}
// onMouseOut={() => FakeTextOut(index)}
