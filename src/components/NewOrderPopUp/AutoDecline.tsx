import  { useState, useEffect } from 'react';

const AutoDecline = () => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  const formatTime = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <p className='text-lg'>Auto decline in {formatTime(timeLeft)}</p>
  );
};

export default AutoDecline;
