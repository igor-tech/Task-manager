import React, {FC, useEffect} from 'react';
import {useActions, useAppSelector} from '../../App/store';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../Components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn} from '../Auth/selectors';
import {todolistsActions} from './index';

type PropsType = {
    demo?: boolean
}
export const TodolistsList: FC<PropsType> = ({demo = false}) => {
    const todolists = useAppSelector(store => store.todolists)
    const tasks = useAppSelector(store => store.tasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const {addTodolist, fetchTodolists} = useActions(todolistsActions)
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchTodolists()
    }, [])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }
    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map((tl) => {
                    let taskForTodolist = tasks[tl.id]
                    return (<Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    demo={demo}
                                    tasks={taskForTodolist}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
}