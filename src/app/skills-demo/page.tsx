'use client';

import { Skills, Skill } from '@/components/design-system/Skills/Skills';
import { Typography } from '@/components/design-system/Typography/Typography';

// Real skills from portfolio (https://github.com/DonovanGROUT/CV)
const demoSkills: Skill[] = [
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

// Category metadata with emojis (from portfolio)
const categoryMeta = {
  Frontend: { emoji: '🎨' },
  Backend: { emoji: '⚙️' },
  'Qualité & Sécurité': { emoji: '🛡️' },
  'Outils & Méthodologie': { emoji: '🔧' },
};

export default function SkillsDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Typography variant="h1" color="primary">
            Skills Component Demo
          </Typography>
          <Typography variant="body" color="muted">
            Phase 4 TDD - Design System Integration (Static Display)
          </Typography>
        </div>

        {/* Main Demo */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <Skills
            skills={demoSkills}
            title="Mes Compétences"
            categoryMeta={categoryMeta}
          />
        </section>

        {/* Empty State Demo */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <Typography variant="h3" className="mb-4 text-slate-700">
            Empty State
          </Typography>
          <Skills skills={[]} title="Aucune compétence" />
        </section>

        {/* Features */}
        <section className="bg-slate-800 text-white rounded-lg p-6">
          <Typography variant="h3" className="text-white mb-4">
            Features
          </Typography>
          <ul className="space-y-2 text-sm">
            <li>✅ Typography Design System (h2/h3/body)</li>
            <li>✅ Keyboard navigation (Tab, Enter, Space)</li>
            <li>✅ Focus ring visible (WCAG 2.1 AA)</li>
            <li>✅ Responsive grid (1→2→3→4 cols)</li>
            <li>✅ Colored left border (4px→8px on hover)</li>
            <li>✅ Category emojis + decorative line</li>
            <li>✅ Gradient background + dot indicator</li>
            <li>✅ Backdrop blur + scale hover effect</li>
            <li>✅ 22 tests, 100% coverage</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
