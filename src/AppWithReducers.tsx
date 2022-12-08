import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './State/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './State/tasks-reducer';
import {TaskPriorities, TaskStatuses} from './api/todolists-api';

export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
}

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all',  order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all',  order: 0, addedDate: ''},
    ])

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML', status: TaskStatuses.Completed, todoListId: todolistId1, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'CSS', status: TaskStatuses.Completed, todoListId: todolistId1, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},

        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: todolistId2, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'Juice', status: TaskStatuses.Completed, todoListId: todolistId2, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},

        ],

    })

    const removeTask = (id: string, todolistId: string) => {
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }

    const changeTaskStatus = (id: string, status: TaskStatuses, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(id, status, todolistId))
    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(id,newTitle,todolistId))
    }


    const ChangeTaskFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value))
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id,newTitle))
    }

    const removeTodolist = (todolistId: string) => {
        debugger
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)

    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let taskForTodolist = tasks[tl.id]
                            if (tl.filter === 'completed') {
                                taskForTodolist = taskForTodolist.filter(t => t.status = TaskStatuses.Completed)
                            }

                            if (tl.filter === 'active') {
                                taskForTodolist = taskForTodolist.filter(t => t.status = TaskStatuses.New)
                            }
                            return (<Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={taskForTodolist}
                                            removeTask={removeTask}
                                            ChangeTaskFilter={ChangeTaskFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>

                                </Grid>

                            )

                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers;
