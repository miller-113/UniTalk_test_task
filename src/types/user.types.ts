import { IListState } from './common.types'

export type OperatorType = {
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
