import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, Calendar } from 'lucide-react';
import { Header } from './components/Header';
import { HabitCard } from './components/HabitCard';
import { HabitForm } from './components/HabitForm';
import { Analytics } from './components/Analytics';
import { EmptyState } from './components/EmptyState';
import { habitStore } from './store/habitStore';
import { Habit } from './types';

type View = 'habits' | 'analytics';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentView, setCurrentView] = useState<View>('habits');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  useEffect(() => {
    const user = habitStore.getUser();
    if (user) {
      setTheme(user.theme);
    }
    setHabits(habitStore.getHabits());
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    habitStore.toggleTheme();
    const user = habitStore.getUser();
    if (user) {
      setTheme(user.theme);
    }
  };

  const handleCreateHabit = () => {
    setEditingHabit(null);
    setIsFormOpen(true);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingHabit(null);
    setHabits(habitStore.getHabits());
  };

  return (
    <div className={`min-h-screen transition-colors ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentView('habits')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'habits'
                  ? 'bg-purple-500 text-white'
                  : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>My Habits</span>
            </button>
            <button
              onClick={() => setCurrentView('analytics')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'analytics'
                  ? 'bg-purple-500 text-white'
                  : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </button>
          </div>
          {currentView === 'habits' && (
            <button
              onClick={handleCreateHabit}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="h-4 w-4" />
              <span>New Habit</span>
            </button>
          )}
        </div>
        {currentView === 'habits' ? (
          habits.length === 0 ? (
            <EmptyState theme={theme} onCreateHabit={handleCreateHabit} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  theme={theme}
                  onEdit={handleEditHabit}
                />
              ))}
            </div>
          )
        ) : (
          <Analytics theme={theme} />
        )}
      </div>
      <HabitForm
        habit={editingHabit}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        theme={theme}
      />
    </div>
  );
}
export default App;