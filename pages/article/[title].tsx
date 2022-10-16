import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import get from '../../utils/api/http'
import { sql2Query } from '../../utils/query2Sql'
import { GetArticleData } from '../api/getArticle'
import { GetTitlesData } from '../api/getTitles'

function Article({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('Article', data, Date.now())
  if (!data) return null
  return (
    <>
      <h1>{data.title}</h1>
      <div>{data.content}</div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  console.log('start getStaticPaths')
  const response = await get<GetTitlesData>('getTitles')
  console.log('getStaticPaths response', response)
  const titles = response.data ?? []
  const paths = titles.map((title) => ({ params: { title: sql2Query(title) } }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const title = params?.title
  const data = await get<GetArticleData>('getArticle', { title })
  return { props: { data: data.data?.[0] ?? null } }
}

export default Article
