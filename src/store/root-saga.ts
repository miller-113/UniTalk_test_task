import { all, fork } from 'redux-saga/effects'
import { watchGetUser } from '~/store/sagas/users.saga'

const rootSaga = function* () {
  yield all([fork(watchGetUser)])
}

export default rootSaga
