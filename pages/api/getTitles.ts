import type { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../database'
import { ArticleMainData } from '../../database/typings/ArticleMain'
import { ServerData } from '../../typings/ServerData'
import response from '../../utils/api/response'

type Data = ArticleMainData['enTitle'][]
type SqlResult = { enTitle: ArticleMainData['enTitle'] }[]
export type GetTitlesData = Data

export default async function handler(req: NextApiRequest, res: NextApiResponse<ServerData<Data>>) {
  const result = await excuteQuery<SqlResult>(`SELECT enTitle FROM article_main`)
  if (result.error || !result.data) return response(404, res, { error: `titles is not found` })
  response(200, res, { data: result.data.map((item) => item.enTitle), error: null })
}
