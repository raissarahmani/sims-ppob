import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from './slices/authSlice'
import transactionReducer from './slices/transactionSlice'

const authPersistConfig = {
  key: "user",
  storage
}

const txPersistConfig = {
  key: "order",
  storage
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedTxReducer = persistReducer(txPersistConfig, transactionReducer)

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  transaction: persistedTxReducer
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
export default store