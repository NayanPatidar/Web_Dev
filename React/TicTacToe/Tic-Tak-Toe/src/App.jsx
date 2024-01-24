import "./App.css";

function App() {

  let currentText = 'X'

  let boxes = document.querySelectorAll(".box");
  
  boxes.forEach((box) => {
    console.log(box);
  })

  return (
    <>
      <div className="container h-screen w-full flex flex-col">
        <h1 className="fixed text-6xl text-center text-white pt-5 whitespace-nowrap transfrom -translate-x-1/2">
          Tic Tac Toe
        </h1>

        <div className="fixed grid grid-cols-3 grid-rows-3 bg-white w-max mt-40 self-center text-white text-5xl">
          {/* Row 1 */}

          <div className="box bg-blue-500  pl-6 pt-3 h-20 w-20"></div>
          <div className="box bg-green-400 pl-6 pt-3 h-20 w-20"></div>
          <div className="box bg-red-500   pl-6 pt-3 h-20 w-20"></div>

          {/* Row 2 */}

          <div className="box bg-yellow-500 pl-6 pt-3 h-20 w-20"></div>
          <div className="box bg-pink-500   pl-6 pt-3 h-20 w-20"></div>
          <div className="box bg-purple-500 pl-6 pt-3 h-20 w-20"></div>

          {/* Row 3 */}

          <div className="box bg-orange-500 pl-6 pt-3 h-20 w-20"></div>
          <div className="box bg-indigo-500 pl-6 pt-3 h-20 w-20"></div>
          <div className="box bg-teal-500   pl-6 pt-3 h-20 w-20"></div>
        </div>
      </div>
    </>
  );
}

export default App;
