import * as React from 'react';

import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from '../../App/store';
import {setAppErrorAC} from '../../App/app-reducer';
import {Snackbar, Stack} from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: null}))
        // setOpen(false);
    };


    const isOpen = error !== null
    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}} color={'error'}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}