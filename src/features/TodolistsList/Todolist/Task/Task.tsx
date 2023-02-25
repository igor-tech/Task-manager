import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {EditableSpan} from '../../../../Components/EditableSpan/EditableSpan';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';
import {useActions} from '../../../../App/store';
import {tasksActions} from '../../index';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = memo((props: TaskPropsType) => {
    const {deleteTask, updateTask} = useActions(tasksActions)

    const removeTaskHandler = useCallback(() => {
        deleteTask({taskId: props.task.id, todolistId: props.todolistId})
    }, [deleteTask, props.task.id, props.todolistId])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        updateTask({id: props.task.id,todolistId: props.todolistId, domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}})
    }, [props.task.id, props.task.status, updateTask, props.todolistId])


    const onChangeTitleHandler = useCallback((newValue: string) => {
        updateTask({id: props.task.id, domainModel: {title: newValue}, todolistId: props.todolistId})
    }, [props.task.id, updateTask, props.todolistId])


    return <div key={props.task.id}>
        <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete" onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>;
})