import Image from '@/components/Image'
import Link from '@/components/Link'

const Presentation = ({
  title,
  event,
  location,
  date,
  imgSrc,
  imgSrc2,
  blogUrl,
  text1,
  text2,
  text3,
}) => {
  const cardContent = (
    <div className="not-prose overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-primary-color-500 hover:shadow-md dark:border-gray-700 dark:bg-zinc-900">
      <div className="px-6 pb-4 pt-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-bold text-primary-color-500">{title}</h3>
          <span className="whitespace-nowrap rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900 dark:text-sky-200">
            {date}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {event} · {location}
        </p>

        {(imgSrc || imgSrc2) && (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {imgSrc && (
              <div className="relative h-48 overflow-hidden rounded-lg sm:h-56">
                <Image src={imgSrc} alt={title} layout="fill" objectFit="cover" />
              </div>
            )}
            {imgSrc2 && (
              <div className="relative h-48 overflow-hidden rounded-lg sm:h-56">
                <Image
                  src={imgSrc2}
                  alt={`${title} 2`}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center 65%"
                />
              </div>
            )}
          </div>
        )}

        <ul className="mt-3 space-y-0">
          {text1 && (
            <li className="flex items-start text-gray-500 dark:text-gray-400">
              <span className="mr-2 text-primary-color-500">&#8227;</span>
              {text1}
            </li>
          )}
          {text2 && (
            <li className="flex items-start text-gray-500 dark:text-gray-400">
              <span className="mr-2 text-primary-color-500">&#8227;</span>
              {text2}
            </li>
          )}
          {text3 && (
            <li className="flex items-start text-gray-500 dark:text-gray-400">
              <span className="mr-2 text-primary-color-500">&#8227;</span>
              {text3}
            </li>
          )}
        </ul>
      </div>
    </div>
  )

  if (blogUrl) {
    return (
      <Link href={blogUrl} className="block no-underline">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

export default Presentation
