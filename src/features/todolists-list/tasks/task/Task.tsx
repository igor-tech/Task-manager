import { Delete } from '@material-ui/icons'
import { IconButton } from '@mui/material'
import { TaskStatuses, TaskType } from 'features/todolists-list/todolists-api'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import { tasksActions } from 'features/todolists-list/index'
import React, { ChangeEvent, memo, useCallback } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { useActions, useAppDispatch } from 'common/utils'

type TaskPropsType = {
  task: TaskType
  todolistId: string
}
export const Task = memo((props: TaskPropsType) => {
  const { deleteTask, updateTask } = useActions(tasksActions)
  const dispatch = useAppDispatch()

  const removeTaskHandler = useCallback(() => {
    deleteTask({ taskId: props.task.id, todolistId: props.todolistId })
  }, [props.task.id, props.todolistId])

  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      updateTask({
        id: props.task.id,
        todolistId: props.todolistId,
        domainModel: {
          status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        },
      })
    },
    [props.task.id, props.task.status, props.todolistId]
  )

  const onChangeTitleHandler = useCallback(
    async (
      newValue: string,
      helpers: {
        setTitle: (title: string) => void
        setEditMode: (value: boolean) => void
        setError: (error: string) => void
      }
    ) => {
      const action = await dispatch(
        tasksActions.updateTask({
          id: props.task.id,
          domainModel: { title: newValue },
          todolistId: props.todolistId,
        })
      )
      if (tasksActions.updateTask.rejected.match(action)) {
        if (action.payload?.errors?.length) {
          const errorMessage = action.payload?.errors[0]
          helpers.setEditMode(true)
          helpers.setError(errorMessage)
        }
      } else {
        helpers.setEditMode(false)
      }
    },
    [props.task.id, props.todolistId]
  )

  return (
    <div key={props.task.id}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler} />
        <div
          style={{
            display: 'flex',
            maxWidth: '195px',
            justifyContent: 'start',
            width: '100%',
          }}
        >
          <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
        </div>
        <IconButton aria-label='delete' onClick={removeTaskHandler}>
          <Delete />
        </IconButton>
      </div>
    </div>
  )
})
