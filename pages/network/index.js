import siteMetadata from '@/data/siteMetadata'
import networkData from '@/data/networkData'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'

const BOOK_COLORS = [
  { bg: '#2d3748', accent: '#4a5568' },
  { bg: '#1a365d', accent: '#2a4a7f' },
  { bg: '#234e52', accent: '#2c7a7b' },
  { bg: '#3c366b', accent: '#553c9a' },
  { bg: '#1e3a5f', accent: '#2b6cb0' },
  { bg: '#2a4365', accent: '#3182ce' },
  { bg: '#22543d', accent: '#38a169' },
  { bg: '#44337a', accent: '#6b46c1' },
  { bg: '#1a202c', accent: '#2d3748' },
  { bg: '#285e61', accent: '#319795' },
  { bg: '#4a2040', accent: '#7b3f6e' },
  { bg: '#2d3e50', accent: '#4a6785' },
]

function Book({ title, href, index }) {
  const isLinked = !!href
  const palette = BOOK_COLORS[index % BOOK_COLORS.length]

  const spine = (
    <div
      className={`group relative flex h-36 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-[3px] transition-all duration-300 sm:h-40 sm:w-11 md:h-44 md:w-12 ${
        isLinked
          ? 'cursor-pointer hover:-translate-y-2 hover:shadow-xl'
          : 'cursor-default opacity-30'
      }`}
      style={{
        backgroundColor: palette.bg,
        boxShadow: isLinked
          ? '1px 1px 4px rgba(0,0,0,0.2), inset -2px 0 4px rgba(0,0,0,0.15)'
          : '1px 1px 2px rgba(0,0,0,0.1)',
      }}
    >
      <div
        className="absolute left-0 top-0 h-full w-[3px]"
        style={{
          background: `linear-gradient(to right, ${palette.accent}44, transparent)`,
        }}
      />

      <div
        className="absolute right-0 top-0 h-full w-[2px]"
        style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
      />

      <div
        className="absolute bottom-3 left-1/2 top-3 w-[1px] -translate-x-1/2 sm:bottom-4 sm:top-4"
        style={{ backgroundColor: `${palette.accent}33` }}
      />

      <span
        className="relative z-10 select-none text-[10px] font-medium tracking-wide text-white/90 sm:text-[11px] md:text-xs"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        {title}
      </span>

      {isLinked && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(180deg, ${palette.accent}22 0%, transparent 50%)`,
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
      <div className="mx-auto max-w-6xl divide-y divide-gray-200 dark:divide-gray-700">
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
            <div className="flex flex-wrap items-end gap-[6px] sm:gap-2">
              {sortedBooks.map((book, i) => (
                <Book key={book.title} title={book.title} href={book.href} index={i} />
              ))}
            </div>

            <div className="relative mt-0">
              <div
                className="h-3 rounded-sm shadow-sm"
                style={{ background: 'linear-gradient(to bottom, #8B7355, #6B5B45)' }}
              />
              <div
                className="h-[3px]"
                style={{
                  background: 'linear-gradient(to bottom, rgba(107,91,69,0.3), transparent)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
