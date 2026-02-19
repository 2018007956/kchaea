import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import projectsData from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { RoughNotation } from 'react-rough-notation'
import NewsletterForm from '@/components/NewsletterForm'
import ViewCounter from '@/components/ViewCounter'

const MAX_DISPLAY = 3
const STOCK_PROJECT = projectsData.find((project) => project.title.includes('알려주가'))
const SERVICE_LINKS = [
  {
    name: 'GrassMate',
    href: 'https://grassmate.vercel.app/',
    icon: '🌱',
  },
  {
    name: 'GigCal',
    href: 'https://gigcal.vercel.app/',
    icon: '🎵',
  },
  {
    name: '알려주가 AI',
    href: STOCK_PROJECT?.href || STOCK_PROJECT?.github,
    icon: null,
  },
].filter((service) => service.href)

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div>
        <div className="mb-12 flex flex-col items-center gap-x-12 xl:flex-row">
          <div className="pt-6 xl:flex-1">
            <h1 className="pb-6 text-2xl font-extrabold leading-10 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-12 md:text-4xl md:leading-14">
              안녕하세요, {/* <br /> */}
              <span className="text-primary-color-500 dark:text-primary-color-dark-500">
                김채아
              </span>{' '}
              입니다
            </h1>
            <h2 className="prose max-w-[70ch] pt-5 text-base text-gray-600 dark:text-gray-300">
              {`저의 개인 블로그에 오신 것을 환영합니다. 저는 자동화를 통해 효율적인 시스템을 구축하는 일에 관심이 있으며, 클라우드 기술에 지속적인 관심을 가지고 있습니다. `}
              여가 시간에는 AI 기술을 활용해 아이디어를 빠르게 서비스로 구현하는 사이드 프로젝트를
              하는 것을 좋아합니다.
            </h2>
            <p className="prosept-5 text-base leading-7 text-slate-600 dark:text-slate-300 sm:block md:hidden lg:hidden">
              이곳은{' '}
              <RoughNotation
                animate="true"
                type="box"
                show={true}
                color="#DE1D8D"
                animationDelay={1000}
                animationDuration={2500}
                className="text-slate-200"
              >
                제가 쌓아온 기술과 경험, 그리고 그 과정에서 얻은 인사이트&nbsp;
              </RoughNotation>
              를 담은 공간입니다. 편하게 둘러보세요!{' '}
            </p>
            <p className="prose hidden max-w-[70ch] pt-10 text-base leading-7 text-slate-600 dark:text-slate-300 md:block">
              이곳은{' '}
              <RoughNotation
                animate="true"
                type="highlight"
                show={true}
                color="#DE1D8D"
                animationDelay={1000}
                animationDuration={2500}
                className="text-slate-200"
              >
                제가 쌓아온 기술과 경험, 그리고 그 과정에서 얻은 인사이트&nbsp;
              </RoughNotation>
              를 담은 공간입니다. 편하게 둘러보세요!{' '}
              <div className="mt-8 text-slate-600 dark:text-slate-400">
                <span className="text-sm">Press</span>{' '}
                <span className="rounded-md bg-gray-300 p-1 text-sm text-gray-900 dark:bg-gray-400">
                  ⌘
                </span>{' '}
                <span className="text-sm">+ </span>
                <span className="rounded-md bg-gray-300 p-1 text-sm text-gray-900 dark:bg-gray-400">
                  K
                </span>{' '}
                <span className="text-sm">to start</span>
              </div>
            </p>
          </div>
          {/* <div className="h-content sm:h-content-sm flex flex-col justify-around">
            <h1 className="sm:text-8.5xl tracking-tightest my-28 select-none text-center text-6xl font-extrabold leading-none sm:my-10">
              <span
                data-content="Blog."
                className="relative block before:absolute before:top-0 before:bottom-0 before:left-0 before:block before:w-full before:animate-gradient-background-1 before:px-2 before:text-center before:text-black before:content-[attr(data-content)] dark:before:text-white dark:before:content-[attr(data-content)]"
              >
                <span className="animate-gradient-foreground-1 bg-gradient-to-br from-gradient-1-start to-gradient-1-end bg-clip-text px-2 text-transparent">
                  Blog.
                </span>
              </span>
              <span
                data-content="Coding."
                className="relative block before:absolute before:top-0 before:bottom-0 before:left-0 before:block before:w-full before:animate-gradient-background-2 before:px-2 before:text-center before:text-black before:content-[attr(data-content)] dark:before:text-white dark:before:content-[attr(data-content)]"
              >
                <span className="animate-gradient-foreground-2 bg-gradient-to-br from-gradient-2-start to-gradient-2-end bg-clip-text px-2 text-transparent">
                  Coding.
                </span>
              </span>
              <span
                data-content="Portfolio."
                className="relative block before:absolute before:top-0 before:bottom-0 before:left-0 before:block before:w-full before:animate-gradient-background-3 before:px-2 before:text-center before:text-black before:content-[attr(data-content)] dark:before:text-white dark:before:content-[attr(data-content)]"
              >
                <span className="animate-gradient-foreground-3 bg-gradient-to-br from-gradient-3-start to-gradient-3-end bg-clip-text px-2 text-transparent">
                  Portfolio.
                </span>
              </span>
            </h1>
          </div> */}
          <div
            className="flex items-center justify-center py-4"
            style={{ transform: 'translate(-6ch, 1ch)' }}
          >
            <div className="w-fit">
              <div className="ml-2 flex items-center gap-2.5">
                <h3 className="whitespace-nowrap font-mono text-lg font-semibold text-gray-900 dark:text-gray-100">
                  👻 My Services
                </h3>
              </div>
              <ul className="mt-3 space-y-1.5">
                {SERVICE_LINKS.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="group flex min-w-[10.5rem] items-center rounded-lg bg-gray-100 px-2.5 py-2 text-gray-600 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-amber-900 dark:bg-amber-300 dark:text-amber-950">
                        {service.icon ? (
                          <span className="text-[10px] leading-none" aria-hidden="true">
                            {service.icon}
                          </span>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="h-3 w-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.8}
                              d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v9m0 0l8-4.5M12 12l-8-4.5"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="font-mono text-sm font-semibold leading-none tracking-tight">
                        {service.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <h2 className="flex pb-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl md:text-5xl">
          Latest
        </h2>
        <hr className="border-gray-200 dark:border-gray-700" />
        <ul>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <Link
                href={`/blog/${slug}`}
                key={slug}
                className="group flex bg-transparent bg-opacity-20 px-2 transition duration-100 hover:scale-105 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <li className="py-6">
                  <article>
                    <div className="space-y-2 bg-transparent bg-opacity-20 p-2 transition duration-200 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-sm font-normal leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date)}</time>
                          {' • '}
                          <ViewCounter className="mx-1" slug={slug} />
                          views
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-4">
                        <div className="space-y-1">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500"
                              >
                                {title}
                              </Link>
                            </h2>
                          </div>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                          <div className="prose max-w-none pt-5 text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-5 text-lg font-normal leading-6">
          <Link
            href="/blog"
            className=" special-underline-new text-primary-500 hover:text-gray-100 hover:no-underline dark:text-primary-500 hover:dark:text-gray-100"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">{/* <NewsletterForm /> */}</div>
      )}
    </>
  )
}
