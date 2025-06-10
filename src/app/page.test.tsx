import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/utils';
import Home from './page';

describe('Home Page', () => {
  it('renders the Next.js logo', () => {
    render(<Home />);

    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
  });

  it('displays the getting started text', () => {
    render(<Home />);

    const gettingStartedText = screen.getByText(/Get started by editing/i);
    expect(gettingStartedText).toBeInTheDocument();
  });

  it('shows the file path to edit', () => {
    render(<Home />);

    const filePath = screen.getByText('src/app/page.tsx');
    expect(filePath).toBeInTheDocument();
  });

  it('renders the deploy section', () => {
    render(<Home />);

    const deployButton = screen.getByRole('link', { name: /Deploy now/i });
    expect(deployButton).toBeInTheDocument();
    expect(deployButton).toHaveAttribute(
      'href',
      expect.stringContaining('vercel')
    );
  });

  it('has proper structure with main element', () => {
    render(<Home />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('flex', 'flex-col', 'gap-[32px]');
  });
});
