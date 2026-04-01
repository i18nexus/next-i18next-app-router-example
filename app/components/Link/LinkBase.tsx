import type { ComponentProps, ReactNode } from 'react';
import NextLink from 'next/link';
import i18nConfig from '../../../i18n.config';

const fallbackLng = i18nConfig.fallbackLng;

function normalizeHref(href: string) {
  return href.startsWith('/') ? href : `/${href}`;
}

export function getLocalizedHref(lng: string, href = '') {
  const normalizedHref = normalizeHref(href);

  if (i18nConfig.hideDefaultLocale && lng === fallbackLng) {
    return normalizedHref;
  }

  return `/${lng}${normalizedHref}`;
}

type LinkBaseProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  lng?: string;
  href?: string;
  children: ReactNode;
};

export function LinkBase({
  lng = fallbackLng,
  href = '',
  children,
  ...props
}: LinkBaseProps) {
  const localizedHref = getLocalizedHref(lng, href);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
