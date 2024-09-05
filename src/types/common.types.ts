export type IListState<T> = {
  data: T[] | null
  isLoading: boolean
  errors: unknown
}

