import { setRequestLocale } from 'next-intl/server'
import { lazy, Suspense, use } from 'react'

export default function Privacy(props: PageProps<'/[locale]/privacy'>) {
  const { locale } = use(props.params)

  setRequestLocale(locale)

  const Content = lazy(() => import(`@/content/${locale}.md`))

  return (
    <Suspense>
      <div className="msb-16 mx-auto prose px-4 sm:px-6 lg:px-8 prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
        <Content />
      </div>
    </Suspense>
  )
}
