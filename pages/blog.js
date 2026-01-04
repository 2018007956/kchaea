import Head from 'next/head'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Blog({ posts }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <Head>
        <meta
          name="google-site-verification"
          content="3hbbpmo8pyNhKhhRQCD9lmSgRHGG2AEpLkpJCSMuqoQ"
        />
      </Head>
      <ListLayout posts={posts} title="Archive" />
    </>
  )
}
