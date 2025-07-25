import React from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { habitStore } from '../store/habitStore';

interface AnalyticsProps {
  theme: 'light' | 'dark';
}

export const Analytics: React.FC<AnalyticsProps> = ({ theme }) => {
  const habits = habitStore.getHabits();
  const user = habitStore.getUser();

  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => {
    const today = habitStore.formatDate(new Date());
    return habit.completions[today];
  }).length;

  const avgStreak = habits.length > 0 
    ? Math.round(habits.reduce((sum, habit) => sum + habit.streak, 0) / habits.length)
    : 0;

  const totalCompletions = habits.reduce((sum, habit) => 
    sum + Object.values(habit.completions).filter(Boolean).length, 0
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-6 rounded-2xl ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Today's Progress
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {completedToday}/{totalHabits}
              </p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-4">
            <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="h-2 rounded-full bg-green-500 transition-all duration-500"
                style={{ width: totalHabits > 0 ? `${(completedToday / totalHabits) * 100}%` : '0%' }}
              />
            </div>
          </div>
        </div>
        <div className={`p-6 rounded-2xl ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Average Streak
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {avgStreak}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className={`p-6 rounded-2xl ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Completions
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {totalCompletions}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className={`p-6 rounded-2xl ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Level & Points
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {user?.level || 1}
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {user?.totalPoints || 0} points
              </p>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>
      {user && user.achievements.length > 0 && (
        <div className={`p-6 rounded-2xl ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <h3 className={`text-lg font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.achievements.slice(-4).map((achievement) => (
              <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                  <p className="text-xs text-yellow-500">+{achievement.points} points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {habits.length > 0 && (
        <div className={`p-6 rounded-2xl ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <h3 className={`text-lg font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Habit Performance
          </h3>
          <div className="space-y-4">
            {habits.map((habit) => {
              const stats = habitStore.getHabitStats(habit.id);
              return (
                <div key={habit.id} className={`flex items-center justify-between p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="p-2 rounded-lg text-white"
                      style={{ backgroundColor: habit.color }}
                    >
                      {habit.icon}
                    </div>
                    <div>
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {habit.name}
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stats?.completionRate.toFixed(0)}% success rate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {habit.streak}
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Current
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {habit.longestStreak}
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Best
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};