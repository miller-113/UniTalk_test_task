import { OperatorType } from "~/types"

export interface HeadCell {
  id: keyof OperatorType | string
  label: string
  isSortable: boolean
  style?: React.CSSProperties
}

export interface TbodyCellProps {
  type: HeadCell['id']
  value: number
  operator: OperatorType
  dynamicKeys: string[]
}