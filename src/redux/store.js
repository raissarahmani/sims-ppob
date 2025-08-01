import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from './slices/authSlice'

const authPersistConfig = {
  key: "user",
  storage
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
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