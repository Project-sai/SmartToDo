import { useState, useEffect } from 'react';

const CountdownTimer = ({ deadline, isCompleted }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const difference = deadlineDate - now;

    if (difference <= 0) {
      return { overdue: true, days: 0, hours: 0, minutes: 0 };
    }

    return {
      overdue: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); 

    return () => clearInterval(timer);
  }, [deadline, isCompleted]);

  if (isCompleted) {
    return (
      <span className="badge badge-success">
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Completed
      </span>
    );
  }

  if (timeLeft.overdue) {
    return (
      <span className="badge badge-danger">
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Overdue
      </span>
    );
  }

  return (
    <span className="badge badge-info">
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Due in {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}
      {timeLeft.hours}h {timeLeft.minutes}m
    </span>
  );
};

export default CountdownTimer;