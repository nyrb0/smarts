import Headers from '@/components/Headers/Headers';
import { ReactNode } from 'react';

export default function RootLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div>
            <Headers />
            {children}
        </div>
    );
}
