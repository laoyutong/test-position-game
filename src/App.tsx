import { useEffect, useState } from "react";

const DEFAULT_REST_TIME = 60;

const getRandom = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

const App = (): JSX.Element => {
  const [score, setScore] = useState(0);
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME);
  const [isStart, setIsStart] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const start = () => {
    setScore(0);
    setIsStart(true);
  };

  const handleScore = () => {
    setScore((pre) => pre + 1);
    setPosition({
      x: getRandom(10, 90),
      y: getRandom(10, 90),
    });
  };

  useEffect(() => {
    if (isStart && restTime >= 0) {
      setTimeout(() => {
        setRestTime((pre) => pre - 1);
      }, 1000);
    }

    if (restTime < 0) {
      setRestTime(DEFAULT_REST_TIME);
      setIsStart(false);
    }
  }, [isStart, restTime]);

  return (
    <div className="p-3 flex flex-col h-screen">
      <div className="flex justify-between">
        <div className="w-40">剩余时间：{restTime}</div>
        <div className="text-lg  font-semibold">测测你的反应力</div>
        <div className="w-40">得分：{score}</div>
      </div>
      <div className="bg-slate-400 mt-2 flex-grow flex justify-center items-center relative">
        {!isStart ? (
          <div className="cursor-pointer" onClick={start}>
            开始游戏
          </div>
        ) : (
          <div
            className="absolute rounded-full w-8 h-8 bg-red-300 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${position.y}%`, left: `${position.x}%` }}
            onClick={handleScore}
          />
        )}
      </div>
    </div>
  );
};

export default App;
