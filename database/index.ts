// db.js
import mysql from 'serverless-mysql'
import config from './config.server.json'

const db = mysql({
  config: {
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
  },
})

export default async function excuteQuery<T = unknown>(query: string) {
  try {
    const data = await db.query<T>(query)
    await db.end()
    return { data, error: null }
  } catch (error: any) {
    const err = error as Error
    return { data: null, error: err.message ?? 'unknown error' }
  }
}
