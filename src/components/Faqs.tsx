import { Container } from '@/components/Container'
import { useTranslations } from 'next-intl'



export function Faqs() {
  const t = useTranslations("home.faq")

  const faqs = [
    {
      question: t("end_to_end.question"),
      answer: t("end_to_end.answer")
    },
    {
      question: t("centralized.question"),
      answer: t("centralized.answer")
    },
    {
      question: t("devices.question"),
      answer: t("devices.answer")
    },
    {
      question: t("server.question"),
      answer: t("server.answer")
    },
    {
      question: t("platforms.question"),
      answer: t("platforms.answer"),
    },
    {
      question: t("calls.question"),
      answer: t("calls.answer")
    },
    {
      question: t("data.question"),
      answer: t("data.answer"),
    },
    {
      question: t("open_source.question"),
      answer: t("open_source.answer"),
    },
    {
      question: t("difference.question"),
      answer: t("difference.answer")
    },
  ]

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 shadow-lg shadow-gray-900/5 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            {t("title")}
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            {t.rich("description", {
              mail: (str) => (
                <a
                  href="mailto:support@uchar.uz"
                  className="text-gray-900 underline"
                >
                  {str}
                </a>
              )
            })}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((faq, columnIndex) => (
            <li key={columnIndex}>
              <h3 className="text-lg/6 font-semibold text-gray-900">
                {faq.question}
              </h3>
              <p className="mt-4 text-sm text-gray-700">
                {faq.answer}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
