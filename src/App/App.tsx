import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistsList} from '../features/TodolistsList/TodolistList';
import {ErrorSnackbar} from '../Components/ErrorSnackbar/ErrorSnackbar';
import {useAppSelector} from './store';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useAppSelector(state => state.app.status)
    return (
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
               <TodolistsList demo={demo}/>
            </Container>

      </div>
    );
}

export default App;


