import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import { dayjs } from '@/components/DayJS'
import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { getCurrentlyReading } from '@/lib/goodreads'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import { FaCloudShowersHeavy } from 'react-icons/fa'
import {
  BsCloudDrizzleFill,
  BsCloudsFill,
  BsCloudLightningFill,
  BsCloudSnowFill,
  BsCloudFogFill,
  BsMoonFill,
  BsClock,
  BsSunFill,
  BsFillCloudSunFill,
  BsFillCloudMoonFill,
  BsFillCloudFill,
} from 'react-icons/bs'

export const getServerSideProps = async () => {
  const response = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?lat=23.014770&lon=72.526330&appid=1b3c10c18e894eaf1fd63eedde53fa54&units=metric'
  )
  const data = await response.json()

  const currentlyReading = await getCurrentlyReading({ limit: 1 })

  return {
    props: { currentlyReading, data },
  }
}

export default function Now(currentlyReading) {
  const { data } = useSWR('/api/now-playing', fetcher)
  let currentlyReadingData = currentlyReading['currentlyReading']
  let weatherData = currentlyReading['data']
  const { temp: temperature } = weatherData.main
  const { icon: weatherIcon, description: weatherDescription } = weatherData.weather[0]

  const icons = {
    _01d: <BsSunFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _01n: <BsMoonFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _02d: <BsFillCloudSunFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _02n: <BsFillCloudMoonFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _03d: <BsFillCloudFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _03n: <BsFillCloudFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _04d: <BsCloudsFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _04n: <BsCloudsFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _09d: <BsCloudDrizzleFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _09n: <BsCloudDrizzleFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _10d: <FaCloudShowersHeavy className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _10n: <FaCloudShowersHeavy className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _11d: <BsCloudLightningFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _11n: <BsCloudLightningFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _13d: <BsCloudSnowFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _13n: <BsCloudSnowFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _50d: <BsCloudFogFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _50n: <BsCloudFogFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
  }

  const now = () => dayjs().tz('Asia/Seoul')
  var year = now().year()
  var month = now().month()
  var date = now().date()
  var hour = now().hour()
  var minute = now().minute()
  var second = now().second()
  const format = 'hhA'
  const [TodayDate, setDate] = useState(now())

  useEffect(() => {
    const timer = setInterval(() => setDate(now()), 1000)
    return () => clearInterval(timer)
  }, [])

  var BirthDate = '1999-11-26'
  var birthDate = new Date(BirthDate)

  var Age = year - birthDate.getFullYear()

  var Month = 0
  if (month >= birthDate.getMonth()) Month = month - birthDate.getMonth()
  else {
    Age--
    Month = 12 + month - birthDate.getMonth()
  }

  var Day = 0
  if (date >= birthDate.getDate()) Day = date - birthDate.getDate()
  else {
    Month--
    Day = 31 + date - birthDate.getDate()
    if (Month < 0) {
      Month = 11
      Age--
    }
  }

  var age = {}
  age = {
    years: Age,
    months: Month,
    days: Day,
  }

  var ageString = ''
  if (age.years > 0 && age.months > 0 && age.days > 0)
    ageString = age.years + ' years, ' + age.months + ' months, and ' + age.days + ' days old'
  else if (age.years == 0 && age.months == 0 && age.days > 0)
    ageString = 'Only ' + age.days + ' days old'
  else if (age.years > 0 && age.months == 0 && age.days == 0)
    ageString = age.years + ' years old. Happy Birthday!!'
  else if (age.years > 0 && age.months > 0 && age.days == 0)
    ageString = age.years + ' years and ' + age.months + ' months old'
  else if (age.years == 0 && age.months > 0 && age.days > 0)
    ageString = age.months + ' months and ' + age.days + ' days old'
  else if (age.years > 0 && age.months == 0 && age.days > 0)
    ageString = age.years + ' years, and' + age.days + ' days old'
  else if (age.years == 0 && age.months > 0 && age.days == 0) ageString = age.months + ' months old'
  else ageString = "Welcome to Earth! <br> It's first day on Earth!"

  return (
    <>
      <PageSEO
        title={`Now - ${siteMetadata.author}`}
        description="What I'm working on now"
        url={siteMetadata.url}
      />
      <div>
        <div className="my-2">
          <h3>Where am I and what am I doing?</h3>
          <div className=" mb-6 mt-4 text-xs text-neutral-700 dark:text-neutral-400">
            This page was automatically updated @ {date}-{month}-{year} {hour}:{minute}:{second}
          </div>
        </div>
        {/* Misc */}
        <div>
          <div className="flex justify-between gap-5">
            <div className="mb-10 mt-2 w-1/2 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
              <span className="ml-2 font-semibold">Location:</span> <span>Seoul, Korea</span>
              <br />
              <span className="ml-2 font-semibold">Weather:</span>{' '}
              <span>
                <a
                  href="https://weather.com/en-GB/weather/today/l/Seoul+South+Korea?canonicalCityId=dfdaba8cbe3f4c949e44c3f4b8a1f77c0dd187d8f8c6d98d5e44a15b584a5a10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-1 hover:underline"
                >
                  {icons[`_${weatherIcon}`]} Currently <b>{parseInt(temperature)}°C</b>
                  {' with '}
                  <span>{weatherDescription}</span>
                </a>
              </span>
            </div>

            <div className="mb-10 mt-2 w-1/2 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
              <span className="ml-2 font-semibold">Reading:</span>{' '}
              <a
                href={currentlyReadingData[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-1 hover:underline"
              >
                <span>{currentlyReadingData[0].title}</span> by{' '}
                <span>{currentlyReadingData[0].author}</span>
              </a>
              <br />
              <span className="ml-2 font-semibold">Age:</span> <span>{ageString}</span>
            </div>
          </div>

          <div className="-my-6 flex justify-between gap-5">
            <div className="mb-10 mt-2 w-1/2 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
              <span className="ml-2 font-semibold">Date:</span>{' '}
              <span>{TodayDate.format('DD/MM/YYYY')}</span>
              <br />
              <span className="ml-2 font-semibold">Time:</span>{' '}
              <span>
                <BsClock className="mb-0.5 inline h-3 w-3 hover:animate-spin" />{' '}
                {TodayDate.format('h:mm:ss A')}
              </span>
            </div>

            <div className="mb-10 mt-2 w-1/2 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
              <span className="ml-2 font-semibold">Listening:</span>{' '}
              <span>
                {data?.songUrl ? (
                  <a
                    href={data.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-1 hover:underline"
                  >
                    <span>{data.title}</span>
                  </a>
                ) : (
                  <span>Not Playing</span>
                )}
              </span>
              <br />
              <span className="ml-2 font-semibold">Loving:</span> <span>🐈 & 🎵</span>
            </div>
          </div>
        </div>
        <div className="justify-center text-center text-2xl font-medium text-gray-200 dark:text-gray-600">
          &#126;&#126;&#126;
        </div>
        {/* Work */}
        <div className="pb-4">
          {/* <p>
            I work as a Data Engineer at{' '}
            <Link
              href={'https://www.accenture.com/'}
              className="special-underline no-underline dark:text-gray-100 hover:dark:text-gray-100"
            >
              Accenture
            </Link>
            .
          </p>
          <br /> */}
          <p>저는 서비스 개발 및 운영 직무를 목표로 꾸준히 준비하고 있습니다.</p>
          <br />
          <p>
            항상 새로운 것을 배우려 노력하고 있으며, 요즘은 오픈스택을 구축하는 일에 몰입하고
            있습니다.
          </p>
          <br />
          <p>
            이 웹사이트를 통해 제가 하고 있는 일과 흥미로운 생각들을 공유하고, 스스로 성장해 나가는
            과정을 기록하고자 합니다.
          </p>
        </div>
      </div>
    </>
  )
}
