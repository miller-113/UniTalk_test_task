import usersReducer from '~/store/slices/users.slice'
import { OperatorsStateType } from '~/types'

export type StateType = {
  users: OperatorsStateType
}

const rootReducers = {
  users: usersReducer,
}

export default rootReducers
