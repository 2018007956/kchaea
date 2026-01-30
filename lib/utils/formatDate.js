import siteMetadata from '@/data/siteMetadata'

const formatDate = (date, options = {}) => {
  // Force a deterministic timezone to avoid SSR/CSR hydration mismatches.
  // (Vercel/server often runs in UTC; client is user-local.)
  const baseOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }

  return new Intl.DateTimeFormat(siteMetadata.locale, { ...baseOptions, ...options }).format(
    new Date(date)
  )
}

export default formatDate
