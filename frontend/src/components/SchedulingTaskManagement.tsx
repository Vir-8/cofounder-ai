"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Custom CSS overrides for react-calendar
const calendarStyles = `
  .react-calendar {
    background-color: #1e2228;
    color: #cbd5e0;
    border: none;
    font-family: sans-serif;
    border-radius: 0.5rem;
  }
  .react-calendar__navigation button {
    color: #cbd5e0;
    font-weight: bold;
    background: none;
    border: none;
  }
  .react-calendar__tile {
    background: none;
    border-radius: 0.375rem;
  }
  .react-calendar__tile--active,
  .react-calendar__navigation button:enabled:focus {
    background: #2563eb !important;
    color: white;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__navigation button:hover {
    background: #2d3748 !important;
  }
`;

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const SchedulingTaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Respond to client emails", completed: false },
    { id: 2, text: "Draft product roadmap", completed: false },
    { id: 3, text: "Review legal documents", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const [smartAgenda, setSmartAgenda] = useState<string | null>(null);
  const [loadingAgenda, setLoadingAgenda] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [meetingSuggestion, setMeetingSuggestion] = useState<string>("");

  // Calendar change handler
  const handleDateChange = (value: any) => {
    if (!value) return;
    setSelectedDate(Array.isArray(value) ? value[0] : value);
  };

  // Update meeting suggestion based on selected date
  useEffect(() => {
    const day = selectedDate.getDay();
    if (day === 0 || day === 6) {
      setMeetingSuggestion("It's a weekend—consider scheduling a meeting on Monday.");
    } else {
      setMeetingSuggestion(`We suggest scheduling a meeting on ${selectedDate.toDateString()} at 3:00 PM.`);
    }
  }, [selectedDate]);

  // Add a new task
  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id: newId, text: newTask.trim(), completed: false }]);
    setNewTask("");
  };

  // Toggle completion
  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Simulated AI-based Smart Agenda generation
  const generateSmartAgenda = async () => {
    setLoadingAgenda(true);
    setSmartAgenda(null);
    // Simulate AI call delay
    setTimeout(() => {
      const agenda = `
Based on your tasks:
• Prioritize responding to emails first to keep clients updated.
• Schedule the team meeting for mid-day.
• Draft the product roadmap in the morning for fresh ideas.
• Review legal documents in the afternoon when you can focus.
      `.trim();
      setSmartAgenda(agenda);
      setLoadingAgenda(false);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-[#1e2228] rounded-lg shadow-lg">
      {/* Inject custom calendar styles */}
      <style>{calendarStyles}</style>

      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Scheduling & Task Management
      </h2>

      {/* Overall Grid: Top row has 2 columns, bottom row (Smart Agenda) spans full width */}
      <div className="grid gap-8">
        {/* Top row: 2 columns (Tasks on left, Calendar on right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Task Manager (Left) */}
          <div className="bg-[#131619] p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white mb-4">Your Tasks</h3>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 p-3 rounded-l bg-gray-700 text-gray-200 focus:outline-none"
              />
              <button
                onClick={handleAddTask}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-r text-white font-semibold"
              >
                Add
              </button>
            </div>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className={`text-gray-300 ${task.completed ? "line-through" : ""}`}>
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar + Meeting Suggestion (Right) */}
          <div className="bg-[#131619] p-6 rounded-lg shadow-md flex flex-col">
            <h3 className="text-2xl font-semibold text-white mb-4">Calendar</h3>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="rounded-md"
            />
            <div className="mt-6">
              <h4 className="text-2xl font-semibold text-white mb-2">
                Meeting Time Suggestion
              </h4>
              <p className="text-gray-300">{meetingSuggestion || "Checking best time..."}</p>
            </div>
          </div>
        </div>

        {/* Bottom row: Smart Agenda spanning full width */}
        <div className="bg-[#131619] p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-white">Smart Agenda</h3>
            <button
              onClick={generateSmartAgenda}
              disabled={loadingAgenda || tasks.length === 0}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-2 rounded transition-colors"
            >
              {loadingAgenda ? "Generating..." : "Generate"}
            </button>
          </div>
          {smartAgenda ? (
            <pre className="whitespace-pre-wrap text-gray-300">
              {smartAgenda}
            </pre>
          ) : (
            <p className="text-gray-400">
              Your smart agenda will appear here once generated.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulingTaskManagement;
