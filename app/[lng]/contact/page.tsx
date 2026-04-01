import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';

type PageProps = {
  params: Promise<{
    lng: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getT('contact', { lng });

  return {
    title: t('title')
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await getT('contact', { lng });

  return (
    <section className="inner-page">
      <span className="eyebrow">{t('title')}</span>
      <h1>{t('headline')}</h1>
      <p className="lead">{t('lead')}</p>
      <div className="contact-panel">
        <div>
          <h2>{t('sections.email.title')}</h2>
          <p>{t('sections.email.body')}</p>
        </div>
        <div>
          <h2>{t('sections.hours.title')}</h2>
          <p>{t('sections.hours.body')}</p>
        </div>
        <div>
          <h2>{t('sections.business.title')}</h2>
          <p>{t('sections.business.body')}</p>
        </div>
      </div>
    </section>
  );
}
