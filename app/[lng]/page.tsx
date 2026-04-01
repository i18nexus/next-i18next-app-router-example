import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';
import { Link } from '../components/Link';

type PageProps = {
  params: Promise<{
    lng: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getT('home', { lng });

  return {
    title: t('title')
  };
}

export default async function HomePage({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await getT('home', { lng });

  return (
    <div className="page-stack">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h1>{t('title')}</h1>
          <p className="lead">{t('lead')}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contact">
              {t('primaryCta')}
            </Link>
            <Link className="button button-secondary" href="/about">
              {t('secondaryCta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid-section">
        <article className="feature-card">
          <h2>{t('features.strategy.title')}</h2>
          <p>{t('features.strategy.body')}</p>
        </article>
        <article className="feature-card">
          <h2>{t('features.production.title')}</h2>
          <p>{t('features.production.body')}</p>
        </article>
        <article className="feature-card">
          <h2>{t('features.reporting.title')}</h2>
          <p>{t('features.reporting.body')}</p>
        </article>
      </section>
    </div>
  );
}
