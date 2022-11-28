import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

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

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
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
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value}: tl) )
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        // setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(tl => tl.id === id ? {...tl, isDone: isDone}: tl)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let taskForTodolist = tasks[tl.id]
                    if (tl.filter === 'completed') {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone)
                    }

                    if (tl.filter === 'active') {
                        taskForTodolist = taskForTodolist.filter(t => !t.isDone)
                    }
                    return (
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
                        />
                    )

                })
            }

        </div>
    );
}

export default App;
