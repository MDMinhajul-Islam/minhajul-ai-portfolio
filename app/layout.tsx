import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });
const serif = Instrument_Serif({ variable: '--font-serif', subsets: ['latin'], weight: '400' });

const siteUrl = 'https://minhajul-ai-portfolio.pages.dev/';
const previewImageUrl = `${siteUrl}og-image.png`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>Md. Minhajul Islam | AI Engineer &amp; Researcher</title>
        <meta name="description" content="Portfolio of Md. Minhajul Islam - software engineering, computer vision, machine learning, deep learning, and applied AI research." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href={siteUrl} />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Md. Minhajul Islam | AI Engineer &amp; Researcher" />
        <meta property="og:description" content="AI Engineer and researcher working across machine learning, computer vision, deep learning, and production AI systems." />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content="Md. Minhajul Islam Portfolio" />
        <meta property="og:image" content={previewImageUrl} />
        <meta property="og:image:secure_url" content={previewImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Md. Minhajul Islam - AI Engineer &amp; Researcher" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Md. Minhajul Islam | AI Engineer &amp; Researcher" />
        <meta name="twitter:description" content="AI Engineer and researcher working across machine learning, computer vision, deep learning, and production AI systems." />
        <meta name="twitter:image" content={previewImageUrl} />
      </head>
      <body className={`${geist.variable} ${mono.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
