'use client'

import Link from 'next/link'
import clsx from 'clsx'

export function WindowsLink(props: React.ComponentPropsWithoutRef<'a'>) {
  return (
    <Link
      href="https://cdn.uchar.uz/Lochin%20-%20Setup.exe"
      aria-label="Download for the Windows"
      {...props}
      className={clsx(
        'flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-500 hover:text-brand-500',
        props.className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-5"
      >
        <path d="M3 4.6 10.4 3v8H3V4.6Zm8.4-1.8L21 1v10h-9.6V2.8ZM3 12h7.4v8L3 18.6V12Zm8.4 0H21v10l-9.6-1.8V12Z" />
      </svg>
      Windows
    </Link>
  )
}
