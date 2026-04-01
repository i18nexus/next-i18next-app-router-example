import type { ComponentProps, ReactNode } from 'react';
import { getT } from 'next-i18next/server';
import { LinkBase } from './LinkBase';

type LinkProps = ComponentProps<typeof LinkBase> & {
  children: ReactNode;
};

export async function Link({ href, children, ...props }: LinkProps) {
  const { lng } = await getT();

  return (
    <LinkBase lng={lng} href={href} {...props}>
      {children}
    </LinkBase>
  );
}
