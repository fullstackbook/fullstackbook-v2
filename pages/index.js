import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts, getReadme } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import PostBody from '../components/post-body';
import markdownToHtml from '../lib/markdownToHtml'

export default function Index({ allPosts, content }) {
  const morePosts = allPosts
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          <div className="flex flex-row">
            <div>
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </div>
            <div>
              <PostBody content={content} />
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  const readme = getReadme()

  const content = await markdownToHtml(readme.content)

  return {
    props: { allPosts, content },
  }
}
