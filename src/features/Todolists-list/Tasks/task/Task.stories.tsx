import { TaskStatuses } from 'features/Todolists-list/Tasks/tasks-a-p-i'
import { ReduxStoreProviderDecorator } from 'stories/decorators/ReduxStoreProviderDecorator'
import { Task } from 'features/Todolists-list/Tasks/task/Task'
import React from 'react'

export default {
  title: 'Task Component',
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
}

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        task={{
          id: '1',
          status: TaskStatuses.Completed,
          title: 'CSS',
          todoListId: '',
          deadline: '',
          startDate: '',
          addedDate: '',
          order: 0,
          priority: 0,
          description: '',
        }}
        todolistId={'todolistId1'}
      />
      <Task
        task={{
          id: '2',
          status: TaskStatuses.New,
          title: 'JS',
          todoListId: '',
          deadline: '',
          startDate: '',
          addedDate: '',
          order: 0,
          priority: 0,
          description: '',
        }}
        todolistId={'todolistId1'}
      />
    </>
  )
}
