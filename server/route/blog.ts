import { InsertObject, UpdateObject } from 'kysely'
import db from '../database'
import type { Database } from '@/server/database/typing'

export enum Table {
  Blog = 'blog',
}

type ID = string

export async function getBlogList() {
  return db.selectFrom(Table.Blog).selectAll().execute()
}

export async function getBlog(id: ID) {
  return db
    .selectFrom(Table.Blog)
    .selectAll()
    .where('id', '=', Number(id))
    .execute()
    .then((result) => result[0])
}

export async function updateBlog(id: ID, detail: UpdateObject<Database, Table.Blog>) {
  return db.updateTable(Table.Blog).set(detail).where('id', '=', Number(id)).execute()
}

export async function createBlog(detail: InsertObject<Database, Table.Blog>) {
  return db.insertInto(Table.Blog).values(detail).execute()
}

export async function deleteBlog(id: ID) {
  return db.deleteFrom(Table.Blog).where('id', '=', Number(id)).execute()
}

export default {
  getBlogList,
  getBlog,
  updateBlog,
  createBlog,
  deleteBlog,
}
