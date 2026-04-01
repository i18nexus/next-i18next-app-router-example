'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useT } from 'next-i18next/client';
import { LinkBase } from './LinkBase';

type LinkProps = ComponentProps<typeof LinkBase> & {
  children: ReactNode;
};

export function Link({ href, children, ...props }: LinkProps) {
  const { i18n } = useT();

  return (
    <LinkBase lng={i18n.language} href={href} {...props}>
      {children}
    </LinkBase>
  );
}
