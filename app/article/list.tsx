import React from 'react'
import { getTechBlogList } from '../../server'
import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'

function Article({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!data) return null
  return (
    <>
      {data.map((d, index) => (
        <div key={index}>
          {/* <h1>{d.title}</h1>
          <h1>{d.content}</h1> */}
        </div>
      ))}
    </>
  )
}

export const getStaticProps = async () => {
  const data = await getTechBlogList()
  return { props: { data } }
}

export default Article
