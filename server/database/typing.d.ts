import type { DB as KyselyDatabase } from 'kysely-codegen/dist/db.d'

import { Selectable } from 'kysely/dist/cjs/util/column-type'
import { AnyColumn } from 'kysely/dist/cjs/util/type-utils'

type AllSelection<DB, TB extends keyof DB> = Selectable<{
  [C in AnyColumn<DB, TB>]: {
    [T in TB]: C extends keyof DB[T] ? DB[T][C] : never
  }[TB]
}>

export type Database = KyselyDatabase

export type Blog = AllSelection<Database, 'blog'>
