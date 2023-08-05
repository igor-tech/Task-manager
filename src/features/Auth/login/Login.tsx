import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-ui/core'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { z } from 'zod'

import s from './Login.module.scss'

import { useActions, useAppSelector } from '@/common/hooks'
import { authThunks } from '@/features/Auth'
import { selectIsLoggedIn } from '@/features/Auth/selectors'

const loginSchema = z.object({
  email: z.string().trim().nonempty('Enter email').email('Invalid email address'),
  password: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(3, 'Password must be at least 3 characters'),
  rememberMe: z.boolean().optional().default(false),
  captcha: z.string().optional(),
})

type FormValues = z.infer<typeof loginSchema>

export const Login = () => {
  const [captchaUrl, setCaptchaUrl] = useState<string | null>(null)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { login } = useActions(authThunks)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (data: FormValues) => {
    await login(data).unwrap()
    // .then(res => {
    //   console.log(res, 'then')
    //   setCaptchaUrl(res.captchaUrl)
    // })
    // .catch(err => {
    //   if (err.data.messages?.length) {
    //     const error = err.data.messages[0]
    //     toast.error(error)
    //   }
    // })
  }

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={'https://social-network.samuraijs.com/'}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  {' '}
                  here
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
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <div>{errors.password?.message}</div>
              {captchaUrl && (
                <>
                  <img src={captchaUrl} alt={'captcha img'} />
                  <TextField type="text" label="Captcha" margin="normal" {...register('captcha')} />
                </>
              )}
              <div></div>
              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox {...register('rememberMe')} />}
              />
              <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
