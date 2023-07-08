import React from 'react'
import Article from '@/components/Article'

export default function Loading() {
  // return <ArticleLoading />
  return (
    <Article
      className="loading"
      data={{ title: 'this is a loading title', created_at: new Date(), content: '', old: 0 }}
      content={{
        blocks: [
          { type: 'header', data: { text: 'this is a loading title', level: 3 } },
          {
            type: 'paragraph',
            data: {
              text: 'thisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraph',
            },
          },
          { type: 'header', data: { text: 'this is a loading title', level: 3 } },
          {
            type: 'paragraph',
            data: {
              text: 'thisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraphthisisaloadingparagraph',
            },
          },
        ],
      }}
    ></Article>
  )
}
