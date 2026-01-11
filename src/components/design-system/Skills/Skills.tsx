'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/design-system/Typography/Typography';
import { Card } from '@/components/design-system/Card/Card';
import { useInView } from '@/hooks/useInView';

/**
 * Skill interface - Simple name + category (NO level badges)
 */
export interface Skill {
  name: string;
  category: string;
}

export interface SkillsProps {
  skills: Skill[];
  title?: string;
  className?: string;
  /** Optional category metadata (emoji, color) */
  categoryMeta?: Record<string, { emoji?: string; color?: string }>;
}

/**
 * Get border color based on category name
 * Default mapping for common categories (Frontend, Backend, etc.)
 */
const getCategoryBorderColor = (
  category: string,
  customColor?: string
): string => {
  if (customColor) return customColor;

  // Default color mapping
  const colorMap: Record<string, string> = {
    Frontend: '#0ea5e9', // sky-500
    Backend: '#10b981', // emerald-500
    'Qualité & Sécurité': '#8b5cf6', // violet-500
    'Outils & Méthodologie': '#f97316', // orange-500
  };

  return colorMap[category] || '#64748b'; // slate-500 fallback
};

/**
 * Get dot gradient classes based on category
 */
const getCategoryDotGradient = (category: string): string => {
  const gradientMap: Record<string, string> = {
    Frontend: 'from-sky-500 to-sky-600',
    Backend: 'from-emerald-500 to-emerald-600',
    'Qualité & Sécurité': 'from-violet-500 to-violet-600',
    'Outils & Méthodologie': 'from-orange-500 to-orange-600',
  };

  return gradientMap[category] || 'from-slate-400 to-slate-500';
};

/**
 * SkillCategory - Single category with scroll animation
 * Uses useInView to trigger fade-in + slide-up animation
 */
interface SkillCategoryProps {
  category: string;
  skills: Skill[];
  emoji?: string | undefined;
  customColor?: string | undefined;
  index: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({
  category,
  skills,
  emoji,
  customColor,
  index,
}) => {
  const { ref, isInView } = useInView({
    threshold: 0.1,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  // Stagger delay: 100ms par catégorie (0ms, 100ms, 200ms, 300ms)
  const delay = index * 100;

  return (
    <div
      ref={ref}
      aria-label={`Compétences ${category}`}
      className={cn(
        'space-y-6 transition-all duration-700 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Category header with optional emoji and decorative line */}
      <div className="flex items-center gap-4">
        {emoji && (
          <span className="text-3xl" role="img" aria-label={emoji}>
            {emoji}
          </span>
        )}
        <Typography variant="h3" className="text-slate-700 font-semibold">
          {category}
        </Typography>
        {/* Decorative line */}
        <div
          className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Skills grid - responsive 1→2→3→4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {skills.map((skill, skillIndex) => (
          <Card
            key={`${skill.name}-${skillIndex}`}
            variant="skill-inline"
            hover
            categoryColor={getCategoryBorderColor(category, customColor)}
            aria-label={skill.name}
            className="relative group"
          >
            {/* Subtle background gradient (always visible) */}
            <div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-slate-50/80 to-white opacity-100"
              aria-hidden="true"
            />

            {/* Gradient overlay on hover */}
            <div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-sky-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10">
              <Typography
                variant="body"
                className="font-semibold text-slate-800 group-hover:text-sky-700 transition-colors duration-300"
              >
                {skill.name}
              </Typography>
            </div>

            {/* Mini dot indicator (bottom-right, category color) */}
            <div
              className={cn(
                'absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br',
                getCategoryDotGradient(category),
                'opacity-40 group-hover:opacity-100 transition-opacity duration-300'
              )}
              aria-hidden="true"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

/**
 * Skills Component - Displays skills grouped by category
 * Uses Design System Typography + enriched card styling
 * WCAG 2.1 AA compliant with keyboard navigation
 *
 * Design features:
 * - Colored left border (4px default, 8px on hover)
 * - Subtle background gradient always visible
 * - Mini dot indicator (bottom-right, category color)
 * - Scale and shadow effects on hover
 * - Backdrop blur for modern look
 * - Optional category emojis
 * - Responsive grid: 1→2→3→4 columns
 */
export const Skills: React.FC<SkillsProps> = ({
  skills,
  title = 'Compétences',
  className,
  categoryMeta = {},
}) => {
  // Group skills by category
  const groupedSkills = React.useMemo(() => {
    const groups: Record<string, Skill[]> = {};

    skills.forEach(skill => {
      const category = skill.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category]?.push(skill);
    });

    return groups;
  }, [skills]);

  const categories = Object.keys(groupedSkills);

  return (
    <section
      role="region"
      aria-label="Compétences"
      className={cn('py-8 px-4 sm:px-6 lg:px-8', className)}
    >
      <Typography variant="h2" className="mb-8 text-sky-700 font-bold">
        {title}
      </Typography>

      {skills.length === 0 ? (
        <Typography variant="body" className="text-gray-500">
          Aucune compétence à afficher
        </Typography>
      ) : (
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const meta = categoryMeta[category];
            const emoji = meta?.emoji;
            const customColor = meta?.color;

            return (
              <SkillCategory
                key={category}
                category={category}
                skills={groupedSkills[category] ?? []}
                emoji={emoji}
                customColor={customColor}
                index={categoryIndex}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Skills;
