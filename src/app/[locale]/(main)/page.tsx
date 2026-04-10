import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { setRequestLocale } from 'next-intl/server'

export default async function Home(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Faqs />
    </>
  )
}
