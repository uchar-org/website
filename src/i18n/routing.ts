import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['uz', 'ru', 'en'],

  localePrefix: 'never',
  domains: [
    {
      domain: 'en.uchar.uz',
      defaultLocale: 'en',
      locales: ['en'],
    },
    {
      domain: 'ru.uchar.uz',
      defaultLocale: 'ru',
      locales: ['ru'],
    },
    {
      domain: 'uchar.uz',
      defaultLocale: 'uz',
      locales: ['uz'],
    },
  ],

  // Used when no locale matches
  defaultLocale: 'uz',
})
