import { CircularProgress } from '@material-ui/core'

import s from './Loader.module.css'

export const CircularLoader = () => {
  return (
    <div className={s.Loader}>
      <CircularProgress />
    </div>
  )
}
