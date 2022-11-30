import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
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

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
            [todolistId1]: [
                {id: v1(), title: 'CSS', isDone: false},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},
                {id: v1(), title: 'SCSS', isDone: false},
                {id: v1(), title: 'Angular', isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: 'Milk', isDone: false},
                {id: v1(), title: 'Chocolate', isDone: false},
                {id: v1(), title: 'Bread', isDone: false},
                {id: v1(), title: 'Juice', isDone: true},
                {id: v1(), title: 'Potato', isDone: false},
                {id: v1(), title: 'Meat', isDone: true},
            ],

        }
    )

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
        // setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
        setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})
    }

    const ChangeTaskFilter = (value: FilterValuesType, todolistId: string) => {
        // let todolist = todolists.find(tl => tl.id === todolistId)
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists])
        // }
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        // setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(tl => tl.id === id ? {...tl, isDone: isDone} : tl)})
    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(tl => tl.id === id ? {...tl, title: newTitle} : tl)})
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
        setTodolists([{id: todolistId, title: title, filter: 'all'}, ...todolists])
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
                                taskForTodolist = taskForTodolist.filter(t => t.isDone)
                            }

                            if (tl.filter === 'active') {
                                taskForTodolist = taskForTodolist.filter(t => !t.isDone)
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
