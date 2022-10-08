import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import get from '../../utils/api/http'
import { sql2Query } from '../../utils/query2Sql'
import { GetArticleData } from '../api/getArticle'
import { GetTitlesData } from '../api/getTitles'

function Article({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('3', data, Date.now())
  if (!data) return null
  return (
    <>
      <h1>{data.title}</h1>
      <div>{data.content}</div>
    </>
  )
}

// Article.getInitialProps = async () => {
//   const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   const json = await res.json()
//   return { stars: json.stargazers_count }
// }

export const getStaticPaths: GetStaticPaths = async (context) => {
  const response = await get<GetTitlesData>('getTitles')
  const titles = response.data ?? []
  const paths = titles.map((title) => ({ params: { title: sql2Query(title) } }))
  console.log(1, paths)
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const title = params?.title
  const data = await get<GetArticleData>('getArticle', { title })
  console.log(2, title, data.data)
  return { props: { data: data.data?.[0] ?? null } }
}

export default Article
