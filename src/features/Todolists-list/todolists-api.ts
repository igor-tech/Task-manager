import axios from 'axios'

import { ResponseType } from '@/common/types'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '5ac2a7b2-aadc-4e75-a12b-b46cdeb2e186',
  },
})

// api
export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  createTodolists(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {
      title,
    })
  },
  deleteTodolists(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },
  updateTodolists(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title })
  },
}

// types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
