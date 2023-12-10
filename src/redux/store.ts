import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/slices/todoSlice";
import { todoApi } from "../services/todo";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer:{
        todo: todoReducer,
        [todoApi.reducerPath]: todoApi.reducer
    },
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware)

})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;