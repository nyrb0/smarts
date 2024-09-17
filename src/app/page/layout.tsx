'use client';
import Headers from '@/components/Headers/Headers';
import { ReactNode, useState } from 'react';
import cartProducts from '../store/cart/cartProducts';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    console.log(cartProducts.productStorage);

    return (
        <div>
            <Headers />
            {children}
        </div>
    );
}
