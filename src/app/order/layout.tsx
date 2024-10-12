import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'App',
//     description: 'Generated by create next app',
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div style={{ marginBottom: 48 }}>{children}</div>;
}
