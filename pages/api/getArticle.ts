import type { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../database'
import { ArticleMainDatas } from '../../database/typings/ArticleMain'
import { ServerData } from '../../typings/ServerData'
import { query2Sql } from '../../utils/query2Sql'
import response from '../../utils/api/response'

type Data = ArticleMainDatas
type SqlResult = Data
export type GetArticleData = Data

export default async function handler(req: NextApiRequest, res: NextApiResponse<ServerData<Data>>) {
  const queryTitle = req.query.title
  if (!queryTitle || typeof queryTitle !== 'string') return response(404, res, { error: `query.title is 「${queryTitle}」` })
  const title = query2Sql(queryTitle)
  const result = await excuteQuery<SqlResult>(`SELECT * FROM article_main WHERE upper(enTitle)=upper("${title}")`)
  if (result.error || !result.data || result.data.length === 0) return response(404, res, { error: `title 「${title}」 is not found` })
  response(200, res, result)
}
