import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Skills } from './Skills';

// Test data
const mockSkills = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'Docker', category: 'DevOps' },
];

describe('Skills', () => {
  // ===========================================
  // 1. MINIMAL RENDER
  // ===========================================
  describe('Minimal Render', () => {
    it('renders without crashing', () => {
      render(<Skills skills={mockSkills} />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('renders section title', () => {
      render(<Skills skills={mockSkills} title="Compétences" />);
      expect(
        screen.getByRole('heading', { level: 2, name: 'Compétences' })
      ).toBeInTheDocument();
    });

    it('renders all skills', () => {
      render(<Skills skills={mockSkills} />);
      mockSkills.forEach(skill => {
        expect(screen.getByText(skill.name)).toBeInTheDocument();
      });
    });

    it('renders empty state when no skills', () => {
      render(<Skills skills={[]} />);
      expect(screen.getByText(/aucune compétence/i)).toBeInTheDocument();
    });
  });

  // ===========================================
  // 2. PROPS & CATEGORIES
  // ===========================================
  describe('Props & Categories', () => {
    it('groups skills by category', () => {
      render(<Skills skills={mockSkills} />);

      // Should have category headings
      expect(
        screen.getByRole('heading', { level: 3, name: 'Frontend' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: 'Backend' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: 'DevOps' })
      ).toBeInTheDocument();
    });

    it('displays correct number of skills per category', () => {
      render(<Skills skills={mockSkills} />);

      // Frontend should have 2 skills
      const frontendSection = screen.getByLabelText(/compétences frontend/i);
      expect(within(frontendSection).getByText('React')).toBeInTheDocument();
      expect(
        within(frontendSection).getByText('TypeScript')
      ).toBeInTheDocument();

      // Backend should have 2 skills
      const backendSection = screen.getByLabelText(/compétences backend/i);
      expect(within(backendSection).getByText('Node.js')).toBeInTheDocument();
      expect(
        within(backendSection).getByText('PostgreSQL')
      ).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      render(<Skills skills={mockSkills} className="custom-class" />);
      expect(screen.getByRole('region')).toHaveClass('custom-class');
    });

    it('calls onSkillClick when skill is clicked', async () => {
      const handleClick = vi.fn();
      render(<Skills skills={mockSkills} onSkillClick={handleClick} />);

      await userEvent.click(screen.getByText('React'));
      expect(handleClick).toHaveBeenCalledWith(mockSkills[0]);
    });
  });

  // ===========================================
  // 3. ACCESSIBILITY - ARIA
  // ===========================================
  describe('Accessibility - ARIA', () => {
    it('has correct region role and aria-label', () => {
      render(<Skills skills={mockSkills} />);
      const section = screen.getByRole('region');
      expect(section).toHaveAttribute(
        'aria-label',
        expect.stringMatching(/compétences|skills/i)
      );
    });

    it('has correct heading hierarchy (h2 > h3)', () => {
      render(<Skills skills={mockSkills} title="Compétences" />);

      // Main title should be h2
      const mainTitle = screen.getByRole('heading', { level: 2 });
      expect(mainTitle).toHaveTextContent('Compétences');

      // Category titles should be h3
      const categoryTitles = screen.getAllByRole('heading', { level: 3 });
      expect(categoryTitles.length).toBeGreaterThanOrEqual(3);
    });

    it('each category group has aria-label', () => {
      render(<Skills skills={mockSkills} />);

      expect(
        screen.getByLabelText(/compétences frontend/i)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/compétences backend/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/compétences devops/i)).toBeInTheDocument();
    });

    it('skill items have accessible names', () => {
      render(<Skills skills={mockSkills} />);

      mockSkills.forEach(skill => {
        const skillElement = screen
          .getByText(skill.name)
          .closest('button, [role="button"]');
        expect(skillElement).toHaveAccessibleName(skill.name);
      });
    });
  });

  // ===========================================
  // 4. KEYBOARD NAVIGATION
  // ===========================================
  describe('Keyboard Navigation', () => {
    it('all skill items are focusable with Tab', async () => {
      render(<Skills skills={mockSkills} />);

      // All skills should be focusable
      const skillButtons = screen.getAllByRole('button');
      skillButtons.forEach(button => {
        expect(button).not.toHaveAttribute('tabIndex', '-1');
      });
    });

    it('has visible focus ring on focus', () => {
      render(<Skills skills={mockSkills} />);

      const skillButtons = screen.getAllByRole('button');
      skillButtons.forEach(button => {
        expect(button).toHaveClass('focus:ring-2');
      });
    });

    it('triggers click on Enter key', async () => {
      const handleClick = vi.fn();
      render(<Skills skills={mockSkills} onSkillClick={handleClick} />);

      const firstSkill = screen.getByText('React').closest('button');
      expect(firstSkill).toBeInTheDocument();
      firstSkill?.focus();
      await userEvent.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledWith(mockSkills[0]);
    });

    it('triggers click on Space key', async () => {
      const handleClick = vi.fn();
      render(<Skills skills={mockSkills} onSkillClick={handleClick} />);

      const firstSkill = screen.getByText('React').closest('button');
      expect(firstSkill).toBeInTheDocument();
      firstSkill?.focus();
      await userEvent.keyboard(' ');

      expect(handleClick).toHaveBeenCalledWith(mockSkills[0]);
    });

    it('can Tab through all skills sequentially', async () => {
      render(<Skills skills={mockSkills} />);

      const skillButtons = screen.getAllByRole('button');

      // Tab to first skill
      await userEvent.tab();
      expect(skillButtons[0]).toHaveFocus();

      // Tab to second skill
      await userEvent.tab();
      expect(skillButtons[1]).toHaveFocus();
    });
  });

  // ===========================================
  // 5. RESPONSIVE DESIGN
  // ===========================================
  describe('Responsive Design', () => {
    it('uses responsive grid classes', () => {
      render(<Skills skills={mockSkills} />);

      // Should have responsive grid for skill items
      const grids = document.querySelectorAll('[class*="grid"]');
      expect(grids.length).toBeGreaterThan(0);

      // Check for responsive breakpoints
      const hasResponsiveGrid = Array.from(grids).some(
        grid =>
          grid.className.includes('md:grid-cols') ||
          grid.className.includes('lg:grid-cols')
      );
      expect(hasResponsiveGrid).toBe(true);
    });

    it('has mobile-first padding', () => {
      render(<Skills skills={mockSkills} />);
      const section = screen.getByRole('region');

      // Should have base padding and responsive variants
      expect(section.className).toMatch(/p[xy]?-\d/);
    });
  });

  // ===========================================
  // 6. DESIGN SYSTEM INTEGRATION
  // ===========================================
  describe('Design System Integration', () => {
    it('uses Card component for skills', () => {
      render(<Skills skills={mockSkills} />);

      // Skills should be wrapped in Card-like elements with proper styling
      const skillButtons = screen.getAllByRole('button');
      skillButtons.forEach(button => {
        // Should have Card-like styling (rounded, shadow, etc.)
        expect(button.className).toMatch(/rounded|shadow|border/);
      });
    });

    it('uses Typography for headings (not raw HTML)', () => {
      render(<Skills skills={mockSkills} title="Compétences" />);

      // Main title should have Typography styling
      const mainTitle = screen.getByRole('heading', { level: 2 });
      expect(mainTitle.className).toMatch(/text-\d+xl|font-bold|font-semibold/);

      // Category titles should have Typography styling
      const categoryTitles = screen.getAllByRole('heading', { level: 3 });
      categoryTitles.forEach(title => {
        expect(title.className).toMatch(/text-\d*xl|font-/);
      });
    });

    it('does NOT render level badges or progress bars', () => {
      render(<Skills skills={mockSkills} />);

      // Should NOT have any level indicators
      expect(
        screen.queryByText(/beginner|intermediate|advanced|expert/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.queryByText(/★|⭐/)).not.toBeInTheDocument();
    });
  });
});
