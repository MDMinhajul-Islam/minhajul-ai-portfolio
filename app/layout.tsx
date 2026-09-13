import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });
const serif = Instrument_Serif({ variable: '--font-serif', subsets: ['latin'], weight: '400' });

const siteUrl = 'https://minhajul-ai-portfolio.pages.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Md. Minhajul Islam | AI Engineer & Researcher',
  description:
    'Portfolio of Md. Minhajul Islam - software engineering, computer vision, machine learning, deep learning, and applied AI research.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Md. Minhajul Islam Portfolio',
    title: 'Md. Minhajul Islam | AI Engineer & Researcher',
    description:
      'AI Engineer and researcher working across machine learning, computer vision, deep learning, and production AI systems.',
    images: [
      {
        url: '/minhajul-professional-v2.png',
        alt: 'Md. Minhajul Islam - AI Engineer & Researcher',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md. Minhajul Islam | AI Engineer & Researcher',
    description:
      'AI Engineer and researcher working across machine learning, computer vision, deep learning, and production AI systems.',
    images: ['/minhajul-professional-v2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${mono.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
