/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import userReducer from "./Reducers/userReducer";
import cartReducer from "./Reducers/cartReducer";
import sidebarReducer from "./Reducers/sidebarReducer";
import restaurantReducer from "./Reducers/restaurantReducer";
import menuReducer from "./Reducers/menuReducer";
import restIDReducer from "./Reducers/restID";
import IDReducer from "./Reducers/IDReducer";

const persistConfig = {
    key: 'root',
    storage,
}

const reducers: any = combineReducers({
    user: userReducer,
    cart: cartReducer,
    show: sidebarReducer,
    restaurant: restaurantReducer,
    menu: menuReducer,
    restID: restIDReducer,
    IDs: IDReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);


export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
