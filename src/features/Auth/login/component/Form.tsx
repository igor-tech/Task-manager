import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

import { useLoginForm } from '@/features/Auth/login/hooks/useLoginForm'
import s from '@/features/Auth/login/ui/Login.module.scss'
import { Button } from '@/shared/ui/button'

export const Form = () => {
  const { errors, onSubmit, handleSubmit, register, captchaUrl } = useLoginForm()

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.card}>
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

        {captchaUrl && (
          <>
            <img src={captchaUrl} alt={'captcha img'} />
            <TextField type="text" label="Captcha" margin="normal" {...register('captcha')} />
          </>
        )}

        <FormControlLabel
          label={'Remember me'}
          control={<Checkbox {...register('rememberMe')} />}
          style={{ paddingBottom: '20px' }}
        />

        <Button type={'submit'} variant={'primary'} className={s.button} fullWidth>
          Login
        </Button>
      </form>
    </>
  )
}
