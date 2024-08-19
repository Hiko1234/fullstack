'use client';

import { createContext, FC, PropsWithChildren } from 'react';
import { EnumLang } from '@/enums';

type Props = {
    dict: Record<string, any>;
    lang: EnumLang;
};

export const TranslationContext = createContext<Props>({ dict: {}, lang: EnumLang.UK });

const LangProvider: FC<PropsWithChildren<Props>> = ({ children, dict, lang }) => {
    return (
        <TranslationContext.Provider value={{ dict, lang }}>
            {children}
        </TranslationContext.Provider>
    );
};

export default LangProvider;
