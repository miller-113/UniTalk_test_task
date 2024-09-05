import { IListState } from './common.types'

type OperatorAddonsNames = {
  SMTP?: string
  JBOD?: string
}

export type OperatorType = OperatorAddonsNames & {
  createdAt: string
  name: string
  avatar: string
  isWorking: boolean
  id: string
}

export type OperatorAddonType = {
  fieldName: string
  text: string
  isChecked: boolean
  id: string
}

export type OperatorsStateType = {
  list: IListState<OperatorType>
}

export const USERS = 'users'
export type USERS = typeof USERS

export const GET_OPERATORS_LIST = `${USERS}/getOperatorListAction`
export type GET_OPERATORS_LIST = typeof GET_OPERATORS_LIST
