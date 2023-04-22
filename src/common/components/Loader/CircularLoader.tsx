import { CircularProgress } from '@material-ui/core'
import s from './Loader.module.css'
import React from 'react'

export const CircularLoader = () => {
  return (
    <div className={s.Loader}>
      <CircularProgress />
    </div>
  )
}
