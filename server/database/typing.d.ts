import type { DB as KyselyDatabase } from 'kysely-codegen/dist/db.d'

import type { ColumnType, Selection } from 'kysely'
import { From } from 'kysely/dist/cjs/parser/table-parser'
import { Selectable } from 'kysely/dist/cjs/util/column-type'
import { AnyColumn } from 'kysely/dist/cjs/util/type-utils'
import { SelectAllQueryBuilder } from 'kysely/dist/cjs/parser/select-parser'

type AllSelection<DB, TB extends keyof DB> = Selectable<{
  [C in AnyColumn<DB, TB>]: {
    [T in TB]: C extends keyof DB[T] ? DB[T][C] : never
  }[TB]
}>

export type Database = KyselyDatabase

export type Blog = AllSelection<Database, 'blog'>
