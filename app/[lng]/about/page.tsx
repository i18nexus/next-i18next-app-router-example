import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';

type PageProps = {
  params: Promise<{
    lng: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getT('about', { lng });

  return {
    title: t('title')
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await getT('about', { lng });

  return (
    <section className="inner-page">
      <span className="eyebrow">{t('title')}</span>
      <h1>{t('headline')}</h1>
      <p className="lead">{t('lead')}</p>
      <div className="grid-section narrow-grid">
        <article className="feature-card">
          <h2>{t('sections.bring.title')}</h2>
          <p>{t('sections.bring.body')}</p>
        </article>
        <article className="feature-card">
          <h2>{t('sections.work.title')}</h2>
          <p>{t('sections.work.body')}</p>
        </article>
      </div>
    </section>
  );
}
