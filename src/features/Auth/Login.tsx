import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import {FormikHelpers, useFormik} from 'formik';
import {Button} from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../App/store';
import {loginTC} from './auth-reducer';
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn} from './selectors';

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const Login = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'email is required'
                }
            }
            if (!values.password) {
                return {
                    email: 'password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: '',

        },
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(loginTC(values))
            if (loginTC.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error?.field, error?.error)
                }
            }
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}