import { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOperatorListAction } from '~/store/slices/users.slice'
import { RootState } from '~/store'
import { SortConfig } from '~/types'

const useUsers = () => {
  const dispatch = useDispatch()
  const { data, isLoading, errors } = useSelector(
    (state: RootState) => state.users.list
  )

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc'
  })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    dispatch(getOperatorListAction())
  }, [dispatch])

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(0)
      setSearchTerm(event.target.value)
    },
    []
  )

  const sortedData = useMemo(() => {
    if (!data) return null

    const { key, direction } = sortConfig
    return [...data].sort((a, b) => {
      if (key === 'isWorking') {
        return direction === 'asc'
          ? Number(a[key]) - Number(b[key])
          : Number(b[key]) - Number(a[key])
      } else if (key === 'createdAt') {
        return direction === 'asc'
          ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
          : new Date(b[key]).getTime() - new Date(a[key]).getTime()
      } else {
        const aValue = String(a[key])
        const bValue = String(b[key])
        if (aValue < bValue) return direction === 'asc' ? -1 : 1
        if (aValue > bValue) return direction === 'asc' ? 1 : -1
        return 0
      }
    })
  }, [data, sortConfig])

  const filteredData = useMemo(() => {
    if (!sortedData) return null

    return sortedData.filter((operator) =>
      operator.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [sortedData, searchTerm])

  const paginatedData = useMemo(() => {
    if (!filteredData) return []
    const start = page * rowsPerPage
    const end = start + rowsPerPage
    return filteredData.slice(start, end)
  }, [filteredData, page, rowsPerPage])

  const uppercaseOperatorsKeys = useCallback(() => {
    if (data) {
      return Object.keys(data[0]).filter((key) => key === key.toUpperCase())
    }
    return []
  }, [data])

  return {
    data,
    isLoading,
    errors,
    searchTerm,
    setSearchTerm,
    sortConfig,
    setSortConfig,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleSearch,
    sortedData,
    filteredData,
    paginatedData,
    uppercaseOperatorsKeys
  }
}

export default useUsers
