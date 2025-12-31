import { Skill } from '@/components/design-system/Skills/Skills';

/**
 * Portfolio Skills Data
 * Real skills from Donovan GROUT's professional experience
 * Source: https://github.com/DonovanGROUT/CV
 */

export const portfolioSkills: Skill[] = [
  // Frontend
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'API RESTful', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'MySQL', category: 'Backend' },
  { name: 'PHP', category: 'Backend' },
  // Quality & Security
  { name: 'Accessibilité (WCAG)', category: 'Qualité & Sécurité' },
  { name: 'Sécurité web', category: 'Qualité & Sécurité' },
  { name: 'Performance', category: 'Qualité & Sécurité' },
  { name: 'Eco-design', category: 'Qualité & Sécurité' },
  // Tools & Methodology
  { name: 'Git / GitHub', category: 'Outils & Méthodologie' },
  { name: 'Docker', category: 'Outils & Méthodologie' },
  { name: 'GitHub Actions', category: 'Outils & Méthodologie' },
  { name: 'TDD', category: 'Outils & Méthodologie' },
  { name: 'CI/CD', category: 'Outils & Méthodologie' },
];

/**
 * Category metadata with emojis for visual categorization
 */
export const categoryMeta = {
  Frontend: { emoji: '🎨' },
  Backend: { emoji: '⚙️' },
  'Qualité & Sécurité': { emoji: '🛡️' },
  'Outils & Méthodologie': { emoji: '🔧' },
};
