import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import { Icon } from '@mui/material'

import { useCopyToClipboard } from '@/common/hooks/useCopy'
import s from '@/features/Auth/login/ui/Login.module.scss'
import { Typography } from '@/shared/ui/typography'

export const Message = () => {
  const [value, copy] = useCopyToClipboard()

  return (
    <div className={s.message}>
      <Typography variant={'body1'}>
        You can
        <Typography
          variant={'link1'}
          as={'a'}
          href={'https://social-network.samuraijs.com/'}
          target={'_blank'}
          rel="noreferrer"
        >
          {' '}
          create your personal account
        </Typography>
        , or if you just want to test the possibilities of our social network, use your demo account
        details to login:
      </Typography>

      <div>
        <Typography variant={'h3'}>
          Email:{' '}
          <Typography variant={'body1'} as={'span'}>
            free@samuraijs.com
            <Icon onClick={() => copy('free@samuraijs.com')}>
              <ContentCopyRoundedIcon color={'primary'} />
            </Icon>
          </Typography>
        </Typography>

        <Typography variant={'h3'}>
          Password:{' '}
          <Typography variant={'body1'} as={'span'}>
            free
            <Icon onClick={() => copy('free')}>
              <ContentCopyRoundedIcon color={'primary'} />
            </Icon>
          </Typography>
        </Typography>
      </div>
    </div>
  )
}
