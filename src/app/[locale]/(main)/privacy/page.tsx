import { setRequestLocale } from "next-intl/server";

export const dynamic = "auto"
export const dynamicParams = false

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'ru' },
        { locale: 'uz' },
    ]
}

export default async function Privacy(props: PageProps<"/[locale]/privacy">) {
    const { locale } = await (props.params)

    setRequestLocale(locale);

    const Content = (await import(`@/content/${locale}.md`)).default;

    return <Content />
} 