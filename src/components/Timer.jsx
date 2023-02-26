import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Start the timer
    const intervalId = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Format the time as HH:MM:SS
  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8);

  return (
    <div>
      <h1>Timer</h1>
      <p>{formattedTime}</p>
    </div>
  );
}

export default Timer;