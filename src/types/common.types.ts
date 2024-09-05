import { OperatorType } from "~/types"

export type IListState<T> = {
  data: T[] | null
  isLoading: boolean
  errors: unknown
}

export type SortConfig = {
  key: keyof OperatorType
  direction: 'asc' | 'desc'
}