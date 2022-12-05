import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';
import React from 'react';


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
            task={{id: '1', isDone: true, title:'CSS'}}
            todolistId={'todolistId1'}
            removeTask={removeTaskCallBack}
            changeTaskTitle={changeTaskTitleCallBack}
            changeTaskStatus={changeTaskStatusCallBack}
        />
        <Task
            task={{id: '2', isDone: false, title:'JS'}}
            todolistId={'todolistId1'}
            removeTask={removeTaskCallBack}
            changeTaskTitle={changeTaskTitleCallBack}
            changeTaskStatus={changeTaskStatusCallBack}
        />
    </>
}