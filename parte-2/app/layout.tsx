import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const SITE_URL = 'https://asimov-academy-python-ia.vercel.app'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#07080f',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Asimov Academy – Aprenda Python com IA',
  description:
    'O curso mais prático do Brasil para quem quer entrar em tecnologia sem enrolação.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Asimov Academy – Aprenda Python com IA',
    description:
      'Aprenda Python do zero e construa projetos reais com IA em um curso prático, direto ao ponto e com suporte da comunidade.',
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Asimov Academy',
  },
  twitter: {
    card: 'summary',
    title: 'Asimov Academy – Aprenda Python com IA',
    description:
      'Curso prático de Python + IA para criar projetos reais desde o primeiro módulo.',
  },
}

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Aprenda Python com IA',
  description:
    'Curso prático para aprender Python do zero e construir projetos reais com inteligência artificial.',
  provider: {
    '@type': 'Organization',
    name: 'Asimov Academy',
    url: SITE_URL,
  },
  inLanguage: 'pt-BR',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
      </body>
    </html>
  )
}
