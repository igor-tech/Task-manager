import { Button } from '@material-ui/core'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useActions } from 'common/hooks'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { LoginParamsType } from 'features/Auth/auth-api'
import { authThunks } from 'features/Auth/auth-reducer'
import { FormikHelpers, useFormik } from 'formik'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from './selectors'

type FormValuesType = Required<LoginParamsType>

export const Login = () => {
  const [captchaUrl, setCaptchaUrl] = useState<string | null>(null)

  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { login } = useActions(authThunks)
  const formik = useFormik({
    validate: (values) => {
      let errors: Partial<LoginParamsType> = {}
      if (!values.email) {
        errors.email = 'Field is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Field is required'
      } else if (values.password.length < 3) {
        errors.password = 'Password must be at least 3 characters long'
      }
      return errors
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      captcha: '',
    },
    onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
      await login(values)
        .unwrap()
        .then((res) => {
          setCaptchaUrl(res.captchaUrl)
        })
        .catch((err) => {
          if (err.data.fieldsErrors?.length) {
            const error = err.data.fieldsErrors[0]
            formikHelpers.setFieldError(error?.field, error?.error)
          }
          if (err.data.messages?.length) {
            const error = err.data.messages[0]
            formikHelpers.setFieldError('password', error)
          }
        })
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label='Email' margin='normal' {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}
              <TextField type='password' label='Password' margin='normal' {...formik.getFieldProps('password')} />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}
              {captchaUrl !== null && (
                <>
                  <img src={captchaUrl} alt={'captcha img'} />
                  <TextField type='text' label='Captcha' margin='normal' {...formik.getFieldProps('captcha')} />
                </>
              )}
              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
