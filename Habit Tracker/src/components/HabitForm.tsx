import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Habit, HabitCategory } from '../types';
import { habitStore } from '../store/habitStore';

interface HabitFormProps {
  habit?: Habit | null;
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

const categoryOptions = [
  { value: HabitCategory.HEALTH, label: 'Health & Fitness', color: '#10b981' },
  { value: HabitCategory.PRODUCTIVITY, label: 'Productivity', color: '#3b82f6' },
  { value: HabitCategory.LEARNING, label: 'Learning', color: '#8b5cf6' },
  { value: HabitCategory.SOCIAL, label: 'Social', color: '#f59e0b' },
  { value: HabitCategory.CREATIVITY, label: 'Creativity', color: '#ef4444' },
  { value: HabitCategory.WELLNESS, label: 'Wellness', color: '#06b6d4' },
];

const iconOptions = ['💪', '📚', '🎯', '🧘', '🏃‍♂️', '💡', '🎨', '🌱', '⚡', '🔥'];

export const HabitForm: React.FC<HabitFormProps> = ({ habit, isOpen, onClose, theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: HabitCategory.HEALTH,
    color: '#10b981',
    icon: '💪',
    targetDays: [1, 2, 3, 4, 5, 6, 0] // Mon-Sun
  });

  useEffect(() => {
    if (habit) {
      setFormData({
        name: habit.name,
        description: habit.description,
        category: habit.category,
        color: habit.color,
        icon: habit.icon,
        targetDays: habit.targetDays
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: HabitCategory.HEALTH,
        color: '#10b981',
        icon: '💪',
        targetDays: [1, 2, 3, 4, 5, 6, 0]
      });
    }
  }, [habit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (habit) {
      habitStore.updateHabit(habit.id, formData);
    } else {
      habitStore.addHabit(formData);
    }
    
    onClose();
    window.location.reload();
  };

  const handleCategoryChange = (category: HabitCategory) => {
    const categoryOption = categoryOptions.find(opt => opt.value === category);
    setFormData(prev => ({
      ...prev,
      category,
      color: categoryOption?.color || '#10b981'
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-md rounded-2xl p-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {habit ? 'Edit Habit' : 'Create New Habit'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${
              theme === 'dark' 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Habit Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder="e.g., Morning Exercise"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder="Brief description of your habit"
              rows={3}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleCategoryChange(option.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    formData.category === option.value
                      ? 'text-white'
                      : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: formData.category === option.value ? option.color : undefined
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`p-3 rounded-lg text-2xl transition-all ${
                    formData.icon === icon
                      ? 'bg-purple-500'
                      : theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{habit ? 'Update' : 'Create'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};