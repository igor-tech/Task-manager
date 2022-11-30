import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './Components/AddItemFormPropsType';
import {EditableSpan} from './Components/EditableSpan';


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
    changeTodolistTitle: (id: string, newTitle:string) => void
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
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks.map(t => {
                    const onChangeTitleHandler = (newValue: string) => {
                     props.changeTaskTitle(t.id, newValue, props.id)
                    }
                    return <li key={t.id}>
                        <input type={'checkbox'} checked={t.isDone} onChange={() => onChangeStatusHandler(t.id, t.isDone)}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <button onClick={() => removeTaskHandler(t.id)}>X</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={() => props.ChangeTaskFilter('all', props.id)}>All</button>
                <button onClick={() => props.ChangeTaskFilter('active', props.id)}>Active</button>
                <button onClick={() => props.ChangeTaskFilter('completed', props.id)}>Completed</button>
            </div>
        </div>
    )
}


