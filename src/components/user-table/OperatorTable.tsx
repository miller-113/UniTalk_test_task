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
  Divider
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

  if (isLoading) return <div>Loading...</div>
  if (errors) return <div>Error: {JSON.stringify(errors)}</div>

  return (
    <TableContainer component={Paper}>
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
            <TableCell sx={{ width: '177px' }}>
              <TableSortLabel
                active={sortConfig.key === 'isWorking'}
                direction={sortConfig.direction}
                onClick={() => handleSort('isWorking')}
              >
                <Typography variant='tableHeader'>Працює</Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
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
            <TableCell>
              <Typography variant='tableHeader'>SMTP</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData?.map((operator, index) => (
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
                    {index + 1}
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
                    {new Date(operator.createdAt).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell sx={styles.tableCellOperatorData}>
                  <Typography
                    noWrap
                    sx={styles.tableCellOperatorDataTypography}
                    variant='body2'
                  >
                    {operator.SMTP}
                  </Typography>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OperatorTable
