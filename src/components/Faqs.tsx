import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'Bu haqiqatan ham boshidan oxirigacha shifrlanganmi?',
      answer:
        'Ha. Barcha xabarlar, qo‘ng‘iroqlar va mediafayllar standart tarzda Matrix protokolining Olm va Megolm kriptografik kutubxonalari yordamida uzluksiz shifrlanadi.',
    },
    {
      question: 'Platforma markazlashganmi?',
      answer:
        "Yo‘q. U to‘liq markazlashtirilmagan. Mavjud serverga qo‘shilishingiz yoki o‘zingiznikini ishga tushirishingiz mumkin. Federatsiya hech qanday kompaniya sizning maʼlumotlaringizga egalik qilmasligini yoki tajribangizni nazorat qilmasligini anglatadi.",
    },
    {
      question: 'Uni barcha qurilmalarimda ishlata olamanmi?',
      answer:
        'Albatta. Ilovamiz iOS, Android, desktop va vebda ishlaydi. Suhbatlaringiz barcha qurilmalaringizda muammosiz sinxronlanadi.',
    },
  ],
  [
    {
      question: 'O‘z serverimni joylashtira olamanmi?',
      answer:
        'Ha, bu Matriksning asosiy afzalliklaridan biri. NixOS orqali Uchar tomonidan taqdim etilgan infratuzilma bilan Synapse yoki Dendrite yordamida o‘z uy serveringizni osongina joylashtirishingiz va istasangiz, shaxsiy serveringizni boshqarishingiz mumkin.',
    },
    {
      question: 'Boshqa platformalar bilan ishlata olamanmi?',
      answer:
        'Matrixni Slack, Discord, Telegram, IRC va boshqa vositalar bilan bog‘lashingiz mumkin. Bizning platformamiz ochiq va o‘zaro ishlaydigan.',
    },
    {
      question: 'Guruhlar va ovozli/video chaqiruvlar ishlaydimi?',
      answer:
        'Ha. Siz ommaviy yoki shaxsiy xonalar, muhokamalar va hamjamiyatlar (Spaces) yaratishingiz, shuningdek, shifrlangan ovozli yoki video qo‘ng‘iroqlarni boshlashingiz mumkin — xoh yakka tartibda, xoh guruh bo‘lib.',
    },
  ],
  [
    {
      question: "Maʼlumotlarim biror marta sotilganmi yoki kuzatilganmi?",
      answer:
        "Hech qachon. Maʼlumotlaringiz shifrlangan va hech qachon ulashilmaydi yoki monetizatsiya qilinmaydi. Biz foydalanish xatti-harakatlarini kuzatmaymiz yoki tashqi tahlillarni kiritmaymiz.",
    },
    {
      question: 'Ochiq kodlimi?',
      answer:
        'Ha. Matrix protokoli ham, bizning dasturiy ta‘minotimiz/infratuzilmamiz ham ochiq manbalidir. Kodni ko‘zdan kechirishingiz, tekshirishingiz yoki uni rivojlantirishga hissa qo‘shishingiz mumkin.',
    },
    {
      question: 'Matrix va boshqa xabar almashish ilovalarining farqi nimada?',
      answer:
        "Anʼanaviy messenjerlardan farqli o‘laroq, Matrix markazlashtirilmagan - sizning suhbatlaringizni boshqaradigan markaziy server yo‘q. U federatsiyani qo‘llab-quvvatlaydi, shuning uchun har kim o‘z serverini ishga tushirishi va boshqalarga ulanishi mumkin. Bundan tashqari, hamma narsa boshidan oxirigacha shifrlangan, kengaytiriladigan va ochiq kodli - na devor bilan o‘ralgan bog‘lar, na kuzatuv kapitalizmi mavjud.",
    },
  ],
]

export function Faqs() {
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
            Tez-tez beriladigan savollar
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Agar yana biror narsa so‘ramoqchi bo‘lsangiz,{' '}
            <a
              href="mailto:support@uchar.uz"
              className="text-gray-900 underline"
            >
              bizga murojaat qilmoq
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg/6 font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
