import Link from '@/components/Link'
import Image from '@/components/Image'
import { useState } from 'react'
import formatDate from '@/lib/utils/formatDate'
import ViewCounter from '@/components/ViewCounter'
import siteMetadata from '@/data/siteMetadata'

export default function ListLayout({ posts, title }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts = filteredBlogPosts

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
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
        </div>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2">
          {!filteredBlogPosts.length && 'No posts found.'}
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
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110"
                  />
                  {/* Tags overlay */}
                  {tags && tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-pink-500 bg-opacity-90 px-2 py-1 text-xs font-medium uppercase text-white"
                        >
                          {tag}
                        </span>
                      ))}
                      {tags.length > 2 && (
                        <span className="rounded-md bg-pink-500 bg-opacity-90 px-2 py-1 text-xs font-medium uppercase text-white">
                          +{tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                    {' • '}
                    <ViewCounter className="mx-1" slug={slug} />
                    views
                  </div>

                  <h2 className="mb-2 text-xl font-bold leading-7 tracking-tight text-gray-900 transition duration-500 ease-in-out group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-500">
                    {title}
                  </h2>

                  {summary && (
                    <p className="line-clamp-2 mb-4 flex-1 text-sm text-gray-600 dark:text-gray-400">
                      {summary}
                    </p>
                  )}

                  <div className="mt-auto text-sm font-medium text-gray-700 dark:text-gray-300">
                    {siteMetadata.author}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
