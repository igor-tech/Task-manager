import Checkbox from '@material-ui/core/Checkbox'
import { Delete } from '@material-ui/icons'
import { IconButton } from '@mui/material'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import { useActions } from 'common/hooks'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { tasksActions } from 'features/Todolists-list/index'
import { TaskStatuses, TaskType } from 'features/Todolists-list/Tasks/tasks-a-p-i'
import React, { ChangeEvent, FC, memo, useCallback } from 'react'

type PropsType = {
  task: TaskType
  todolistId: string
}
export const Task: FC<PropsType> = memo(({ task, todolistId }) => {
  const { deleteTask, updateTask } = useActions(tasksActions)
  const dispatch = useAppDispatch()

  const removeTaskHandler = useCallback(() => {
    deleteTask({ taskId: task.id, todolistId: todolistId })
  }, [task.id, todolistId])

  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      updateTask({
        id: task.id,
        todolistId: todolistId,
        domainModel: {
          status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        },
      })
    },
    [task.id, task.status, todolistId]
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
          id: task.id,
          domainModel: { title: newValue },
          todolistId: todolistId,
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
    [task.id, todolistId]
  )

  return (
    <div key={task.id}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Checkbox checked={task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler} />
        <div
          style={{
            display: 'flex',
            maxWidth: '195px',
            justifyContent: 'start',
            width: '100%',
          }}
        >
          <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
        </div>
        <IconButton aria-label='delete' onClick={removeTaskHandler}>
          <Delete />
        </IconButton>
      </div>
    </div>
  )
})
