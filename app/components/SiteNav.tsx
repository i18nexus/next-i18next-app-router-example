'use client';

import { usePathname } from 'next/navigation';
import { useT } from 'next-i18next/client';
import i18nConfig from '../../i18n.config';
import { Link } from './Link/client';
import LanguageSwitcher from './LanguageSwitcher';

const links = [
  { href: '/', labelKey: 'nav_home' },
  { href: '/about', labelKey: 'nav_about' },
  { href: '/contact', labelKey: 'nav_contact' }
];

export default function SiteNav() {
  const pathname = usePathname();
  const { i18n, t } = useT('common');
  const currentLng = i18n.language;

  return (
    <div className="nav-controls">
      <nav className="site-nav" aria-label={t('nav_primary')}>
        {links.map(({ href, labelKey }) => {
          const localizedHref =
            currentLng === i18nConfig.fallbackLng
              ? href
              : href === '/'
                ? `/${currentLng}`
                : `/${currentLng}${href}`;
          const isActive =
            pathname === localizedHref ||
            (href !== '/' && pathname.startsWith(`${localizedHref}/`));

          return (
            <Link
              key={href}
              href={href}
              className={isActive ? 'active' : undefined}
              aria-current={isActive ? 'page' : undefined}
            >
              {t(labelKey)}
            </Link>
          );
        })}
      </nav>
      <LanguageSwitcher />
    </div>
  );
}
