import { HeadCell } from '~/types'
import { styles } from './OperatorTable.style'

export const headCells: readonly HeadCell[] = [
  {
    id: 'index',
    label: '#',
    isSortable: false
  },
  {
    id: 'name',
    label: 'Користувач',
    isSortable: true
  },
  {
    id: 'isWorking',
    label: 'Працює',
    isSortable: true,
    style: styles.tableCellIsWorking
  },
  {
    id: 'createdAt',
    label: 'Дата / Час створення',
    isSortable: true,
    style: styles.tableCellDate
  }
]

export const getDynamicHeadCells = (keys: string[]): HeadCell[] => {
  return keys.map((key) => ({
    id: key,
    label: key,
    isSortable: false
  }))
}

export const getAllHeadCells = (dynamicKeys: string[]): HeadCell[] => {
  return [...headCells, ...getDynamicHeadCells(dynamicKeys)]
}
