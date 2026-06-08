import { motion } from "framer-motion";

export default function StatsCard({ focusSessions, streak, completedTasks }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="min-h-80 h-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:-translate-y-1 hover:shadow-blue-500/20 transition-all duration-300 flex flex-col"
    >
      <h2 className="text-xl font-semibold mb-6">Productivity Stats</h2>
      <div className="space-y-6 flex-1">
        <div>
          <p className="text-sm text-gray-400">Focus Sessions</p>
          <p className="text-3xl font-bold text-blue-400">{focusSessions}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Current Streak</p>
          <p className="text-3xl font-bold text-orange-400">{streak}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Tasks Completed</p>
          <p className="text-3xl font-bold text-green-400">{completedTasks}</p>
        </div>
        <div className="mt-auto pt-4">
          <button
            onClick={() => {
              localStorage.removeItem("focusSessions");
              localStorage.removeItem("streak");
              window.location.reload();
            }}
            className="border rounded-full bg-red-500 px-4 py-3 border-white/10 hover:bg-red-700 transition"
          >
            Reset Stats
          </button>
        </div>
      </div>
    </motion.div>
  );
}
 