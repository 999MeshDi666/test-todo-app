import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TTodoItem, TodoStatus } from "../../types/todo";



export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        waiting: [] as TTodoItem[],
        progress: [] as TTodoItem[],
        finished: [] as TTodoItem[]
    },
    reducers: {
        addItem: (state, action:PayloadAction<TTodoItem>)=>{
            state.waiting.push(action.payload)
        },
        updateStatusItem: (state, action:PayloadAction<{item: TTodoItem, status: TodoStatus}>)=>{
           const curItem = action.payload.item; 
           const prevList = state[curItem.status].filter((elem)=> elem.id !== curItem.id);
           state[curItem.status] = prevList;
           const newItem = {
            ...curItem,
            status: action.payload.status
           }
           state[action.payload.status].push(newItem)
        },
        // deleteItem: (state, action:PayloadAction<string|number>)=>{
        //     const newList = state.list.filter((elem)=> elem.id !== action.payload);
        //     state.list = newList;
        // }
     
    }
})
export const {addItem, updateStatusItem} = todoSlice.actions;
export default todoSlice.reducer;