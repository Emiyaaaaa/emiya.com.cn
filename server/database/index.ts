import config from './config.server.json'
import mysql from 'mysql2'
import { Kysely, MysqlDialect } from 'kysely'
import type { Database } from './typing'

const db = new Kysely<Database>({
  dialect: new MysqlDialect({
    pool: mysql.createPool({
      ...config,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
    }),
  }),
})

export default db
