import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import ViewCounter from '@/components/ViewCounter'
import Tag from '@/components/Tag'
import TOCInline from '@/components/TOCInline'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  RedditShareButton,
  WhatsappShareButton,
} from 'react-share'
import { SocialIcon } from 'react-social-icons'
import { HiOutlinePencil, HiOutlineClock, HiOutlineEye } from 'react-icons/hi'
import { BsCalendarDate } from 'react-icons/bs'
import { FiExternalLink } from 'react-icons/fi'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children, toc = [] }) {
  const {
    slug,
    fileName,
    date,
    title,
    images,
    tags,
    readingTime,
    showSidebar = true,
    contentType,
  } = frontMatter
  const isNetwork = contentType === 'network'
  const postUrl = `${siteMetadata.siteUrl}/${isNetwork ? 'network' : 'blog'}/${slug}`
  const hasAuthors = authorDetails.length > 0
  const hasTags = tags && tags.length > 0
  const hasToc = toc.length > 0
  const hasSidebar = showSidebar && (hasAuthors || hasTags || hasToc || next || prev)
  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-5">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      <BsCalendarDate className="-mt-1.5 mr-1.5 inline h-4 w-4" />
                      {formatDate(date, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="flex justify-center gap-5 py-4">
                <span className="flex items-center gap-1.5">
                  <HiOutlinePencil className="h-5 w-5" />
                  {readingTime.words} words
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineClock className="h-5 w-5" />
                  {readingTime.text}
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineEye className="h-5 w-5" />
                  <ViewCounter className="ml-0" slug={slug} blogPage={true} />
                  <div className="-ml-0.5">Views</div>
                </span>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            {showSidebar && hasAuthors && (
              <dl className="pb-10 pt-6 xl:hidden">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                    {authorDetails.map((author) => (
                      <li className="flex items-center" key={author.name}>
                        <div className="flex items-center">
                          {author.avatar && (
                            <Image
                              src={author.avatar}
                              width="44px"
                              height="44px"
                              alt="avatar"
                              className="h-11 w-11 rounded-full"
                              placeholder="blur"
                              blurDataURL="/static/images/SVG-placeholder.png"
                            />
                          )}
                          <div className="ml-5">
                            <div className="leading-tight">
                              <div className="text-base font-bold text-gray-900 dark:text-gray-100">
                                {author.name || 'Chaea Kim'}
                              </div>
                            </div>
                            <div className="leading-tight">
                              <Link
                                href="/contact"
                                className="text-base font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                aria-label="Go to contact page"
                              >
                                @Contact
                                <FiExternalLink className="-mt-0.5 ml-1 inline-block h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
            )}
            {hasSidebar && (
              <aside className="hidden xl:row-span-2 xl:block xl:pr-4">
                {hasAuthors && (
                  <div className="border-b border-gray-200 pb-10 pt-11 dark:border-gray-700">
                    <h2 className="sr-only">Authors</h2>
                    <ul className="space-y-8">
                      {authorDetails.map((author) => (
                        <li className="flex items-center" key={author.name}>
                          <div className="flex items-center">
                            {author.avatar && (
                              <Image
                                src={author.avatar}
                                width="44px"
                                height="44px"
                                alt="avatar"
                                className="h-11 w-11 rounded-full"
                                placeholder="blur"
                                blurDataURL="/static/images/SVG-placeholder.png"
                              />
                            )}
                            <div className="ml-5">
                              <div className="leading-tight">
                                <div className="text-base font-bold text-gray-900 dark:text-gray-100">
                                  {author.name || 'Chaea Kim'}
                                </div>
                              </div>
                              <div className="leading-tight">
                                <Link
                                  href="/contact"
                                  className="text-base font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                  aria-label="Go to contact page"
                                >
                                  @Contact
                                  <FiExternalLink className="-mt-0.5 ml-1 inline-block h-4 w-4" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="divide-y divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700">
                  {hasTags && (
                    <div className="py-8">
                      <h2 className="pb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Tags
                      </h2>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                  {!isNetwork && (next || prev) && (
                    <div className="space-y-8 py-8">
                      {prev && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Previous Article
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                          </div>
                        </div>
                      )}
                      {next && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Next Article
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {hasToc && (
                  <div className="border-t border-gray-200 pt-8 dark:border-gray-700 xl:sticky xl:top-24 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto">
                    <h2 className="pb-3 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      On this page
                    </h2>
                    <TOCInline toc={toc} fromHeading={1} toHeading={2} indentDepth={2} />
                  </div>
                )}
              </aside>
            )}
            <div
              className={`divide-y divide-gray-200 dark:divide-gray-700 xl:row-span-2 xl:pb-0 ${
                hasSidebar ? 'xl:col-span-3' : 'mx-auto w-full max-w-3xl xl:col-span-4'
              }`}
            >
              <div className="prose max-w-none pb-8 pt-10 dark:prose-dark">{children}</div>
              <div className="grid place-items-center pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center space-x-4">
                  <TwitterShareButton
                    url={postUrl}
                    title={title}
                    via={siteMetadata.socialAccount.twitter}
                    className="flex items-center overflow-hidden rounded-full !bg-[#1da1f2] hover:scale-110"
                  >
                    <SocialIcon
                      network="twitter"
                      style={{ height: 35, width: 35 }}
                      fgColor="#fff"
                      bgColor="#1da1f2"
                    />
                  </TwitterShareButton>
                  <FacebookShareButton
                    url={postUrl}
                    quote={title}
                    className="flex items-center overflow-hidden rounded-full !bg-[#1877f2] hover:scale-110"
                  >
                    <SocialIcon
                      network="facebook"
                      style={{ height: 35, width: 35 }}
                      fgColor="#fff"
                      bgColor="#1877f2"
                    />
                  </FacebookShareButton>
                  <EmailShareButton
                    body={'Check out this blog'}
                    subject={title}
                    separator=" : "
                    url={postUrl}
                    className="flex items-center overflow-hidden rounded-full !bg-[#B61AC1] hover:scale-110"
                  >
                    <SocialIcon
                      network="email"
                      style={{ height: 35, width: 35 }}
                      fgColor="#fff"
                      bgColor="#B61AC1"
                    />
                  </EmailShareButton>
                  <LinkedinShareButton
                    summary={'Check out this blog'}
                    title={title}
                    source={siteMetadata.siteUrl}
                    url={postUrl}
                    className="flex items-center overflow-hidden rounded-full !bg-[#0072b1] hover:scale-110"
                  >
                    <SocialIcon
                      network="linkedin"
                      style={{ height: 35, width: 35 }}
                      fgColor="#fff"
                      bgColor="#0072b1"
                    />
                  </LinkedinShareButton>
                  <RedditShareButton
                    title={title}
                    url={postUrl}
                    className="flex items-center overflow-hidden rounded-full !bg-[#ff4500] hover:scale-110"
                  >
                    <SocialIcon
                      network="reddit"
                      style={{ height: 35, width: 35 }}
                      fgColor="#fff"
                      bgColor="#ff4500"
                    />
                  </RedditShareButton>
                  <WhatsappShareButton
                    title={title}
                    separator={' : '}
                    url={postUrl}
                    className="flex items-center overflow-hidden rounded-full !bg-[#25D366] hover:scale-110"
                  >
                    <SocialIcon
                      network="whatsapp"
                      style={{ height: 35, width: 35 }}
                      fgColor="#fff"
                      bgColor="#25D366"
                    />
                  </WhatsappShareButton>
                  <Link
                    href={editUrl(fileName)}
                    className="flex items-center overflow-hidden rounded-full !bg-[#5A6272] hover:scale-110"
                  >
                    <SocialIcon
                      network="github"
                      style={{ height: 35, width: 35 }}
                      fgColor="#fff"
                      bgColor="#5A6272"
                    />
                  </Link>
                </div>
              </div>
              <Comments frontMatter={frontMatter} />
              <div className="hidden border-t-0 pt-4 xl:block xl:pt-8">
                <Link
                  href={isNetwork ? '/network' : '/blog'}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; {isNetwork ? 'Back to the bookshelf' : 'Back to the blog'}
                </Link>
              </div>
            </div>
            <footer className="xl:hidden">
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {showSidebar && hasTags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="pb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {!isNetwork && (next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4">
                <Link
                  href={isNetwork ? '/network' : '/blog'}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; {isNetwork ? 'Back to the bookshelf' : 'Back to the blog'}
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
