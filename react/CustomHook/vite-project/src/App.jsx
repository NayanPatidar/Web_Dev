import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useInterval from "./Hooks/useInterval";

function App() {
  const [count, setCount] = useState(0);

  useInterval(() => setCount((c) => c + 1), 1000);

  return <div>Times is {count}</div>;
}

export default App;
