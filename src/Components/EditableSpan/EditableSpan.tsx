import React, { ChangeEvent, memo, useState } from 'react'
import { TextField } from '@material-ui/core'
import s from './EditableSpan.module.css'

export type EditableSpanType = {
  title: string
  onChange: (
    value: string,
    helpers: {
      setTitle: (title: string) => void
      setEditMode: (value: boolean) => void
      setError: (error: string) => void
    }
  ) => void
}

export const EditableSpan = memo((props: EditableSpanType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }

  const deactivateEditMode = () => {
    props.onChange(title, { setTitle, setEditMode, setError })
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  return editMode ? (
    <TextField
      autoFocus
      onBlur={deactivateEditMode}
      value={title}
      onChange={onChangeTitleHandler}
      error={!!error}
      helperText={error}
    />
  ) : (
    <span onDoubleClick={activateEditMode} className={s.title}>
      {props.title}
    </span>
  )
})
