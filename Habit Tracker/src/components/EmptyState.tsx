import React from 'react';
import { Plus, Target } from 'lucide-react';

interface EmptyStateProps {
  theme: 'light' | 'dark';
  onCreateHabit: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ theme, onCreateHabit }) => {
  return (
    <div className="text-center py-16">
      <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <Target className={`h-12 w-12 ${
          theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
        }`} />
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Ready to build better habits?
      </h3>
      <p className={`text-base mb-8 max-w-md mx-auto ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Start your journey by creating your first habit. Track your progress, build streaks, and unlock achievements!
      </p>
      <button
        onClick={onCreateHabit}
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
      >
        <Plus className="h-5 w-5" />
        <span>Create Your First Habit</span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
        <div className={`p-6 rounded-xl ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <div className="text-3xl mb-3"> 3af</div>
          <h4 className={`font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Set Goals
          </h4>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Define meaningful habits that align with your personal goals
          </p>
        </div>
        <div className={`p-6 rounded-xl ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <div className="text-3xl mb-3"> 4c8</div>
          <h4 className={`font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Track Progress
          </h4>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Monitor your daily progress and watch your streaks grow
          </p>
        </div>
        <div className={`p-6 rounded-xl ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <div className="text-3xl mb-3"> 3c6</div>
          <h4 className={`font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Earn Rewards
          </h4>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Unlock achievements and level up as you build lasting habits
          </p>
        </div>
      </div>
    </div>
  );
};