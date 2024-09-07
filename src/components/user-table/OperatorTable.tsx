import React from 'react'
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

import { useHandlers } from '~/hooks/table/useHandlers'
import useUsers from '~/hooks/table/useUsers'
import { getAllHeadCells } from './lib'

import { styles } from './OperatorTable.style'
import { OperatorType } from '~/types'

const OperatorTable: React.FC = () => {
  const {
    isLoading,
    errors,
    searchTerm,
    sortConfig,
    setSortConfig,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleSearch,
    filteredData,
    paginatedData,
    uppercaseOperatorsKeys
  } = useUsers()

  const { handleSort, handlePageChange, handleRowsPerPageChange } = useHandlers(
    setSortConfig,
    setPage,
    setRowsPerPage
  )

  const dynamicKeys = uppercaseOperatorsKeys() || []
  const allHeadCells = getAllHeadCells(dynamicKeys)

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
              {allHeadCells.map((headCell) => (
                <TableCell key={headCell.id} sx={headCell.style}>
                  {headCell.isSortable ? (
                    <TableSortLabel
                      active={sortConfig.key === headCell.id}
                      direction={sortConfig.direction}
                      onClick={() =>
                        handleSort(headCell.id as keyof OperatorType)
                      }
                    >
                      <Typography variant='tableHeader'>
                        {headCell.label}
                      </Typography>
                    </TableSortLabel>
                  ) : (
                    <Typography variant='tableHeader'>
                      {headCell.label}
                    </Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((operator, index) => (
              <React.Fragment key={operator.id}>
                {index > 0 && (
                  <TableRow>
                    <TableCell
                      sx={styles.dividerCell}
                      colSpan={allHeadCells.length}
                    >
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
                  {dynamicKeys.map((operatorAddonName) => (
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
