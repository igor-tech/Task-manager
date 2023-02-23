import React, {useCallback, useEffect} from 'react';
import './App.css';

import {Menu} from '@material-ui/icons';
import {TodolistsList} from '../features/TodolistsList/TodolistList';
import {ErrorSnackbar} from '../Components/ErrorSnackbar/ErrorSnackbar';
import {useAppDispatch, useAppSelector} from './store';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {initializedAppTC, logoutTC} from './app-reducer';
import Button from '@mui/material/Button';
import {AppBar, Box, CircularProgress, Container, LinearProgress, Typography} from '@material-ui/core';
import {IconButton, Toolbar} from '@mui/material';

type PropsType = {
    demo?: boolean
}


function App({demo = false}: PropsType) {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector<boolean>(state => state.app.initialized)

    useEffect(() => {
        if (!demo) {
            dispatch(initializedAppTC())
        }

    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return (<div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>)
    }

    return (

            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6"
                                    style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            News
                            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                        </Typography>
                    </Toolbar>
                    <Box style={{position: 'absolute', width: '100%', top: '60px'}}>
                        {status === 'loading' && <LinearProgress/>}
                    </Box>
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path="/" element={<Navigate to={'/profile'}/>}/>
                        <Route path="/profile" element={<TodolistsList demo={demo}/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    </Routes>
                </Container>
            </div>
    );
}

export default App;


