import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { Paper, PropTypes } from '@mui/material'
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import { useActions } from 'common/hooks'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { tasksActions, todolistsActions } from 'features/Todolists-list/index'
import { Task } from 'features/Todolists-list/Tasks/task/Task'
import { TaskStatuses, TaskType } from 'features/Todolists-list/Tasks/tasks-a-p-i'
import { FilterValuesType, TodolistDomainType } from 'features/Todolists-list/Todolits/todolists-reducer'
import React, { FC, memo, useCallback, useEffect } from 'react'

import { selectIsLoggedIn } from 'features/Auth/selectors'

type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskType>
}

export const Todolist: FC<PropsType> = memo(({ tasks, ...props }) => {
  const { changeTodolistFilter, removeTodolist, changeTodolistTitle } = useActions(todolistsActions)
  const { addTask, fetchTasks } = useActions(tasksActions)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) return
    if (!tasks.length) fetchTasks(props.todolist.id)
  }, [])

  const removeTodolistHandler = () => {
    removeTodolist(props.todolist.id)
  }
  const addTaskHandler = useCallback(
    async (
      title: string,
      helpers: {
        setError: (error: string) => void
        setValue: (title: string) => void
      }
    ) => {
      const action = await dispatch(tasksActions.addTask({ title, todolistId: props.todolist.id }))
      if (tasksActions.addTask.rejected.match(action)) {
        if (action.payload?.errors?.length) {
          const errorMessage = action.payload?.errors[0]
          helpers.setError(errorMessage)
        }
      } else {
        helpers.setValue('')
      }
    },
    [props.todolist.id, addTask]
  )

  const changeTodolistTitleHandler = useCallback(
    async (
      newTitle: string,
      helpers: {
        setTitle: (title: string) => void
        setEditMode: (value: boolean) => void
        setError: (error: string) => void
      }
    ) => {
      const action = await dispatch(
        todolistsActions.changeTodolistTitle({
          title: newTitle,
          id: props.todolist.id,
        })
      )
      if (todolistsActions.changeTodolistTitle.rejected.match(action)) {
        if (action.payload?.errors?.length) {
          const errorMessage = action.payload?.errors[0]
          helpers.setEditMode(true)
          helpers.setError(errorMessage)
        }
      } else {
        helpers.setEditMode(false)
      }
    },
    [props.todolist.id, changeTodolistTitle]
  )

  let tasksForTodolist = tasks

  if (props.todolist.filter === 'active') {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New)
  }

  if (props.todolist.filter === 'completed') {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed)
  }

  const onFilterButtonHandler = useCallback(
    (filter: FilterValuesType) => {
      changeTodolistFilter({ id: props.todolist.id, filter: filter })
    },
    [props.todolist.id]
  )

  const renderFilterButton = (color: PropTypes.Color, name: string, buttonFilter: FilterValuesType) => {
    return (
      <>
        <Button
          color={color}
          variant={props.todolist.filter === buttonFilter ? 'contained' : 'text'}
          onClick={() => onFilterButtonHandler(buttonFilter)}
        >
          {name}
        </Button>
      </>
    )
  }
  return (
    <Paper style={{ padding: '10px', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3 style={{ display: 'flex' }}>
          <EditableSpan title={props.todolist.title} onChange={changeTodolistTitleHandler} />
        </h3>
        <IconButton
          aria-label='delete'
          onClick={removeTodolistHandler}
          disabled={props.todolist.entityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </div>

      <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'} />
      {!tasksForTodolist.length && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '18px',
            opacity: '0.5',
            padding: '20px',
          }}
        >
          Task empty...
        </div>
      )}
      {tasksForTodolist.map((t) => (
        <Task key={t.id} todolistId={props.todolist.id} task={t} />
      ))}

      <div>
        {renderFilterButton('default', 'All', 'all')}
        {renderFilterButton('primary', 'Completed', 'active')}
        {renderFilterButton('secondary', 'Completed', 'completed')}
      </div>
    </Paper>
  )
})
