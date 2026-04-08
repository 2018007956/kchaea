import siteMetadata from '@/data/siteMetadata'
import networkData from '@/data/networkData'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'

const BOOK_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#a78bfa',
  '#7c3aed',
  '#c084fc',
  '#059669',
  '#10b981',
  '#34d399',
  '#047857',
  '#0d9488',
  '#dc2626',
  '#ef4444',
  '#f87171',
  '#b91c1c',
  '#e11d48',
  '#d97706',
  '#f59e0b',
  '#ea580c',
  '#0284c7',
  '#2563eb',
]

function Book({ title, href, index }) {
  const isLinked = !!href
  const color = BOOK_COLORS[index % BOOK_COLORS.length]

  const spine = (
    <div
      className={`group relative flex h-36 w-10 flex-shrink-0 items-center justify-center rounded-sm transition-all duration-200 sm:h-40 sm:w-11 md:h-44 md:w-12 ${
        isLinked
          ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg'
          : 'cursor-default opacity-40'
      }`}
      style={{
        backgroundColor: color,
        boxShadow: isLinked
          ? '2px 2px 6px rgba(0,0,0,0.25), inset -1px 0 3px rgba(0,0,0,0.1)'
          : '1px 1px 3px rgba(0,0,0,0.15)',
      }}
    >
      <div
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-sm"
        style={{ backgroundColor: 'rgba(0,0,0,0.12)' }}
      />
      <div
        className="absolute right-0 top-0 h-full w-[2px] rounded-r-sm"
        style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}
      />

      <span
        className="select-none text-[10px] font-semibold leading-tight text-white sm:text-[11px]"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        {title}
      </span>

      {isLinked && (
        <div
          className="pointer-events-none absolute inset-0 rounded-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
          }}
        />
      )}
    </div>
  )

  if (isLinked) {
    return (
      <Link href={href} className="no-underline">
        {spine}
      </Link>
    )
  }

  return spine
}

export default function Network() {
  const sortedBooks = [...networkData].sort((a, b) => {
    const aHasContent = Boolean(a.href)
    const bHasContent = Boolean(b.href)

    if (aHasContent === bHasContent) {
      return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
    }

    if (aHasContent) return -1
    if (bHasContent) return 1
    return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
  })

  return (
    <>
      <PageSEO
        title={`Network - ${siteMetadata.author}`}
        description="네트워크 개념을 하나씩 채워가는 책장"
      />
      <div className="mx-auto max-w-6xl divide-y divide-gray-400">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Network
          </h1>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            네트워크 개념을 하나씩 채워가는 책장
          </p>
        </div>

        <div className="py-12">
          <div className="relative">
            <div className="flex flex-wrap items-end gap-1.5 pb-0 sm:gap-2">
              {sortedBooks.map((book, i) => (
                <Book key={book.title} title={book.title} href={book.href} index={i} />
              ))}
            </div>

            <div className="relative mt-0">
              <div className="h-2.5 rounded-sm bg-gradient-to-b from-amber-800 to-amber-900 shadow-md dark:from-amber-900 dark:to-amber-950" />
              <div className="h-1 bg-gradient-to-b from-amber-900/40 to-transparent dark:from-amber-950/40" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
