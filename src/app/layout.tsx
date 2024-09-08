import Headers from '@/components/Headers/Headers';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/global.scss';

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
        { path: './fonts/Poppins-Medium.woff2', weight: '500' },
        { path: './fonts/Poppins-SemiBold.woff2', weight: '600' },
    ],
    variable: '--poppinsFont',
});

export const metadata: Metadata = {
    title: 'Create Next App',
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
                <div className='container'>{children}</div>
            </body>
        </html>
    );
}
