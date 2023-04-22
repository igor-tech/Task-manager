import React, { useEffect, useState } from 'react'
import { todolistsAPI } from 'features/todolists-list/todolists-api'

export default {
  title: 'API',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistsAPI.getTodolists().then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('')

  const createTodolist = () => {
    setTitle('')
    todolistsAPI.createTodolists('bla bla').then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type='text'
          placeholder={'Title new Todolists'}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <button onClick={createTodolist}>add todolists</button>
      </div>
    </div>
  )
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTodolist = () => {
    setTodolistId('')
    todolistsAPI.deleteTodolists(todolistId).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type='text'
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <button onClick={deleteTodolist}>delete Todolist</button>
      </div>
    </div>
  )
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const updateTitle = () => {
    setTodolistId('')
    setTitle('')
    todolistsAPI.updateTodolists(todolistId, title).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type='text'
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          type='text'
          placeholder={'New name Todolist'}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <button onClick={updateTitle}>update name todolist</button>
      </div>
    </div>
  )
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const getTasks = () => {
    todolistsAPI.getTasks(todolistId).then((res) => {
      setState(res.data)
      setTodolistId('')
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type='text'
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <button onClick={getTasks}>get Tasks</button>
      </div>
    </div>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTask = () => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type='text'
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          type='text'
          placeholder={'taskId'}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <button onClick={deleteTask}>delete task</button>
      </div>
    </div>
  )
}
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [priority, setPriority] = useState<number>(0)
  const [status, setStatus] = useState<number>(0)

  const updateTaskHandler = () => {
    todolistsAPI
      .updateTask(todolistId, taskId, {
        deadline: '',
        description: description,
        priority: priority,
        status: status,
        title: title,
        startDate: '',
      })
      .then((res) => {
        setState(res.data)
      })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type='text'
          placeholder={'new title'}
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value)
          }}
        />
        <input
          type='text'
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          type='text'
          placeholder={'taskId'}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <input
          type='text'
          placeholder={'description'}
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'status'}
          value={status}
          onChange={(e) => {
            setStatus(+e.currentTarget.value)
          }}
        />
        <input
          placeholder={'priority'}
          value={priority}
          onChange={(e) => {
            setPriority(+e.currentTarget.value)
          }}
        />

        <button onClick={updateTaskHandler}>upadte title Task</button>
      </div>
    </div>
  )
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const createTask = () => {
    todolistsAPI.createTask(todolistId, title).then((res) => {
      setState(res.data)
      setTitle('')
      setTodolistId('')
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type='text'
          placeholder={'title task'}
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value)
          }}
        />
        <input
          type='text'
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />

        <button onClick={createTask}>add task</button>
      </div>
    </div>
  )
}
