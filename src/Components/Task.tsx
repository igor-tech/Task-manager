import {TaskType} from '../AppWithRedux';
import React, {memo, useCallback} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {EditableSpan} from './EditableSpan';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = memo((props: TaskPropsType) => {
    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.removeTask, props.task.id, props.todolistId])

    const onChangeStatusHandler = useCallback(() => {
        props.changeTaskStatus(props.task.id, !props.task.isDone, props.todolistId)
    }, [props.task.id, props.task.isDone, props.changeTaskStatus, props.todolistId])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])


    return <div key={props.task.id}>
        <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete" onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>;
})