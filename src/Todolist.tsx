import React, {memo, useCallback, useEffect} from 'react';

import {AddItemForm} from './Components/AddItemForm';
import {EditableSpan} from './Components/EditableSpan';
import {Delete} from '@material-ui/icons';
import {Button, IconButton} from '@material-ui/core';
import {Task} from './Components/Task';
import {FilterValuesType} from './State/todolists-reducer';
import {TaskStatuses} from './api/todolists-api';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from './State/tasks-reducer';
import {useAppDispatch} from './State/store';


type TodolistType = {
    id: string
    title: string
    tasks: Array<{ id: string, title: string, status: TaskStatuses }>
    ChangeTaskFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void

    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
}

export const Todolist = memo(({title, tasks, ...props}: TodolistType) => {
    console.log('todolist is called')
    const dispatch = useAppDispatch()

    useEffect(() => {


        let thunk = fetchTasksTC(props.id);

        dispatch(thunk)
    },[])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.id, props.addTask])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])

    let tasksForTodolist = tasks

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
    }

    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }

    const onChangeCompletedHandler = () => {
        props.ChangeTaskFilter('completed', props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            {tasksForTodolist.map(t => <Task
                    key={t.id}
                    todolistId={props.id}
                    task={t}
                    removeTask={props.removeTask}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                />
            )}
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={() => props.ChangeTaskFilter('all', props.id)}
                >All</Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={() => props.ChangeTaskFilter('active', props.id)}
                >Active</Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onChangeCompletedHandler}
                >Completed</Button>
            </div>
        </div>
    )
})


