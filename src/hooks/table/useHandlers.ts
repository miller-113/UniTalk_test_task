import { Dispatch, SetStateAction, useCallback } from 'react'
import { OperatorType, SortConfig } from '~/types'

export const useHandlers = (
  setSortConfig: Dispatch<SetStateAction<SortConfig>>,
  setPage: Dispatch<SetStateAction<number>>,
  setRowsPerPage: Dispatch<SetStateAction<number>>
) => {
  const handleSort = useCallback(
    (key: keyof OperatorType) => {
      setSortConfig((prevConfig) => ({
        key,
        direction:
          prevConfig.key === key && prevConfig.direction === 'asc'
            ? 'desc'
            : 'asc'
      }))
    },
    [setSortConfig]
  )

  const handlePageChange = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage)
    },
    [setPage]
  )

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    },
    [setRowsPerPage, setPage]
  )

  return {
    handleSort,
    handlePageChange,
    handleRowsPerPageChange
  }
}
