import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'

export type AddItemFormPropsType = {
  addItem: (
    title: string,
    helpers: {
      setError: (error: string) => void
      setValue: (title: string) => void
    }
  ) => void
  disabled?: boolean
}
export const AddItemForm = memo(({ addItem, disabled }: AddItemFormPropsType) => {
  let [value, setValue] = useState('')
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    setError(null)
  }

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }

    if (event.key === 'Enter') {
      return addTaskHandler()
    }
  }

  const addTaskHandler = () => {
    if (value.trim() !== '') {
      addItem(value.trim(), { setError, setValue })
    } else {
      setError('Title is required')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
      }}
    >
      <TextField
        variant={'outlined'}
        value={value}
        onChange={onChangeHandler}
        label={'Type value'}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        helperText={error}
        disabled={disabled}
      />

      <IconButton onClick={addTaskHandler} disabled={disabled} color={'primary'} style={{ marginTop: '5px' }}>
        <AddBoxIcon fontSize={'medium'} />
      </IconButton>
    </div>
  )
})
