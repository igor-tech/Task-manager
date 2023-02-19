import React, {memo, useCallback, useEffect} from 'react';

import {AddItemForm} from '../../../Components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../Components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {Button, IconButton} from '@material-ui/core';
import {Task} from './Task/Task';
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {fetchTasksTC} from '../tasks-reducer';
import {useAppDispatch} from '../../../App/store';


type TodolistType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    ChangeTaskFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    demo?: boolean
}

export const Todolist = memo(({demo = false, tasks, ...props}: TodolistType) => {
    if (typeof demo === 'undefined') demo = false
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            let thunk = fetchTasksTC(props.todolist.id);
            dispatch(thunk)
        }
    },[])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.todolist.id, props.addTask])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.todolist.id, props.changeTodolistTitle])

    let tasksForTodolist = tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
    }

    if (props.todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }

    const onChangeCompletedHandler = () => {
        props.ChangeTaskFilter('completed', props.todolist.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            {tasksForTodolist.map(t => <Task
                    key={t.id}
                    todolistId={props.todolist.id}
                    task={t}
                    removeTask={props.removeTask}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                />
            )}
            <div>
                <Button
                    variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                    onClick={() => props.ChangeTaskFilter('all', props.todolist.id)}
                >All</Button>
                <Button
                    color={'primary'}
                    variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                    onClick={() => props.ChangeTaskFilter('active', props.todolist.id)}
                >Active</Button>
                <Button
                    color={'secondary'}
                    variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onChangeCompletedHandler}
                >Completed</Button>
            </div>
        </div>
    )
})


