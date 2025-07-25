import React, { useState } from 'react';
import { CheckCircle2, Circle, Calendar, Flame, TrendingUp, Edit3, Trash2 } from 'lucide-react';
import { Habit } from '../types';
import { habitStore } from '../store/habitStore';

interface HabitCardProps {
  habit: Habit;
  theme: 'light' | 'dark';
  onEdit: (habit: Habit) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, theme, onEdit }) => {
  const [isCompleted, setIsCompleted] = useState(() => {
    const today = habitStore.formatDate(new Date());
    return habit.completions[today] || false;
  });

  const handleToggleCompletion = () => {
    const today = habitStore.formatDate(new Date());
    habitStore.toggleHabitCompletion(habit.id, today);
    setIsCompleted(!isCompleted);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      habitStore.deleteHabit(habit.id);
      window.location.reload();
    }
  };

  const stats = habitStore.getHabitStats(habit.id);

  return (
    <div className={`relative group p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 rounded-xl text-white text-lg"
            style={{ backgroundColor: habit.color }}
          >
            {habit.icon}
          </div>
          <div>
            <h3 className={`font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {habit.name}
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {habit.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(habit)}
            className={`p-1.5 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg transition-colors text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <button
        onClick={handleToggleCompletion}
        className={`w-full flex items-center justify-center space-x-2 p-3 rounded-xl transition-all ${
          isCompleted
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : theme === 'dark'
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        {isCompleted ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
        <span className="font-medium">
          {isCompleted ? 'Completed Today!' : 'Mark as Complete'}
        </span>
      </button>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className={`text-center p-2 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <div className="flex items-center justify-center mb-1">
            <Flame className="h-4 w-4 text-orange-500" />
          </div>
          <div className={`text-sm font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {habit.streak}
          </div>
          <div className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Streak
          </div>
        </div>
        <div className={`text-center p-2 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <div className={`text-sm font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {stats?.completionRate.toFixed(0) || 0}%
          </div>
          <div className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Success
          </div>
        </div>
        <div className={`text-center p-2 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <div className="flex items-center justify-center mb-1">
            <Calendar className="h-4 w-4 text-purple-500" />
          </div>
          <div className={`text-sm font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {stats?.totalDaysTracked || 0}
          </div>
          <div className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Days
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className={`text-xs mb-2 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Last 7 days
        </div>
        <div className="flex space-x-1">
          {stats?.weeklyProgress.map((day: number, index: number) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full ${
                day ? 'bg-green-500' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};