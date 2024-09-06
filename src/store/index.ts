import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import rootReducers from '~/store/root-reducer'
import rootSaga from '~/store/root-saga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    (getDefaultMiddleware() as any).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store
export type RootState = ReturnType<typeof store.getState>
