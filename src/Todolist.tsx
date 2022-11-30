import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './Components/AddItemForm';
import {EditableSpan} from './Components/EditableSpan';
import { Delete} from '@material-ui/icons';
import {Button, IconButton} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';


type TodolistType = {
    id: string
    title: string
    tasks: Array<{ id: string, title: string, isDone: boolean }>
    removeTask: (id: string, todolistId: string) => void
    ChangeTaskFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist({title, tasks, ...props}: TodolistType) {
    const removeTaskHandler = (id: string) => {
        props.removeTask(id, props.id)
    }
    const onChangeStatusHandler = (id: string, isDone: boolean) => {
        props.changeTaskStatus(id, !isDone, props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    return (
        <div>
            <h3><EditableSpan title={title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
                {tasks.map(t => {
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }
                    return <div key={t.id}>


                        <Checkbox checked={t.isDone} onChange={() => onChangeStatusHandler(t.id, t.isDone)} />
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton aria-label="delete" onClick={() => removeTaskHandler(t.id)}>
                            <Delete/>
                        </IconButton>
                    </div>;
                })}
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
                    onClick={() => props.ChangeTaskFilter('completed', props.id)}
                >Completed</Button>
            </div>
        </div>
    )
}


