import type { DB as KyselyDatabase } from 'kysely-codegen/dist/db.d'

import type { ColumnType } from 'kysely'

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>

export interface TechBlog {
  id: Generated<number>
  title: string
  description: string | null
  content: string
  creat_time: Date | null
  update_time: Date | null
}

export interface DB {
  tech_blog: TechBlog
}

export type Database = DB & KyselyDatabase
