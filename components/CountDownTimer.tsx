import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  createdAt: Date | string;
  validityMinutes?: number;
}

const CountdownTimer = ({ createdAt, validityMinutes = 20 }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<{
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    if (!createdAt) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const createdDate =
        typeof createdAt === "string" ? new Date(createdAt) : createdAt;

      if (!createdDate || isNaN(createdDate.getTime())) {
        return { minutes: 0, seconds: 0, isExpired: true };
      }

      const expiryTime = new Date(
        createdDate.getTime() + validityMinutes * 60 * 1000
      );
      const diff = expiryTime.getTime() - now.getTime();

      if (diff <= 0) {
        return { minutes: 0, seconds: 0, isExpired: true };
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return { minutes, seconds, isExpired: false };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [createdAt, validityMinutes]);

  const getTimerColor = () => {
    if (timeLeft.isExpired) return "text-destructive";
    if (timeLeft.minutes < 5) return "text-orange-500";
    return "text-muted-foreground";
  };
  //console.log('timeLeft', timeLeft);
  if (timeLeft.isExpired) {
    return (
      <div className="flex items-center gap-1 text-destructive">
        <Clock className="h-4 w-4" />
        <span className="font-mono">EXPIRED</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${getTimerColor()}`}>
      <Clock className="h-4 w-4" />
      <span className="font-mono">
        {timeLeft.minutes.toString().padStart(2, '0')}:
        {timeLeft.seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
};

export default CountdownTimer;