/**
 * Badge System
 * 
 * Defines achievement badges that students can earn through learning activities
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji
  category: 'milestone' | 'streak' | 'mastery' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const BADGES: Record<string, Badge> = {
  // Milestone Badges
  first_submission: {
    id: 'first_submission',
    name: 'First Steps',
    description: 'Submit your first code exercise',
    icon: '🎯',
    category: 'milestone',
    rarity: 'common',
  },
  ten_submissions: {
    id: 'ten_submissions',
    name: 'Code Warrior',
    description: 'Submit 10 code exercises',
    icon: '⚔️',
    category: 'milestone',
    rarity: 'rare',
  },
  twenty_five_submissions: {
    id: 'twenty_five_submissions',
    name: 'Code Master',
    description: 'Submit 25 code exercises',
    icon: '👑',
    category: 'milestone',
    rarity: 'epic',
  },

  // Chapter Completion Badges
  chapter_9_complete: {
    id: 'chapter_9_complete',
    name: 'Array Expert',
    description: 'Complete all sections in Chapter 9: Arrays',
    icon: '📊',
    category: 'mastery',
    rarity: 'rare',
  },
  chapter_10_complete: {
    id: 'chapter_10_complete',
    name: 'Encapsulation Pro',
    description: 'Complete all sections in Chapter 10: Encapsulation',
    icon: '🔒',
    category: 'mastery',
    rarity: 'rare',
  },
  chapter_11_complete: {
    id: 'chapter_11_complete',
    name: 'ArrayList Guru',
    description: 'Complete all sections in Chapter 11: ArrayList',
    icon: '📋',
    category: 'mastery',
    rarity: 'rare',
  },

  // Perfect Score Badges
  first_perfect_score: {
    id: 'first_perfect_score',
    name: 'Perfectionist',
    description: 'Get 100% score on your first auto-graded exercise',
    icon: '💯',
    category: 'mastery',
    rarity: 'rare',
  },
  five_perfect_scores: {
    id: 'five_perfect_scores',
    name: 'Flawless Coder',
    description: 'Get 100% score on 5 different exercises',
    icon: '✨',
    category: 'mastery',
    rarity: 'epic',
  },

  // Special Badges
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'One of the first 100 students to join the platform',
    icon: '🐦',
    category: 'special',
    rarity: 'legendary',
  },
  three_chapter_master: {
    id: 'three_chapter_master',
    name: 'Triple Threat',
    description: 'Complete all three chapters (9, 10, 11)',
    icon: '🏆',
    category: 'mastery',
    rarity: 'legendary',
  },
};

/**
 * Badge checking logic
 */
export interface BadgeCheckContext {
  userId: number;
  totalSubmissions: number;
  completedSections: {
    chapter9: number;
    chapter10: number;
    chapter11: number;
  };
  perfectScores: number;
  earnedBadges: string[];
}

export function checkEarnedBadges(context: BadgeCheckContext): string[] {
  const newBadges: string[] = [];

  // Milestone badges
  if (context.totalSubmissions >= 1 && !context.earnedBadges.includes('first_submission')) {
    newBadges.push('first_submission');
  }
  if (context.totalSubmissions >= 10 && !context.earnedBadges.includes('ten_submissions')) {
    newBadges.push('ten_submissions');
  }
  if (context.totalSubmissions >= 25 && !context.earnedBadges.includes('twenty_five_submissions')) {
    newBadges.push('twenty_five_submissions');
  }

  // Chapter completion badges
  if (context.completedSections.chapter9 >= 3 && !context.earnedBadges.includes('chapter_9_complete')) {
    newBadges.push('chapter_9_complete');
  }
  if (context.completedSections.chapter10 >= 6 && !context.earnedBadges.includes('chapter_10_complete')) {
    newBadges.push('chapter_10_complete');
  }
  if (context.completedSections.chapter11 >= 2 && !context.earnedBadges.includes('chapter_11_complete')) {
    newBadges.push('chapter_11_complete');
  }

  // Perfect score badges
  if (context.perfectScores >= 1 && !context.earnedBadges.includes('first_perfect_score')) {
    newBadges.push('first_perfect_score');
  }
  if (context.perfectScores >= 5 && !context.earnedBadges.includes('five_perfect_scores')) {
    newBadges.push('five_perfect_scores');
  }

  // Triple threat badge
  const hasAllChapters = 
    context.earnedBadges.includes('chapter_9_complete') &&
    context.earnedBadges.includes('chapter_10_complete') &&
    context.earnedBadges.includes('chapter_11_complete');
  
  if (hasAllChapters && !context.earnedBadges.includes('three_chapter_master')) {
    newBadges.push('three_chapter_master');
  }

  return newBadges;
}

/**
 * Get rarity color for UI
 */
export function getRarityColor(rarity: Badge['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'text-gray-500';
    case 'rare':
      return 'text-blue-500';
    case 'epic':
      return 'text-purple-500';
    case 'legendary':
      return 'text-yellow-500';
  }
}
