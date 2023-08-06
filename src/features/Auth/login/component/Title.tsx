import { Typography } from '@/shared/ui/typography'

export const Title = () => {
  return (
    <>
      <Typography variant={'large'} as={'h1'}>
        Sign In
      </Typography>
      <Typography variant={'body1'}>Welcome back, you’ve been missed!</Typography>
    </>
  )
}
