import {action} from '@storybook/addon-actions';
import {Task} from './Task';
import React from 'react';
import {TaskStatuses} from '../../../../api/todolists-api';


export default {
    title: 'Task Component',
    component: Task
}

const changeTaskStatusCallBack = action('Status Changed')
const changeTaskTitleCallBack = action('Title Changed')
const removeTaskCallBack = action('task removed')
export const TaskBaseExample = () => {

    return <>
        <Task
            task={{id: '1', status: TaskStatuses.Completed, title:'CSS', todoListId:'', deadline: '', startDate: '', addedDate: '', order: 0,priority: 0, description: ''}}
            todolistId={'todolistId1'}
            removeTask={removeTaskCallBack}
            changeTaskTitle={changeTaskTitleCallBack}
            changeTaskStatus={changeTaskStatusCallBack}

        />
        <Task
            task={{id: '2', status: TaskStatuses.New, title:'JS', todoListId:'', deadline: '', startDate: '', addedDate: '', order: 0,priority: 0, description: ''}}
            todolistId={'todolistId1'}
            removeTask={removeTaskCallBack}
            changeTaskTitle={changeTaskTitleCallBack}
            changeTaskStatus={changeTaskStatusCallBack}
        />
    </>
}