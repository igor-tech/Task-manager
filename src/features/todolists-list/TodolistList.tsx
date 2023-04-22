import { Grid } from '@material-ui/core'
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import { useActions } from 'common/hooks'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectTasks, selectTodolists } from 'common/selectors'
import React, { FC, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../auth/selectors'
import { todolistsActions } from './index'
import { Todolist } from './todolist/Todolist'

export const TodolistsList: FC = () => {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { fetchTodolists } = useActions(todolistsActions)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isLoggedIn) return
    if (!todolists.length) fetchTodolists({})
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }

  const addTodolistCallBack = async (
    title: string,
    helpers: {
      setError: (error: string) => void
      setValue: (title: string) => void
    }
  ) => {
    const action = await dispatch(todolistsActions.addTodolist(title))
    if (todolistsActions.addTodolist.rejected.match(action)) {
      if (action.payload?.errors?.length) {
        const errorMessage = action.payload?.errors[0]
        helpers.setError(errorMessage)
      }
    } else {
      helpers.setValue('')
    }
  }
  return (
    <>
      <Grid style={{ padding: '20px', width: '290px' }}>
        <AddItemForm addItem={addTodolistCallBack} />
      </Grid>
      <Grid container spacing={6} wrap={'nowrap'} style={{ overflowX: 'auto', height: '86vh' }}>
        {todolists.map((tl) => {
          let taskForTodolist = tasks[tl.id]
          return (
            <Grid item key={tl.id}>
              <div style={{ width: '315px' }}>
                <Todolist todolist={tl} tasks={taskForTodolist} />
              </div>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
