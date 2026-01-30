import Link from '@/components/Link'
import Image from '@/components/Image'
import { useState } from 'react'
import formatDate from '@/lib/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import Pagination from '@/components/Pagination'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const [groupBy, setGroupBy] = useState('none') // none | year
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  // Group 모드에서는 탐색성이 핵심이므로 "전체 목록(필터 결과)"을 보여주고 pagination을 숨긴다.
  let displayPosts = filteredBlogPosts
  if (groupBy === 'none' && initialDisplayPosts.length > 0 && !searchValue) {
    displayPosts = initialDisplayPosts
  }

  const postsByYear =
    groupBy === 'year'
      ? displayPosts.reduce((acc, frontMatter) => {
          const year = new Date(frontMatter.date).getFullYear()
          const key = Number.isFinite(year) ? String(year) : 'Unknown'
          acc[key] = acc[key] || []
          acc[key].push(frontMatter)
          return acc
        }, {})
      : null

  const sortedYears =
    groupBy === 'year'
      ? Object.keys(postsByYear).sort((a, b) => {
          if (a === 'Unknown') return 1
          if (b === 'Unknown') return -1
          return Number(b) - Number(a)
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
            <div className="relative w-full max-w-lg">
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

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <select
                id="groupBy"
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="none">전체</option>
                <option value="year">연도별</option>
              </select>
            </div>
          </div>
        </div>
        {!filteredBlogPosts.length && <div className="py-12 text-sm">No posts found.</div>}

        {groupBy === 'year' ? (
          <div className="space-y-4 py-8">
            {sortedYears.map((year) => {
              const yearPosts = postsByYear[year] || []
              return (
                <details
                  key={year}
                  open
                  className="year-accordion rounded-2xl border border-gray-200 bg-white/60 p-4 backdrop-blur dark:border-gray-700 dark:bg-gray-800/60"
                >
                  <summary className="cursor-pointer select-none list-none">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {year}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {yearPosts.length} posts
                        </span>
                      </div>
                      <svg
                        className="year-accordion__chevron h-4 w-4 text-gray-500 transition-transform duration-200 dark:text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </summary>

                  <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {yearPosts.map((frontMatter) => {
                      const { slug, date, title, summary, tags, images, firstImage } = frontMatter
                      // Priority: frontmatter images > firstImage from content > default banner
                      const imageUrl =
                        images && images.length > 0
                          ? images[0]
                          : firstImage || siteMetadata.socialBanner

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
                </details>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
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
      {pagination && pagination.totalPages > 1 && !searchValue && groupBy === 'none' && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
