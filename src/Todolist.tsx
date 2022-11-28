import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'


type TodolistType = {
    id: string
    title: string
    tasks: Array<{ id: string, title: string, isDone: boolean }>
    removeTask: (id: string, todolistId: string) => void
    ChangeTaskFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId:string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist({title, tasks, ...props}: TodolistType) {
    let [value, setValue] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (value.trim() !== '') {
            props.addTask(value.trim(), props.id)
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    const onKetPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id, props.id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(null)
    }

    const onChangeStatusHandler = (id: string, isDone: boolean) => {
        props.changeTaskStatus(id, !isDone, props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    return (
        <div>
            <h3>{title}<button onClick={removeTodolist}>X</button></h3>
            <div>
                <input value={value} onChange={onChangeHandler}
                       className={error ? styles.error : ''}
                       onKeyPress={onKetPressHandler}
                />
                <button onClick={addTaskHandler}>+</button>

                {error && <div className={styles.errorMessage}>{error}</div>}

            </div>
            <ul>
                {tasks.map(t => <li key={t.id}><input type={'checkbox'} checked={t.isDone}
                                                      onChange={() => onChangeStatusHandler(t.id, t.isDone)}/>
                    <span>{t.title}</span>
                    <button onClick={() => removeTaskHandler(t.id)}>X</button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => props.ChangeTaskFilter('all', props.id)}>All</button>
                <button onClick={() => props.ChangeTaskFilter('active', props.id)}>Active</button>
                <button onClick={() => props.ChangeTaskFilter('completed', props.id)}>Completed</button>
            </div>
        </div>
    )
}