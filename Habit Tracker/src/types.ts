export interface Habit {
  id: string;
  name: string;
  description: string;
  category: HabitCategory;
  color: string;
  icon: string;
  createdAt: Date;
  targetDays: number[];
  streak: number;
  longestStreak: number;
  completions: Record<string, boolean>;
  points: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  totalPoints: number;
  achievements: Achievement[];
  theme: 'light' | 'dark';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  points: number;
}

export enum HabitCategory {
  HEALTH = 'health',
  PRODUCTIVITY = 'productivity',
  LEARNING = 'learning',
  SOCIAL = 'social',
  CREATIVITY = 'creativity',
  WELLNESS = 'wellness'
}

export interface HabitStats {
  completionRate: number;
  totalDaysTracked: number;
  currentStreak: number;
  longestStreak: number;
  weeklyProgress: number[];
  monthlyProgress: number[];
}