import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { usersSlice } from '../slices/users.slice'
import apiClient from '~/lib/apiClient'
import { ApiEndpoints } from '~/constants/api'
import { GET_OPERATORS_LIST, OperatorType, OperatorAddonType } from '~/types'

function* getOperatorsListSaga() {
  try {
    const operatorResponse: AxiosResponse<OperatorType[]> = yield call(
      apiClient.get,
      `${ApiEndpoints.OPERATOR}`
    )
    const operatorAddonResponse: AxiosResponse<OperatorAddonType[]> =
      yield call(apiClient.get, `${ApiEndpoints.OPERATOR_ADDON}`)

    const mergedData = operatorResponse.data.map((operator) => {
      const addons = operatorAddonResponse.data.reduce<Record<string, string>>(
        (acc, addon) => {
          acc[addon.fieldName] = addon.text
          return acc
        },
        {}
      )
      return { ...operator, ...addons }
    })

    yield put(usersSlice.actions.getOperatorListSuccessAction(mergedData))
  } catch (error) {
    yield put(usersSlice.actions.getOperatorListErrorAction(error as unknown))
  }
}

export function* watchGetUser() {
  yield takeLatest(GET_OPERATORS_LIST, getOperatorsListSaga)
}
