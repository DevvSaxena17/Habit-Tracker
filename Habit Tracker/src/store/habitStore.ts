import { Habit, User, Achievement, HabitCategory } from '../types';

class HabitStore {
  private habits: Habit[] = [];
  private user: User | null = null;
  private achievements: Achievement[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first habit',
      icon: '\ud83c\udfaf',
      unlockedAt: new Date(),
      points: 10
    },
    {
      id: '2',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '\ud83d\udd25',
      unlockedAt: new Date(),
      points: 50
    },
    {
      id: '3',
      name: 'Habit Master',
      description: 'Maintain a 30-day streak',
      icon: '\ud83d\udc51',
      unlockedAt: new Date(),
      points: 200
    },
    {
      id: '4',
      name: 'Variety Seeker',
      description: 'Create habits in 3 different categories',
      icon: '\ud83c\udf1f',
      unlockedAt: new Date(),
      points: 75
    }
  ];

  constructor() {
    this.loadFromStorage();
    this.initializeUser();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('habitTracker');
    if (stored) {
      const data = JSON.parse(stored);
      this.habits = data.habits || [];
      this.user = data.user || null;
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('habitTracker', JSON.stringify({
      habits: this.habits,
      user: this.user
    }));
  }

  private initializeUser(): void {
    if (!this.user) {
      this.user = {
        id: '1',
        name: 'Habit Champion',
        email: 'user@example.com',
        level: 1,
        totalPoints: 0,
        achievements: [],
        theme: 'light'
      };
      this.saveToStorage();
    }
  }

  getHabits(): Habit[] {
    return this.habits;
  }

  getUser(): User | null {
    return this.user;
  }

  addHabit(habitData: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'longestStreak' | 'completions' | 'points'>): void {
    const habit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date(),
      streak: 0,
      longestStreak: 0,
      completions: {},
      points: 0
    };
    this.habits.push(habit);
    this.checkAchievements();
    this.saveToStorage();
  }

  updateHabit(id: string, updates: Partial<Habit>): void {
    const index = this.habits.findIndex(h => h.id === id);
    if (index !== -1) {
      this.habits[index] = { ...this.habits[index], ...updates };
      this.saveToStorage();
    }
  }

  deleteHabit(id: string): void {
    this.habits = this.habits.filter(h => h.id !== id);
    this.saveToStorage();
  }

  toggleHabitCompletion(id: string, date: string): void {
    const habit = this.habits.find(h => h.id === id);
    if (habit) {
      const wasCompleted = habit.completions[date];
      habit.completions[date] = !wasCompleted;
      this.updateStreak(habit);
      if (!wasCompleted) {
        habit.points += 10;
        if (this.user) {
          this.user.totalPoints += 10;
          this.updateUserLevel();
        }
      } else {
        habit.points = Math.max(0, habit.points - 10);
        if (this.user) {
          this.user.totalPoints = Math.max(0, this.user.totalPoints - 10);
        }
      }
      this.checkAchievements();
      this.saveToStorage();
    }
  }

  private updateStreak(habit: Habit): void {
    const today = new Date();
    let currentStreak = 0;
    let tempDate = new Date(today);
    while (true) {
      const dateStr = this.formatDate(tempDate);
      if (habit.completions[dateStr]) {
        currentStreak++;
        tempDate.setDate(tempDate.getDate() - 1);
      } else {
        break;
      }
    }
    habit.streak = currentStreak;
    habit.longestStreak = Math.max(habit.longestStreak, currentStreak);
  }

  private updateUserLevel(): void {
    if (this.user) {
      const newLevel = Math.floor(this.user.totalPoints / 100) + 1;
      this.user.level = newLevel;
    }
  }

  private checkAchievements(): void {
    if (!this.user) return;
    const hasCompletions = this.habits.some(h => Object.keys(h.completions).length > 0);
    if (hasCompletions && !this.user.achievements.find(a => a.id === '1')) {
      this.unlockAchievement('1');
    }
    const hasWeekStreak = this.habits.some(h => h.streak >= 7);
    if (hasWeekStreak && !this.user.achievements.find(a => a.id === '2')) {
      this.unlockAchievement('2');
    }
    const hasMonthStreak = this.habits.some(h => h.streak >= 30);
    if (hasMonthStreak && !this.user.achievements.find(a => a.id === '3')) {
      this.unlockAchievement('3');
    }
    const categories = new Set(this.habits.map(h => h.category));
    if (categories.size >= 3 && !this.user.achievements.find(a => a.id === '4')) {
      this.unlockAchievement('4');
    }
  }

  private unlockAchievement(achievementId: string): void {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (achievement && this.user) {
      this.user.achievements.push({ ...achievement, unlockedAt: new Date() });
      this.user.totalPoints += achievement.points;
      this.updateUserLevel();
    }
  }

  toggleTheme(): void {
    if (this.user) {
      this.user.theme = this.user.theme === 'light' ? 'dark' : 'light';
      this.saveToStorage();
    }
  }

  getHabitStats(habitId: string): any {
    const habit = this.habits.find(h => h.id === habitId);
    if (!habit) return null;
    const completions = Object.values(habit.completions);
    const totalDays = completions.length;
    const completedDays = completions.filter(Boolean).length;
    return {
      completionRate: totalDays > 0 ? (completedDays / totalDays) * 100 : 0,
      totalDaysTracked: totalDays,
      currentStreak: habit.streak,
      longestStreak: habit.longestStreak,
      weeklyProgress: this.getWeeklyProgress(habit),
      monthlyProgress: this.getMonthlyProgress(habit)
    };
  }

  private getWeeklyProgress(habit: Habit): number[] {
    const progress = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = this.formatDate(date);
      progress.push(habit.completions[dateStr] ? 1 : 0);
    }
    return progress;
  }

  private getMonthlyProgress(habit: Habit): number[] {
    const progress = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = this.formatDate(date);
      progress.push(habit.completions[dateStr] ? 1 : 0);
    }
    return progress;
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

export const habitStore = new HabitStore();