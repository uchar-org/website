import { type Metadata } from 'next'
import localFont from 'next/font/local'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { routing } from '@/i18n/routing'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale } from 'next-intl/server'

const inter = localFont({ src: './Inter.ttf' })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: '%s - Uchar',
    default: 'Uchar - Experience your own ether.',
  },
  description:
    'By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  setRequestLocale(locale);

  return (
    <html lang={locale} className={clsx('bg-gray-50 antialiased', inter.className)}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body>
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
