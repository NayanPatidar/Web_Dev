import { useEffect } from "react";

function useInterval(p, delay) {
  useEffect(() => {
    setInterval(() => {
      p();
    }, delay);
  }, []);
}

export default useInterval;
