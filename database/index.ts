// db.js
import mysql from 'serverless-mysql'
import config from './config.json'

const db = mysql({
  config: {
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
  },
})

export default async function excuteQuery(query: string) {
  try {
    const results = await db.query(query)
    await db.end()
    console.log({ results })
    return results
  } catch (error: any) {
    console.log(error)
    return { error: error.message }
  }
}
