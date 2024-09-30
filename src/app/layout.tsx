import Headers from '@/widgets/Headers/Headers';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/global.scss';
import { useRouter } from 'next/router';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = localFont({
    src: [
        // { path: './fonts/Poppins-Medium.woff2', weight: '500' },
        // { path: './fonts/Poppins-SemiBold.woff2', weight: '600' },
        { path: './fonts/Inter_18pt-Regular.woff2', weight: '400' },
        { path: './fonts/Inter_18pt-Bold.woff2', weight: '700' },
        { path: './fonts/Poppins-Medium.woff2', weight: '500' },
        { path: './fonts/Inter_24pt-Thin.woff2', weight: '100' },
    ],
    variable: '--InterFont',
});

export const metadata: Metadata = {
    title: 'App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${poppins.variable}`}>
                <Headers />
                {children}
            </body>
        </html>
    );
}
