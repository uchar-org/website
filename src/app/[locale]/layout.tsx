import { type Metadata } from 'next'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { routing } from '@/i18n/routing'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import * as fs from 'node:fs/promises'

const inter = localFont({ src: './Inter.ttf' })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: {
    template: '%s - iCom',
    default: 'iCom - Experience your own ether.',
  },
  description:
    'By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const res = await fs.readFile('public/config.json', 'utf-8')
  const config = JSON.parse(res) as { sign_in_url: string }

  return (
    <html
      lang={locale}
      className={clsx('bg-gray-50 antialiased', inter.className)}
    >
      <body>
        <NextIntlClientProvider>
          <Header signInUrl={config?.sign_in_url} />
          <main className="flex-auto">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
