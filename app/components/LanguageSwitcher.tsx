'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useT } from 'next-i18next/client';
import i18nConfig from '../../i18n.config';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { i18n } = useT();
  const { supportedLngs } = i18nConfig;
  const currentLng = i18n.language;

  const switchLocale = (locale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = supportedLngs.includes(segments[0])
      ? segments.slice(1)
      : segments;
    const nextPath =
      locale === i18nConfig.fallbackLng
        ? `/${pathWithoutLocale.join('/')}`
        : `/${locale}/${pathWithoutLocale.join('/')}`;

    router.push(nextPath === '/' ? '/' : nextPath.replace(/\/$/, ''));
  };

  return (
    <div className="language-switcher">
      {supportedLngs.map((lng) => (
        <button
          key={lng}
          onClick={() => switchLocale(lng)}
          type="button"
          className={`language-button${currentLng === lng ? ' active' : ''}`}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}
