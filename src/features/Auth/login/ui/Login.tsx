import { Navigate } from 'react-router-dom'

import s from './Login.module.scss'

import { useAppSelector } from '@/common/hooks'
import { Form, Message, Title } from '@/features/Auth/login/component'
import { selectIsLoggedIn } from '@/features/Auth/login/service/selectors'

export const Login = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div className={s.main}>
      <div className={s.auth}>
        <Title />
        <Form />
      </div>
      <Message />
    </div>
  )
}
