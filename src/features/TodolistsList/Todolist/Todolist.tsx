import React, {memo, useCallback, useEffect} from 'react';

import {AddItemForm} from '../../../Components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../Components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {Button, IconButton} from '@material-ui/core';
import {Task} from './Task/Task';
import {TodolistDomainType} from '../todolists-reducer';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {useActions} from '../../../App/store';
import {tasksActions, todolistsActions} from '../index';


type TodolistType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist = memo(({demo = false, tasks, ...props}: TodolistType) => {
    const {changeTodolistFilter, removeTodolist, changeTodolistTitle} = useActions(todolistsActions)
    const {addTask, fetchTasks} = useActions(tasksActions)

    if (typeof demo === 'undefined') demo = false

    useEffect(() => {
        if (!demo) {
            fetchTasks(props.todolist.id);
        }
    }, [])

    const removeTodolistHandler = () => {
        removeTodolist(props.todolist.id)
    }

    const addTaskHandler = useCallback((title: string) => {
        addTask({title, todolistId: props.todolist.id})
    }, [props.todolist.id, addTask])

    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle({title: newTitle, id: props.todolist.id})
    }, [props.todolist.id, changeTodolistTitle])

    let tasksForTodolist = tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
    }

    if (props.todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }

    const onAllHandler = useCallback(() => {
        changeTodolistFilter({id: props.todolist.id, filter: 'all'})
    }, [props.todolist.id])
    const onActiveHandler = useCallback(() => {
        changeTodolistFilter({id: props.todolist.id, filter: 'active'})
    }, [props.todolist.id])
    const onCompletedHandler = useCallback(() => {
        changeTodolistFilter({id: props.todolist.id, filter: 'completed'})
    }, [props.todolist.id])

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}
                            disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'}/>
            {tasksForTodolist.map(t => <Task
                    key={t.id}
                    todolistId={props.todolist.id}
                    task={t}
                />
            )}
            <div>
                <Button
                    variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllHandler}
                >All</Button>
                <Button
                    color={'primary'}
                    variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveHandler}
                >Active</Button>
                <Button
                    color={'secondary'}
                    variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedHandler}
                >Completed</Button>
            </div>
        </div>
    )
})


