import type { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../database'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req.query.title)
  const a = (await excuteQuery('SELECT * FROM article_main')) as any
  res.status(200).json(a)
}
