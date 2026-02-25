import { AppStoreLink } from '@/components/AppStoreLink'
import { GooglePlayLink } from './GooglePlayLink'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'

export function CallToAction() {
  return (
    <section
      id="get-free-apps-today"
      className="relative overflow-hidden bg-brand-700 py-20 sm:py-28"
    >
      <div className="absolute top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Nazoratni qaytarib oling. Shartlaringiz asosida xabarlashuvni
            boshlang.
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Boshlash uchun bir daqiqadan kamroq vaqt ketadi. Ilovani yuklab
            oling, hisobingizni yarating va ma{"'"}lumotlaringiz o‘zingizniki
            bo‘lib qoladigan markazlashmagan tarmoqqa qo‘shiling — shifrlangan,
            federatsiyalangan va kuzatuvdan xoli.
          </p>
          <div className="mt-8 flex justify-center gap-5">
            <AppStoreLink color="white" />
            <GooglePlayLink color="white" />
          </div>
        </div>
      </Container>
    </section>
  )
}
