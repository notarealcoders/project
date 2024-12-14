import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap' // Optimize font loading
});

export const metadata: Metadata = {
  title: 'CodeShare - Collaborative Code Editor',
  description: 'Real-time collaborative code editor',
  metadataBase: new URL('https://codeshare.example.com'),
  openGraph: {
    title: 'CodeShare - Collaborative Code Editor',
    description: 'Real-time collaborative code editor',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://demos.yjs.dev" />
        <link rel="preconnect" href="https://demos.yjs.dev" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}