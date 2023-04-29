import { ResponseType } from 'common/types'
import { instance } from '../Todolists-list/todolists-api'
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me')
  },
  logout() {
    return instance.delete<ResponseType<{ id: number; email: string; login: string }>>('auth/login')
  },
  captcha() {
    return instance.get<{ url: string }>('security/get-captcha-url')
  },
}
