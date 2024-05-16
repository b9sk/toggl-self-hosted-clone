import React, { useState, useEffect } from "react";

const TimerCounter = ({ active = false, offsetInSeconds = 0 }) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(active);
  const [counter, setCounter] = useState(offsetInSeconds);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (isActive) {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  useEffect(() => {
    const secondCounter = counter % 60;
    const minuteCounter = Math.floor(counter / 60);

    const computedSecond =
      String(secondCounter).length === 1 ? `0${secondCounter}` : String(secondCounter);
    const computedMinute =
      String(minuteCounter).length === 1 ? `0${minuteCounter}` : String(minuteCounter);

    setSecond(computedSecond);
    setMinute(computedMinute);
  }, [counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }

  return (
    <div>
      <div>
        <span>{minute}</span>
        <span>:</span>
        <span>{second}</span>
      </div>
      <div>
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={stopTimer}>Reset</button>
      </div>
    </div>
  );
};

export default TimerCounter;
