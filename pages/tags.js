import { useState } from 'react'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import kebabCase from '@/lib/utils/kebabCase'
import ListLayout from '@/layouts/ListLayout'

export const POSTS_PER_PAGE = 9

export async function getStaticProps() {
  const tags = await getAllTags('blog')
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { tags, posts } }
}

export default function Tags({ tags, posts }) {
  const [selectedTags, setSelectedTags] = useState(new Set())
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) {
        next.delete(tag)
      } else {
        next.add(tag)
      }
      return next
    })
  }

  const filteredPosts =
    selectedTags.size > 0
      ? posts.filter((post) => {
          const postTagKeys = post.tags.map(kebabCase)
          return [...selectedTags].every((st) => postTagKeys.includes(kebabCase(st)))
        })
      : posts

  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  }

  const clearButton = selectedTags.size > 0 && (
    <button
      onClick={() => setSelectedTags(new Set())}
      className="flex flex-shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-gray-500 transition duration-200 hover:bg-[#fff5f7] hover:text-[#f31260] dark:text-gray-400 dark:hover:bg-red-900/40 dark:hover:text-red-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-3 w-3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      선택 해제
    </button>
  )

  const tagCards = (
    <div className="flex flex-wrap gap-2 pb-4">
      {sortedTags.map((t) => {
        const isActive = selectedTags.has(t)
        return (
          <button
            key={t}
            onClick={() => toggleTag(t)}
            className={`group flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition duration-200 hover:shadow-sm ${
              isActive
                ? 'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-500'
                : 'border-gray-200 bg-white hover:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-400'
            }`}
          >
            <span
              className={`text-xs font-semibold uppercase ${
                isActive
                  ? 'text-white'
                  : 'text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'
              }`}
            >
              {t.split(' ').join('-')}
            </span>
            <span
              className={`text-[10px] font-medium ${
                isActive ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {tags[t]}
            </span>
          </button>
        )
      })}
    </div>
  )

  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <ListLayout
        posts={filteredPosts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Tags"
        headerExtra={tagCards}
        headerAction={clearButton}
      />
    </>
  )
}
