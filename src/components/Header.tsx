'use client'

import { Link } from '@/i18n/navigation'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { NavLinks } from '@/components/NavLinks'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { SelectField } from './Fields'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof PopoverButton<typeof Link>>,
    'as' | 'className'
  >,
) {
  return (
    <PopoverButton
      as={Link}
      className="block text-base/7 tracking-tight text-gray-700"
      {...props}
    />
  )
}

export function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  const langs = [
    {
      value: 'en',
      label: 'English',
      icon: '🇺🇸',
    },
    {
      value: 'ru',
      label: 'Русский',
      icon: '🇷🇺',
    },
    {
      value: 'uz',
      label: 'Oʻzbekcha',
      icon: '🇺🇿',
    },
  ]

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value === 'uz' ? '' : e.target.value + '.'

    router.replace(`${locale}uchar.uz/${pathname}`)
  }

  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <Image src="/logo.svg" width={64} height={64} alt="Favicon" />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <SelectField
              className="lg:hidden"
              onChange={changeLanguage}
              defaultValue={params.locale}
            >
              {langs.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.icon}
                </option>
              ))}
            </SelectField>
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <PopoverButton
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 focus:not-data-focus:outline-hidden active:stroke-gray-900"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </PopoverButton>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <PopoverBackdrop
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          //@ts-ignore
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur-sm"
                        />
                        <PopoverPanel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          //@ts-ignore
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pt-32 pb-6 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            <MobileNavLink href="/#features">
                              {t('links.features')}
                            </MobileNavLink>
                            <MobileNavLink href="/#faqs">
                              {t('links.faqs')}
                            </MobileNavLink>
                            <MobileNavLink href="/privacy">
                              {t('links.privacy')}
                            </MobileNavLink>
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            <Button
                              href="https://chat.uchar.uz"
                              variant="outline"
                            >
                              {t('header.sign_in')}
                            </Button>
                          </div>
                        </PopoverPanel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            <div className="flex items-center gap-6 max-lg:hidden">
              <SelectField
                onChange={changeLanguage}
                defaultValue={params.locale}
              >
                {langs.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.icon + ' ' + lang.label}
                  </option>
                ))}
              </SelectField>
              <Button href="https://chat.uchar.uz" variant="outline">
                {t('header.sign_in')}
              </Button>
              {/* <Button href="#">Download</Button> */}
            </div>
          </div>
        </Container>
      </nav>
    </header>
  )
}
