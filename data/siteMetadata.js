const siteMetadata = {
  title: 'Blog | Chaea Kim',
  author: 'Chaea Kim',
  headerTitle: 'Mere Musings',
  description: '채아킴 블로그',
  snippets: '재사용 가능한 코드 스니펫 모음입니다',
  language: 'ko-kr',
  theme: 'system', // system, dark or light
  siteUrl: 'https://kchaea.vercel.app',
  siteRepo: 'https://github.com/2018007956/kchaea',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/logo.png',
  email: 'chaea11s0@gmail.com',
  github: 'https://github.com/2018007956',
  linkedin: 'https://www.linkedin.com/in/kchaea/',
  website: 'https://kchaea.vercel.app',
  locale: 'ko-KR',
  analytics: {
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: 'G-F6V2QTJ628', // e.g. UA-000000-2 or G-XXXXXXX
  },
  newsletter: {
    provider: 'emailOctopus',
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      inputPosition: 'bottom',
      lang: 'en',
      darkTheme: 'dark',
      themeURL: '',
    },
  },
  socialAccount: {},
}

module.exports = siteMetadata
