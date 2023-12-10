
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TTodoItem } from "../types/todo";

const ENDPOINT = 'https://todo/api/v2/'
export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: ENDPOINT }),
    endpoints: (builder) =>({
        getTodoList: builder.query<TTodoItem, TTodoItem>({
            query: ()=>ENDPOINT
        }),
        postTodoTitle: builder.mutation<TTodoItem, TTodoItem>({
            query: (data:TTodoItem)=>({
                url: `${ENDPOINT}/add`,
                method: "POST",
                body: data
            })
        })
    })
})

export const {useGetTodoListQuery, usePostTodoTitleMutation} = todoApi;