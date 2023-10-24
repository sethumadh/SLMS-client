import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { combineReducers } from "@reduxjs/toolkit"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

import storage from "redux-persist/lib/storage"

import persistStore from "redux-persist/es/persistStore"
import sidebarSlice from "./slice/sidebarSlice"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  //   blacklist: [studentListSlice.name, sidebarSlice.name],
}
export const reducer = combineReducers({
  [sidebarSlice.name]: sidebarSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
const persistor = persistStore(store)

export { store, persistor }
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
