import React, { useState } from "react";
import "./App.css";

function App() {
  const [currentText, setCurrentText] = useState("X");
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);

  // function FakeTextOn(index) {
  //   console.log(`Mouse over box at index ${index}`);
  // }

  // function FakeTextOut(index) {
  //   console.log(`Mouse left box at index ${index}`);
  // }

  const clicked = (index) => {
    console.log(board[index]);
    if (board[index] == null) {
      const newBoard = [...board];
      newBoard[index] = currentText;
      setBoard(newBoard);
      console.log(`Mouse clicked box at index ${index}`);  
      changeText();  
    }
  };

  const changeText = () => {
    setCurrentText((prevText) => (prevText === "X" ? "O" : "X"));
    console.log(currentText);
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
