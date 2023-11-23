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
import modalSlice from "./slice/modalSlice"
import termSlice from "./slice/termSlice"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [sidebarSlice.name, modalSlice.name, termSlice.name],
}
export const reducer = combineReducers({
  [sidebarSlice.name]: sidebarSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [termSlice.name]: termSlice.reducer,
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
