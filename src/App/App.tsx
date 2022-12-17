import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistsList} from '../features/TodolistsList/TodolistList';
import {ErrorSnackbar} from '../Components/ErrorSnackbar/ErrorSnackbar';
import {useAppDispatch, useAppSelector} from './store';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {CircularProgress} from '@mui/material';
import {initializedAppTC, logoutTC} from './app-reducer';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector<boolean>(state => state.app.initialized)

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return (<div  style={{position: 'fixed', top: '30%',textAlign: 'center', width: '100%'}}>
            <CircularProgress />
        </div>)
    }



    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path="/" element={<TodolistsList demo={demo}/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>} />
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;


