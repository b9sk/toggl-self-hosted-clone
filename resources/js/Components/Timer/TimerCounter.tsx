import React, { useState, useEffect } from "react";

const TimerCounter = ({ isActive = false, offsetInSeconds = 0, headTitle = "" }) => {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [counter, setCounter] = useState(offsetInSeconds);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (isActive) {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      setCounter(0);
      setHour("0");
      setMinute("00");
      setSecond("00");
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  useEffect(() => {
    const secondCounter = counter % 60;
    const minuteCounter = Math.floor((counter / 60) % 60);
    const hourCounter = Math.floor(counter / 3600);

    const computedSecond =
      String(secondCounter).length === 1 ? `0${secondCounter}` : String(secondCounter);
    const computedMinute =
      String(minuteCounter).length === 1 ? `0${minuteCounter}` : String(minuteCounter);
    const computedHour = String(hourCounter);

    setSecond(computedSecond);
    setMinute(computedMinute);
    setHour(computedHour);
  }, [counter]);

    // update document title
    useEffect(() => {
        document.title = `${hour}:${minute}:${second} ${headTitle}`;
    }, [counter]);

  return (
    <>
      {hour}:{minute}:{second}
    </>
  );
};

export default TimerCounter;

