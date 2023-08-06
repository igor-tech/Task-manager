import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useActions } from '@/common/hooks'
import { authThunks } from '@/features/Auth'

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

export const useLoginForm = () => {
  const [captchaUrl, setCaptchaUrl] = useState<string | null>(null)
  const { login } = useActions(authThunks)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: FormValues) => {
    await login(data)
      .unwrap()
      .then(res => {
        setCaptchaUrl(res.captchaUrl)
      })
      .catch(err => {
        if (err.data.messages?.length) {
          const error = err.data.messages[0]

          toast.error(error)
        }
      })
  }

  return { register, onSubmit, handleSubmit, errors, captchaUrl }
}
