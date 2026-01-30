import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'
import Experience from '@/components/Experience'
import experienceData from '@/data/experienceData'
import Presentation from '@/components/Presentation'
import presentationData from '@/data/presentationData'
import { RoughNotation } from 'react-rough-notation'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, linkedin, github, text1, text2, text3 } =
    frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`A little trivia me`} />
      <div className="">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5 md:pl-16">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8 xl:sticky xl:top-0">
            <Image
              src={avatar}
              alt="avatar"
              width="192px"
              height="192px"
              className="h-48 w-48 rounded-full xl:rounded-full"
              placeholder="blur"
              blurDataURL="/static/images/SVG-placeholder.png"
            />
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-dark xl:col-span-2">
            <p>
              <RoughNotation
                type="bracket"
                brackets={['left', 'right']}
                show={true}
                color="#FF0000"
                animationDelay={300}
                animationDuration={3000}
              >
                {text1} 현재는 오픈스택을 구축하는 일에 집중하고 있습니다.{' '}
              </RoughNotation>
            </p>
            <br />
            <p>
              현재 제가 하고 있는 일입니다.{' '}
              <Link
                href={'/now'}
                className="special-underline no-underline hover:text-gray-100 dark:text-gray-100 hover:dark:text-gray-100"
              >
                Link
              </Link>
            </p>
            <br />
            <p className="sm:block md:hidden lg:hidden">
              저는 항상 새로운 것에 도전하는 것을 좋아합니다. 현재는{' '}
              <span className="font-semibold">OpenStack 프로젝트에 코드 기여</span>를 하며 오픈소스
              개발 생태계를 경험하고 있으며, 동시에{' '}
              <RoughNotation
                type="underline"
                show={true}
                color="#FBCFE8"
                animationDelay={1500}
                animationDuration={3000}
                multiline={true}
              >
                서비스 개발 또는 클라우드 인프라 분야에서 실무 경험을 쌓을 수 있는 기회를 찾고
                있습니다.
              </RoughNotation>
            </p>
            <p className="hidden md:block">
              저는 항상 새로운 것에 도전하는 것을 좋아합니다. 현재는{' '}
              <RoughNotation
                animationDelay="1000"
                animationDuration="3000"
                type="highlight"
                color="#0ea4e9"
                strokeWidth="3"
                show={true}
              >
                <span className="text-black dark:text-white">OpenStack 프로젝트에 코드 기여</span>
              </RoughNotation>
              를 하며 오픈소스 개발 생태계를 경험하고 있으며, 동시에{' '}
              <RoughNotation
                type="underline"
                show={true}
                color="#FBCFE8"
                animationDelay={1500}
                animationDuration={3000}
                multiline={true}
              >
                서비스 개발 또는 클라우드 인프라 분야에서 실무 경험을 쌓을 수 있는 기회를 찾고
                있습니다.
              </RoughNotation>
            </p>
            <br />
            <p>
              저는 새로운 사람들과 새로운 프로젝트를 함께하는 일에 항상 열려 있습니다. 이야기하고
              싶은 것이 있다면 언제든{' '}
              <Link
                href={'mailto:chaea11s0@gmail.com'}
                className="special-underline no-underline hover:text-gray-100 dark:text-gray-100 hover:dark:text-gray-100"
              >
                메일
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="ml-0.5 inline-block h-4 w-4 fill-current"
                >
                  <g data-name="Layer 2">
                    <g data-name="external-link">
                      <rect width="24" height="24" opacity="0" />
                      <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z" />
                      <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z" />
                    </g>
                  </g>
                </svg>
              </Link>
              로 편하게 연락 주세요.
            </p>
            <br />
            <div>
              <h1>Experience</h1>
              <div className="max-w-none pb-8 pt-8 xl:col-span-2">
                {experienceData.map((d) => (
                  <Experience
                    key={d.company}
                    title={d.title}
                    company={d.company}
                    location={d.location}
                    range={d.range}
                    url={d.url}
                    text1={d.text1}
                    text2={d.text2}
                    text3={d.text3}
                  />
                ))}
              </div>
            </div>
            <br />
            <div>
              <h1>Presentation</h1>
              <div className="max-w-none pb-8 pt-8 xl:col-span-2">
                {presentationData.map((d) => (
                  <Presentation
                    key={d.title}
                    title={d.title}
                    event={d.event}
                    location={d.location}
                    date={d.date}
                    url={d.url}
                    text1={d.text1}
                    text2={d.text2}
                    text3={d.text3}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
