/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import { BlogNewsletterForm } from './NewsletterForm'
import PostLayout from '../layouts/PostLayout'
import PostSimple from '../layouts/PostSimple'
import AuthorLayout from '../layouts/AuthorLayout'
import ActivityLayout from '../layouts/ActivityLayout'
import ListLayout from '../layouts/ListLayout'
import SnippetsLayout from '../layouts/SnippetsLayout'

const Layouts = {
  PostLayout,
  PostSimple,
  AuthorLayout,
  ActivityLayout,
  ListLayout,
  SnippetsLayout,
}

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = Layouts?.[layout]
    if (!Layout) {
      const available = Object.keys(Layouts).join(', ')
      throw new Error(`Invalid MDX layout "${layout}". Available layouts: ${available}`)
    }
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
