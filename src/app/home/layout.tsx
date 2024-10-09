'use client';

import CurrencyContext from '@/shared/context/currency/CurrencyContext';
import { ReactNode } from 'react';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <CurrencyContext>{children}</CurrencyContext>;
}
