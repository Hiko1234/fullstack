"use client"

import React, { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/components/hooks/useTranslation';
import { EnumLang, EnumStyleVariables } from '@/enums';
// import constanst
import { locales } from 'constants/locales';

const SelectLang: FC = () => {
  const pathname = usePathname();
  const { lang } = useTranslation();

  return (
    <>
      {locales.map((item: { locale: EnumLang }) => (
        <Link
          key={`lang-${item.locale}`}
          style={{ color: lang === item.locale ? EnumStyleVariables.PRIMARY : "" }}
          href={`/${item.locale}${lang === EnumLang.UK ? pathname : `/${pathname.split('/').slice(2).join('/')}`}`}
        >
          {item.locale.toUpperCase()}
        </Link>
      ))}
    </>
  )
}

export default SelectLang