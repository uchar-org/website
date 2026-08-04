import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

import { Container } from '@/components/Container'
import Macbook from '@/images/macbook.png'
import Phone from '@/images/phone.png'
import { GooglePlayLink } from '@/components/GooglePlayLink'
import { WindowsLink } from '@/components/WindowsLink'

export default function Download(props: PageProps<'/[locale]/download'>) {
  const { locale } = use(props.params)
  setRequestLocale(locale)

  const t = useTranslations('download')

  return (
    <div className="pt-12 pb-24 sm:pt-20 sm:pb-32">
      <Container className="flex flex-col gap-14 sm:gap-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {t('title')}
            <span className="text-brand-500">.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 sm:text-xl">
            {t('description')}
          </p>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Android  */}
          <div className="group relative flex min-h-135 flex-col overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl shadow-gray-900/8">
            <div className="relative min-h-82 flex-1 overflow-hidden bg-linear-to-b from-brand-600 via-brand-300 to-white sm:min-h-96">
              <Image
                src={Phone}
                alt="Lochin for Android"
                priority
                className="absolute top-8 left-1/2 w-57 -translate-x-1/2 drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 sm:top-10 sm:w-64"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-white" />
            </div>

            <div className="relative flex flex-col items-center gap-2 px-6 pt-3 pb-9 text-center sm:px-10 sm:pb-11">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                {t('android.title')}
              </h2>
              <p className="text-base text-gray-600">
                {t('android.description')}
              </p>
              <GooglePlayLink color="black" />
            </div>
          </div>

          {/* Desktop  */}
          <div className="group relative flex min-h-135 flex-col overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl shadow-gray-900/8">
            <div className="relative min-h-82 flex-1 overflow-hidden bg-linear-to-b from-gray-900 via-brand-600 to-white sm:min-h-96">
              <Image
                src={Macbook}
                alt="Lochin for Windows"
                priority
                className="absolute top-16 left-1/2 w-136 max-w-none -translate-x-1/2 drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 sm:top-16 sm:w-156"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-white" />
            </div>

            <div className="relative flex flex-col items-center gap-2 px-6 pt-3 pb-9 text-center sm:px-10 sm:pb-11">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                {t('desktop.title')}
              </h2>
              <p className="text-base text-gray-600">
                {t('desktop.description')}
              </p>
              <WindowsLink className="w-full max-w-60" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
