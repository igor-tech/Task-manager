import React, {useCallback, useEffect} from 'react';
import './App.css';

import {Menu} from '@material-ui/icons';
import {ErrorSnackbar} from '../Components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import Button from '@mui/material/Button';
import {AppBar, Box, CircularProgress, Container, LinearProgress, Typography} from '@material-ui/core';
import {IconButton, Toolbar} from '@mui/material';
import {logoutTC} from '../features/Auth/auth-reducer';
import {useAppDispatch, useAppSelector} from './store';
import {appSelectors} from './index';
import {TodolistsList} from '../features/TodolistsList/TodolistList';
import {initializedAppTC} from './app-reducer';
import {authSelectors} from '../features/Auth';
import {Login} from '../features/Auth/Login';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useAppDispatch()
    const status = useAppSelector(appSelectors.selectStatus)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const isInitialized = useAppSelector(appSelectors.selectIsInitialized)

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


