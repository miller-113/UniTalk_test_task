import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USERS, OperatorsStateType, OperatorType } from '~/types'

const usersInitialState: OperatorsStateType = {
  list: {
    data: null,
    isLoading: false,
    errors: null
  }
}

export const usersSlice = createSlice({
  name: USERS,
  initialState: usersInitialState,
  reducers: {
    getOperatorListAction: (state: OperatorsStateType) => {
      state.list.isLoading = true
      state.list.errors = null
    },
    getOperatorListSuccessAction: (
      state: OperatorsStateType,
      { payload }: PayloadAction<OperatorType[]>
    ) => {
      state.list.isLoading = false
      state.list.data = payload
    },
    getOperatorListErrorAction: (
      state: OperatorsStateType,
      { payload }: PayloadAction<unknown>
    ) => {
      state.list.isLoading = false
      state.list.errors = payload
    }
  }
})

export const {
  getOperatorListAction,
  getOperatorListSuccessAction,
  getOperatorListErrorAction
} = usersSlice.actions

export default usersSlice.reducer
