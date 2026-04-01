import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  initServerI18next,
  getT,
  getResources,
  generateI18nStaticParams
} from 'next-i18next/server';
import { I18nProvider } from 'next-i18next/client';
import { Sora } from 'next/font/google';
import { Link } from '../components/Link';
import SiteNav from '../components/SiteNav';
import '../globals.css';
import i18nConfig from '../../i18n.config';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin']
});

type LayoutProps = {
  children: ReactNode;
  params: Promise<{
    lng: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Northstar Studio',
  description: 'Digital product and brand experiences for growing teams.'
};

export async function generateStaticParams() {
  return generateI18nStaticParams();
}

initServerI18next(i18nConfig);

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lng } = await params;
  const { i18n } = await getT();

  if (process.env.NODE_ENV === 'development') {
    await i18n.reloadResources(i18nConfig.supportedLngs, i18nConfig.ns);
  }

  const resources = getResources(i18n);

  return (
    <html lang={lng} className={sora.variable} data-scroll-behavior="smooth">
      <body>
        <I18nProvider fallbackLng={i18nConfig.fallbackLng} language={lng} resources={resources}>
          <div className="site-shell">
            <header className="site-header">
              <div className="brand-block">
                <Link className="brand-mark" href="/">
                  Northstar Studio
                </Link>
              </div>

              <SiteNav />
            </header>

            <main className="page-content">{children}</main>

            <footer className="site-footer">
              <p>Northstar Studio</p>
              <p>123 Market Street, San Francisco, CA</p>
            </footer>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
