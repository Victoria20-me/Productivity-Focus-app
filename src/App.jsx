import { useState, useEffect } from "react";
import TimerCard from "./components/TimeCard";
import TaskList from "./components/TaskList";
import FocusTracker from "./components/FocusTracker";
import AnalyticsCard from "./components/AnalyticsCard";
import StatsCard from "./components/StatsCard";
import AISideBar from "./components/AISideBar";

export default function Home() {
  const [analyticsData, setAnalyticsData] = useState([
    {
      name: "Start",
      focusScore: 100,
      completedTasks: 0,
    },
  ]);
  const updateAnalytics = (completedTasks, focusScore) => {
    setAnalyticsData((prev) => [
      ...prev,
      {
        name: `Session ${prev.length}`,
        focusScore,
        completedTasks,
      },
    ]);
  };
  const [focusScore, setFocusScore] = useState(100);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [focusSessions, setFocusSessions] = useState(() => {
    try {
      const saved = localStorage.getItem("focusSessions");
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [streak, setStreak] = useState(() => {
    try {
      const savedStreak = localStorage.getItem("streak");
      return savedStreak ? JSON.parse(savedStreak) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem("focusSessions", JSON.stringify(focusSessions));
  }, [focusSessions]);

  useEffect(() => {
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [streak]);
  return (
    <div className="relative overflow-x-hidden scroll-smooth bg-linear-to-br from-[#0f172a] via-[#111827] to-[#1e3a8a] animated-gradient text-white flex min-h-screen">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-6">Focus Studio</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TimerCard
              setFocusSessions={setFocusSessions}
              setStreak={setStreak}
            />
            <AnalyticsCard analyticsData={analyticsData} />
            <TaskList
              setCompletedTasks={setCompletedTasks}
              updateAnalytics={updateAnalytics}
              completedTasks={completedTasks}
              focusScore={focusScore}
            />
            <FocusTracker
              focusScore={focusScore}
              setFocusScore={setFocusScore}
              updateAnalytics={updateAnalytics}
              completedTasks={completedTasks}
            />
            <p>Focus Sessions:{focusSessions}</p>
            <p>🔥 streak:{streak}</p>
          </div>
          {/* <StatsCard focusSessions={focusSessions} streak={streak} /> */}
          <div className="md:row-span-2">
            <AISideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
