import React from 'react'
import { TableCell, Typography, Avatar, Checkbox } from '@mui/material'

import { styles } from '~/components/operator-table/OperatorTable.style'

import { TbodyCellProps } from '~/types'

const TbodyCell: React.FC<TbodyCellProps> = ({
  type,
  value,
  operator,
  dynamicKeys
}) => {
  switch (type) {
    case 'index':
      return (
        <TableCell sx={styles.tableCellIndex}>
          <Typography sx={styles.tableCellTypographyIndex} variant='body2'>
            {value}
          </Typography>
        </TableCell>
      )
    case 'avatar':
      return (
        <TableCell sx={styles.avatarTableCell}>
          <Avatar src={operator.avatar} />
          <Typography variant='body2'>{operator.name}</Typography>
        </TableCell>
      )
    case 'isWorking':
      return (
        <TableCell sx={styles.tableCellName}>
          <Checkbox checked={operator.isWorking} />
        </TableCell>
      )
    case 'createdAt':
      return (
        <TableCell sx={styles.tableCellDate}>
          <Typography variant='body2'>
            {new Date(operator.createdAt).toLocaleDateString('ru-RU')}{' '}
            {new Date(operator.createdAt).toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
        </TableCell>
      )
    default:
      if (dynamicKeys.includes(type as string)) {
        return (
          <TableCell sx={styles.tableCellOperatorData} key={type}>
            <Typography
              noWrap
              sx={styles.tableCellOperatorDataTypography}
              variant='body2'
            >
              {operator[type]}
            </Typography>
          </TableCell>
        )
      }
      return null
  }
}

export default TbodyCell