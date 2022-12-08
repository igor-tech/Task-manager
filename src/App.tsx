import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolists-api';
import {FilterValuesType, TodolistDomainType} from './State/todolists-reducer';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistDomainType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'CSS', status: TaskStatuses.Completed, todoListId: todolistId1, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'Html', status: TaskStatuses.Completed, todoListId: todolistId1, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ],
        [todolistId2]: [
            {id: v1(), title: 'bread', status: TaskStatuses.Completed, todoListId: todolistId2, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'milk', status: TaskStatuses.Completed, todoListId: todolistId2, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ],

    })

    const removeTask = (id: string, todolistId: string) => {
        // setTasks(tasks.filter(t => t.id !== id))
        // let task = tasks[todolistId]
        // let filteredTasks = task.filter(t => t.id != id)
        // tasks[todolistId] = filteredTasks
        // setTasks({...tasks})
        // console.log({...tasks})
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(tl => tl.id !== id)})
    }

    const addTask = (title: string, todolistId: string) => {
        // setTasks([{id: v1(), title: title, status: TaskStatuses.New}, ...tasks])
        setTasks({...tasks, [todolistId]: [{id: v1(), title: title, status: TaskStatuses.Completed, todoListId: todolistId2, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (id: string, status: TaskStatuses, todolistId: string) => {
        // setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(tl => tl.id === id ? {...tl, status: status} : tl)})
    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(tl => tl.id === id ? {...tl, title: newTitle} : tl)})
    }


    const ChangeTaskFilter = (value: FilterValuesType, todolistId: string) => {
        // let todolist = todolists.find(tl => tl.id === todolistId)
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists])
        // }
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let todolistId = v1()
        setTodolists([{id: todolistId, title: title, filter: 'all',  order: 0, addedDate: ''}, ...todolists])
        setTasks({
            ...tasks,
            [todolistId]: []
        })
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
                                taskForTodolist = taskForTodolist.filter(t => t.status === TaskStatuses.Completed)
                            }

                            if (tl.filter === 'active') {
                                taskForTodolist = taskForTodolist.filter(t => t.status === TaskStatuses.New)
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

export default App;
