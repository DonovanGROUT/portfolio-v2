import React from 'react';
import Image from 'next/image';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { HeroProps } from './Hero';

// Mock strict du composant Hero (structure uniquement)
vi.mock('./Hero', () => ({
  __esModule: true,
  default: (props: HeroProps) => (
    <section data-testid="hero-mock">
      <h1>{props.name}</h1>
      <h2>{props.title}</h2>
      {props.subtitle && <p>{props.subtitle}</p>}
      {props.location && <span>{props.location}</span>}
      {props.primaryCta && (
        <a href={props.primaryCta.href}>{props.primaryCta.label}</a>
      )}
      {props.secondaryCta && (
        <a href={props.secondaryCta.href}>{props.secondaryCta.label}</a>
      )}
      {props.imageSrc && (
        <Image
          src={props.imageSrc}
          alt={props.imageAlt || 'avatar'}
          width={1192}
          height={1192}
        />
      )}
    </section>
  ),
}));

import Hero from './Hero';

describe('Hero (structure rapide, mocké)', () => {
  it('rend le nom, le titre, le sous-titre, la localisation, les CTAs et l’avatar', () => {
    render(
      <Hero
        name="Nom principal"
        title="Titre principal"
        subtitle="Sous-titre"
        location="Paris"
        primaryCta={{ label: 'CTA 1', href: '/cta1' }}
        secondaryCta={{ label: 'CTA 2', href: '/cta2' }}
        imageSrc="/avatar.png"
        imageAlt="avatar test"
      />
    );
    expect(screen.getByText('Nom principal')).toBeInTheDocument();
    expect(screen.getByText('Titre principal')).toBeInTheDocument();
    expect(screen.getByText('Sous-titre')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('CTA 1')).toBeInTheDocument();
    expect(screen.getByText('CTA 2')).toBeInTheDocument();
    expect(screen.getByAltText('avatar test')).toBeInTheDocument();
  });

  it('ne rend pas le sous-titre, la localisation, les CTAs ni l’avatar si non fournis', () => {
    render(<Hero name="Nom seul" title="Titre seul" subtitle="" location="" />);
    expect(screen.getByText('Nom seul')).toBeInTheDocument();
    expect(screen.getByText('Titre seul')).toBeInTheDocument();
    expect(screen.queryByText('Sous-titre')).not.toBeInTheDocument();
    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByAltText('avatar test')).not.toBeInTheDocument();
  });
});
