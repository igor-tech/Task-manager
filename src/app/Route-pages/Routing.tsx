import { Container } from '@material-ui/core'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Login } from '@/features/Auth'
import { TodolistsList } from '@/features/Todolists-list'

export const Routing = () => {
  return (
    <>
      <Container maxWidth={'xl'}>
        <Routes>
          <Route path="/" element={<Navigate to={'/profile'} />} />
          <Route path="/profile" element={<TodolistsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<h1>404: PAGE NOT FOUND</h1>} />
        </Routes>
      </Container>
    </>
  )
}
