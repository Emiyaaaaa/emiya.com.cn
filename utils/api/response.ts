import type { NextApiRequest, NextApiResponse } from 'next'

export default async function response<T extends Record<string, any> = Record<string, any>>(
  code: number,
  res: NextApiResponse<T>,
  data: T,
) {
  res.status(code).json({ code, ...data })
}
