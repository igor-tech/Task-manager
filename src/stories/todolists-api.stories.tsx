import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistsAPI} from '../api/todolists-api';

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '5ac2a7b2-aadc-4e75-a12b-b46cdeb2e186'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const addTodolistHandler = () => {
        setTitle('')
        todolistsAPI.createTodolists('bla bla')
            .then((res) => {

                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'Title new Todolists'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={addTodolistHandler}>add todolists</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')


    const deleteTodolistsHandler = () => {
        setTodolistId('')
        todolistsAPI.deleteTodolists(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolistsHandler}>delete Todolists</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const upadteNameTodolistHandler = () => {
        setTodolistId('')
        setTitle('')
        todolistsAPI.updateTodolists(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'New name Todolist'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={upadteNameTodolistHandler}>update name todolist</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasksTodolistHandler = () => {

        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
                setTodolistId('')
            })

    }
    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasksTodolistHandler}>get Tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')


    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const UpadteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const updateTaskHandler = () => {
        todolistsAPI.updateTask(todolistId, taskId, {title: title})
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'new title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={updateTaskHandler}>upadte title Task</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const addTaskHandler = () => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
                setTitle('')
                setTodolistId('')
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'title task'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <input type="text" placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>

            <button onClick={addTaskHandler}>add task</button>
        </div>
    </div>
}