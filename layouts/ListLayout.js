import Link from '@/components/Link'
import Image from '@/components/Image'
import { useState, useEffect } from 'react'
import formatDate from '@/lib/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import Pagination from '@/components/Pagination'

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  headerExtra,
  headerAction,
}) {
  const [searchValue, setSearchValue] = useState('')
  // localStorage에 보기 모드를 저장하여 이전에 선택했던 보기 모드 유지
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('blog-view-mode') || 'board'
    }
    return 'board'
  })

  useEffect(() => {
    localStorage.setItem('blog-view-mode', viewMode)
  }, [viewMode])
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  let displayPosts = filteredBlogPosts
  if (viewMode === 'board' && initialDisplayPosts.length > 0 && !searchValue) {
    displayPosts = initialDisplayPosts
  }

  const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const postsByMonth =
    viewMode === 'list'
      ? displayPosts.reduce((acc, frontMatter) => {
          const d = new Date(frontMatter.date)
          const year = d.getUTCFullYear()
          const month = d.getUTCMonth()
          const key = Number.isFinite(year)
            ? `${year}-${String(month).padStart(2, '0')}`
            : 'Unknown'
          acc[key] = acc[key] || []
          acc[key].push(frontMatter)
          return acc
        }, {})
      : null

  const sortedMonths =
    viewMode === 'list'
      ? Object.keys(postsByMonth).sort((a, b) => {
          if (a === 'Unknown') return 1
          if (b === 'Unknown') return -1
          return b.localeCompare(a)
        })
      : []

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex w-full max-w-[34.75rem] flex-shrink-0 items-center gap-2">
                <div className="relative min-w-0 flex-1">
                  <input
                    aria-label="Search articles"
                    type="text"
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search articles"
                    className="block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  />
                  <svg
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {title === 'Tags' ? (
                  <Link
                    href="/blog"
                    className="flex-shrink-0 rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                    aria-label="Blog"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"
                        opacity=".5"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"
                        opacity=".5"
                      />
                      <circle cx="10.5" cy="6.5" r=".5" fill="currentColor" opacity=".5" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 19L19 5"
                      />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    href="/tags"
                    className="flex-shrink-0 rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                    aria-label="Tags"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"
                      />
                      <circle cx="10.5" cy="6.5" r=".5" fill="currentColor" />
                    </svg>
                  </Link>
                )}
              </div>
              {headerAction}
            </div>

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <div className="relative inline-flex rounded-lg border border-gray-200 bg-gray-100 p-0.5 dark:border-gray-700 dark:bg-gray-800">
                <div
                  className="absolute top-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-md bg-white shadow-sm transition-transform duration-200 ease-in-out dark:bg-gray-700"
                  style={{ transform: viewMode === 'list' ? 'translateX(100%)' : 'translateX(0)' }}
                />
                <button
                  onClick={() => setViewMode('board')}
                  className={`relative z-[1] rounded-md p-1.5 transition-colors duration-200 ${
                    viewMode === 'board'
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
                  }`}
                  aria-label="보드형 보기"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`relative z-[1] rounded-md p-1.5 transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
                  }`}
                  aria-label="리스트형 보기"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.166a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {headerExtra}
        {!filteredBlogPosts.length && <div className="py-12 text-sm">No posts found.</div>}

        {viewMode === 'list' ? (
          <div className="pb-8 pt-4">
            {sortedMonths.map((monthKey) => {
              const monthPosts = postsByMonth[monthKey] || []
              let label = monthKey
              if (monthKey !== 'Unknown') {
                const [y, m] = monthKey.split('-')
                label = `${MONTH_NAMES[parseInt(m, 10)]} ${y}`
              }
              return (
                <div key={monthKey} className="mb-8">
                  <h2 className="mb-4 text-lg font-bold text-primary-500">{label}</h2>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {monthPosts.map((frontMatter) => {
                      const { slug, date, title: postTitle, tags } = frontMatter
                      const day = String(new Date(date).getUTCDate()).padStart(2, '0')
                      return (
                        <Link
                          key={slug}
                          href={`/blog/${slug}`}
                          className="group flex items-baseline gap-4 py-1.5"
                        >
                          <span className="w-8 flex-shrink-0 text-sm tabular-nums text-gray-400 dark:text-gray-500">
                            {day}
                          </span>
                          <span className="min-w-0 truncate font-medium text-gray-900 group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-400">
                            {postTitle}
                          </span>
                          {tags && tags.length > 0 && (
                            <span className="flex flex-shrink-0 items-center gap-1.5">
                              {tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs text-gray-500 dark:text-gray-400"
                                >
                                  #{tag.toLowerCase().replace(/\s+/g, '-')}
                                </span>
                              ))}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 pb-12 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((frontMatter) => {
              const { slug, date, title, summary, tags, images, firstImage } = frontMatter
              // Priority: frontmatter images > firstImage from content > default banner
              const imageUrl =
                images && images.length > 0 ? images[0] : firstImage || siteMetadata.socialBanner

              return (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="group relative flex transform cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:scale-105 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={title}
                      layout="fill"
                      className="object-cover transition duration-300 group-hover:scale-110"
                    />
                    {/* Tags overlay */}
                    {tags && tags.length > 0 && (
                      <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-pink-500 bg-opacity-90 px-1.5 py-0.5 text-[10px] font-medium uppercase text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-1.5 text-xs font-normal text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </div>

                    <h2 className="mb-2 text-lg font-bold leading-6 tracking-tight text-gray-900 transition duration-500 ease-in-out group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-500">
                      {title}
                    </h2>

                    {summary && (
                      <p className="mb-3 line-clamp-2 flex-1 text-xs text-gray-600 dark:text-gray-400">
                        {summary}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && viewMode === 'board' && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
