import { InsertObject, UpdateObject } from 'kysely'
import db from '../database'
import type { Database } from '@/server/database/typing'
import { get } from 'http'

export enum Table {
  Blog = 'blog',
}

type ID = string | number

export async function getEditorBlogList() {
  return db.selectFrom(Table.Blog).select(['title', 'id', 'visibility']).orderBy('created_at', 'desc').execute()
}

export async function getVisibleBlogList() {
  return db
    .selectFrom(Table.Blog)
    .select(['title', 'en_title', 'id', 'created_at', 'tag'])
    .where('visibility', '=', 1)
    .orderBy('created_at', 'desc')
    .execute()
}

export async function getBlogById(id: ID) {
  return db
    .selectFrom(Table.Blog)
    .selectAll()
    .where('id', '=', Number(id))
    .execute()
    .then((result) => result[0])
}

export async function getBlogByTitle(title: string) {
  if (title.startsWith('untitled')) {
    const id = title.split('-')[1]
    if (!id) return undefined
    return getBlogById(id)
  } else {
    return db
      .selectFrom(Table.Blog)
      .selectAll()
      .where('en_title', '=', title.replace(/-/g, ' '))
      .execute()
      .then((result) => result[0])
  }
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
  getEditorBlogList,
  getVisibleBlogList,
  getBlogById,
  getBlogByTitle,
  updateBlog,
  createBlog,
  deleteBlog,
}
