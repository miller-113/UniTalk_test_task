import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Box,
  TableSortLabel,
  Typography,
  Divider,
  TablePagination
} from '@mui/material'
import { getOperatorListAction } from '~/store/slices/users.slice'
import { RootState } from '~/store'
import { OperatorType, SortConfig } from '~/types'

import { styles } from './OperatorTable.style'

const OperatorTable: React.FC = () => {
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
      setSearchTerm(event.target.value)
    },
    []
  )

  const handleSort = useCallback((key: keyof OperatorType) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'asc'
          ? 'desc'
          : 'asc'
    }))
  }, [])

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

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
  
  const uppercaseOperatorsKeys = () => {
    if (data){
      return Object.keys(data[0]).filter(([key]) =>
        key === key.toUpperCase())
    }
  }
  
  if (isLoading) return <div>Loading...</div>
  if (errors) return <div>Error: {JSON.stringify(errors)}</div>

  return (
    <Paper>
      <Box p={2}>
        <TextField
          label='Пошук'
          variant='outlined'
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Ім’я користувача...'
          autoFocus
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'name'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('name')}
                >
                  <Typography variant='tableHeader'>Користувач</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={styles.tableCellIsWorking}>
                <TableSortLabel
                  active={sortConfig.key === 'isWorking'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('isWorking')}
                >
                  <Typography variant='tableHeader'>Працює</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={styles.tableCellDate}>
                <TableSortLabel
                  active={sortConfig.key === 'createdAt'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('createdAt')}
                >
                  <Typography variant='tableHeader'>
                    Дата / Час створення
                  </Typography>
                </TableSortLabel>
              </TableCell>
              {uppercaseOperatorsKeys()?.map((operatorAddonName) => (
                <TableCell key={operatorAddonName}>
                  <Typography variant='tableHeader'>
                    {operatorAddonName}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((operator, index) => (
              <React.Fragment key={operator.id}>
                {index > 0 && (
                  <TableRow>
                    <TableCell sx={styles.dividerCell} colSpan={5}>
                      <Divider />
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell sx={styles.tableCellIndex}>
                    <Typography
                      sx={styles.tableCellTypographyIndex}
                      variant='body2'
                    >
                      {page * rowsPerPage + index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell sx={styles.avatarTableCell}>
                    <Avatar src={operator.avatar} />
                    <Typography variant='body2'>{operator.name}</Typography>
                  </TableCell>
                  <TableCell sx={styles.tableCellName}>
                    <Checkbox checked={operator.isWorking} />
                  </TableCell>
                  <TableCell sx={styles.tableCellDate}>
                    <Typography variant='body2'>
                      {new Date(operator.createdAt).toLocaleDateString('ru-RU')}{' '}
                      {new Date(operator.createdAt).toLocaleTimeString(
                        'ru-RU',
                        { hour: '2-digit', minute: '2-digit' }
                      )}
                    </Typography>
                  </TableCell>
                  {uppercaseOperatorsKeys()?.map((operatorAddonName) => (
                    <TableCell
                      sx={styles.tableCellOperatorData}
                      key={operatorAddonName}
                    >
                      <Typography
                        noWrap
                        sx={styles.tableCellOperatorDataTypography}
                        variant='body2'
                      >
                        {operator[operatorAddonName]}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={styles.dividerCell} />

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component='div'
        count={filteredData ? filteredData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  )
}

export default OperatorTable
